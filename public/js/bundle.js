(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const TableModel = require('./table-model.js');
const TableView = require('./table-view.js');

const model = new TableModel();
const tableView = new TableView(model);
tableView.init();
},{"./table-model.js":4,"./table-view.js":5}],2:[function(require,module,exports){
const getRange = (fromNum, toNum) => {
    return Array.from({length: toNum - fromNum + 1}, (undef, index) => index + fromNum)
}

const getLetterRange = (firstletter = 'A', numLetters) => {
    const rangeStart = firstletter.charCodeAt(0);
    const rangeEnd = rangeStart + numLetters - 1;
    return getRange(rangeStart, rangeEnd)
           .map((char) => String.fromCharCode(char)); 
}

module.exports = {
    getRange: getRange,
    getLetterRange: getLetterRange
}
},{}],3:[function(require,module,exports){
const removeChildren = (parentEl) => {
    while (parentEl.firstChild) {
        parentEl.removeChild(parentEl.firstChild);
    }
};

const createEl = (tagName) => {
    return function (text) {
        const el = document.createElement(tagName);
        if (text) {
            el.textContent = text;
        }
        return el;
    };
};

const createTR = createEl('TR');
const createTH = createEl('TH');
const createTD = createEl('TD');

module.exports = {
    createTR: createTR,
    createTH: createTH,
    createTD: createTD,
    removeChildren: removeChildren
}
},{}],4:[function(require,module,exports){
class TableModel {
    constructor(numCols=10, numRows=20) {
        this.numCols = numCols;
        this.numRows = numRows;
        this.data = {}
    }
    _getCellId(location) {
        return `${location.col}:${location.row}`
    }
    getValue(location) {
        return this.data[this._getCellId(location)];
    }
    setValue(location, value) {
        this.data[this._getCellId(location)] = value;
    }
}

module.exports = TableModel;
},{}],5:[function(require,module,exports){
const { createTH,
        createTD,
        createTR,
        removeChildren} = require('./dom-util.js');
const { getLetterRange } = require('./array-util.js');

class TableView{
    constructor(model) {
        this.model = model;
    }
    init() {
        this.initDOMReferences();
        this.initCurrentCell();
        this.renderTable();
        this.attachEventHandlers();
    }

    initDOMReferences() {
        this.headerRowEl = document.querySelector('THEAD TR');
        this.sheetBodyEl = document.querySelector('TBODY');
        this.formulaBarEl = document.querySelector('#formula-bar');
    }

    initCurrentCell() {
        this.currentCellLocation = { row: 0, col: 0 };
        this.renderFormulaBar();
    }

    renderTable() {
        this.renderTableHeader();
        this.renderTableBody();
    }

    renderTableHeader() {
        removeChildren(this.headerRowEl);
        getLetterRange('A', this.model.numCols)
          .map(colChar => createTH(colChar))
          .forEach(tH => this.headerRowEl.appendChild(tH));
    }
    
    isCurrentCell(col, row) {
        return this.currentCellLocation.col === col &&
               this.currentCellLocation.row === row;
    }

    renderFormulaBar() {
        const currentCellValue = this.model.getValue(this.currentCellLocation);
        this.formulaBarEl.value = currentCellValue || '';
        this.formulaBarEl.focus();
    }

    renderTableBody() {
        const fragment = document.createDocumentFragment();
        for (let row = 0; row < this.model.numRows; row++) {
            const tr = createTR();
            for (let col = 0; col < this.model.numCols; col++) {
                const position = { col: col, row: row };
                const value = this.model.getValue(position);
                const td = createTD(value);

                if (this.isCurrentCell(col, row)) {
                    td.className = 'current-cell';
                }
                tr.appendChild(td);
            }
            fragment.appendChild(tr);
        }
        removeChildren(this.sheetBodyEl);
        this.sheetBodyEl.appendChild(fragment);
    }

    attachEventHandlers() {
        this.sheetBodyEl.addEventListener('click', this.handleSheetClick.bind(this));
        this.formulaBarEl.addEventListener('keyup', this.handleFormulaBarChange.bind(this));
    }

    handleFormulaBarChange(eve) {
        const value = this.formulaBarEl.value;
        this.model.setValue(this.currentCellLocation, value);
        this.renderTableBody();
    }

    handleSheetClick(eve) {
        const col = eve.target.cellIndex;
        const row = eve.target.parentElement.rowIndex - 1;

    
        this.currentCellLocation = {col: col, row: row};
        this.renderTableBody();
        this.renderFormulaBar();
    }


}

module.exports = TableView;
},{"./array-util.js":2,"./dom-util.js":3}]},{},[1]);
