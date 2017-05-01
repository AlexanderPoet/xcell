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
    getColumnValues(column) {
        const values = [];
        for (let i = 0; i < this.numRows; i++) {
            let pos = { col: column, row: i };
            values.push(this.getValue(pos));
        }
        return values;
    }
}

module.exports = TableModel;