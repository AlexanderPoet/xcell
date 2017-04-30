const TableModel = require('./table-model.js');
const TableView = require('./table-view.js');

const model = new TableModel();
const tableView = new TableView(model);
tableView.init();