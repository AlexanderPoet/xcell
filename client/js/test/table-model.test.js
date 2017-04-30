const TableModel = require('../table-model.js');

describe('TableModel', () => {
    it('can set and retrieve value', () => {
        const model = new TableModel();
        const location = { row:3, col:5};

        expect(model.getValue(location)).toBeUndefined();

        model.setValue(location, 'boo');

        expect(model.getValue(location)).toBe('boo');
    })
})