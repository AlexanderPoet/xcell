const fs = require('fs');
const TableView = require('../table-view.js');
const TableModel = require('../table-model.js');

describe('table-view', () => {

    beforeEach(() => {
        const fixturePath = './client/js/test/fixtures/sheet-container.html';
        const html = fs.readFileSync(fixturePath, 'utf8');
        document.documentElement.innerHTML = html;
    });

    describe('table-body', () => {
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
});