const { createTH,
        createTD,
        createTR,
        removeChildren} = require('./dom-util.js');
const { getLetterRange,
        sumOf, 
        fishForNumbers} = require('./array-util.js');

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
        this.footerRowEl = document.querySelector('TFOOT');
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

    renderFooter() {
        for (let col = 0; col < this.model.numCols; col++) {
            const td = createTD();
            td.id = `sum-${col}`;
            this.footerRowEl.appendChild(td);
        }
    }

    renderSum(column, total) {
        const footerCell = document.querySelector(`#sum-${column}`);
        footerCell.textContent = total;
    }

    attachEventHandlers() {
        this.sheetBodyEl.addEventListener('click', this.handleSheetClick.bind(this));
        this.formulaBarEl.addEventListener('keyup', this.handleFormulaBarChange.bind(this));
    }

    calculateSums(column) {
        const data = this.model.getColumnValues(column);
        const numbers = fishForNumbers(data);
        const sum = sumOf(numbers);
        this.renderSum(column, sum);
    }

    handleFormulaBarChange(eve) {
        const value = this.formulaBarEl.value;
        this.model.setValue(this.currentCellLocation, value);
        this.renderTableBody();
        this.calculateSums(this.currentCellLocation.col);
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