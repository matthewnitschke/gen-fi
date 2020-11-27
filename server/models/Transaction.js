const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  fiAccountId: String, // the accountId associated with this application
  date: Date,
  merchant: String,
  amount: Number,
});

module.exports = mongoose.model("Transaction", TransactionSchema);
