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
        this.footie = document.querySelector('TFOOT');
        this.formulaBarEl = document.querySelector('#formula-bar');
    }

    initCurrentCell() {
        this.currentCellLocation = { row: 0, col: 0 };
        this.renderFormulaBar();
    }

    renderTable() {
        this.renderTableHeader();
        this.renderTableBody();
        this.renderFooter();
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

    renderSum(collie, total) {
        const whichColumn = document.querySelector(`#sum-${collie}`);
        whichColumn.textContent = total;
    }

    sums(column) {
        let that = this;
        const rowies = this.model.numRows;
        function cb(i, memo) {
            if (i < rowies) {
                let pos = { col: column, row: i}
                memo.push(that.model.getValue(pos));
                return cb(i+=1, memo);
            }
            return memo;
        }
        let inputsArr = cb(0, [])
        let total = inputsArr.map(x => Number(x))
                             .filter(x => !(isNaN(x)))
                             .reduce(((total, x) => total+=x),0);
        
        this.renderSum(column, total);
    }

    renderFooter() {
        for (let col = 0; col < this.model.numCols; col++) {
            const td = createTD();
            td.id = `sum-${col}`;
            this.footie.appendChild(td);
        }
    }

    handleFormulaBarChange(eve) {
        const value = this.formulaBarEl.value;
        this.model.setValue(this.currentCellLocation, value);
        this.renderTableBody();
        this.sums(this.currentCellLocation.col);
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