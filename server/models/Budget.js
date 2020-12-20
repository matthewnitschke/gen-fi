const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
  accountId: String,
  date: String,
  storeData: mongoose.Schema.Types.Mixed,
});

module.exports = mongoose.model('Budget', BudgetSchema);
