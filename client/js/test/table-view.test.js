const fs = require('fs');
const TableView = require('../table-view.js');
const TableModel = require('../table-model.js');

describe('table-view', () => {

    beforeEach(() => {
        const fixturePath = './client/js/test/fixtures/sheet-container.html';
        const html = fs.readFileSync(fixturePath, 'utf8');
        document.documentElement.innerHTML = html;
    });

    describe('formula bar', () => {
        it('makes changes to the current cell', () => {
            const model = new TableModel(3,3);
            const view = new TableView(model);
            view.init();

            let trs = document.querySelectorAll('TBODY TR');
            let td = trs[0].cells[0];
            expect(td.textContent).toBe('');

            document.querySelector('#formula-bar').value = '65';
            view.handleFormulaBarChange();

            trs = document.querySelectorAll('TBODY TR');
            expect(trs[0].cells[0].textContent).toBe('65');

        });
        
        it('updates from current cell value', () => {
            const model = new TableModel(3,3);
            const view = new TableView(model);
            model.setValue({col: 2, row: 1}, '123');
            view.init();

            const formulabarEl = document.querySelector('#formula-bar');
            expect(formulabarEl.value).toBe('');

            const trs = document.querySelectorAll('TBODY TR');
            trs[1].cells[2].click();

            expect(formulabarEl.value).toBe('123');
        });
    });

    describe('table-body', () => {
        it('highlights the cell when clicked', () => {
            const model = new TableModel(10,5);
            const view = new TableView(model);
            view.init();

            let trs = document.querySelectorAll('TBODY TR');
            let td = trs[2].cells[3];
            expect(td.className).toBe('');

            td.click();

            trs = document.querySelectorAll('TBODY TR');
            td = trs[2].cells[3];
            expect(td.className).not.toBe('');
        })
        it('has the correct size', () => {
            const numCols = 4;
            const numRows = 10;
            const model = new TableModel(numCols, numRows);
            const modelView = new TableView(model);
            modelView.init();

            let ths = document.querySelectorAll('THEAD TH');
            expect(ths.length).toBe(numCols);
        });

        it('fills the correct data from model', () => {
            const model = new TableModel(3, 3);
            const modelView = new TableView(model);
            model.setValue({col: 2, row: 1}, '4444');
            modelView.init();

            const trs = document.querySelectorAll('TBODY TR');
            expect(trs[1].cells[2].textContent).toBe('4444')
        });
    });

    describe('table-header', () => {
        it('has valid colHead labels', () => {
            const numCols = 4;
            const numRows = 10;
            const model = new TableModel(numCols, numRows);
            const modelView = new TableView(model);
            modelView.init();

            let ths = document.querySelectorAll('THEAD TH');
            expect(ths.length).toBe(numCols);

            let labels = Array.from(ths).map(ele => ele.textContent);
            expect(labels).toEqual(['A','B','C','D']);

        });
    });

    describe('renderFooter()', () => {
        it('made the correct number of tds', () => {
            const numCols = 2;
            const numRows = 2;
            const model = new TableModel(numCols, numRows);
            const view = new TableView(model);
            view.init();

            let tFootTds = document.querySelectorAll("TD[id^='sum']");
            expect(tFootTds.length).toBe(numCols);
        });
    });

    describe('renderSum()', () => {
        it('displays the correct sum', () => {
            const numCols = 2;
            const numRows = 2;
            const model = new TableModel(numCols, numRows);
            const view = new TableView(model);
            model.setValue({col: 0, row: 0}, '4');
            model.setValue({col: 0, row: 1}, '4');
            view.init();
            //formulaBarChange also triggers summing.
            view.handleFormulaBarChange();

            let tfTd = document.querySelector(`#sum-0`).textContent;
            expect(tfTd).toBe('8');
        });
    });
});
