const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({

  // plaidTransactionId: { type: String, unique: true, required: true },
  _id: String,
  fiAccountId: { type: String, required: true }, // the accountId associated with this application
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  
  merchant: String,
  isUserCreated: Boolean, // whether or not this transaction was manually created
  isPending: Boolean,
}, {_id: false});

module.exports = mongoose.model('Transaction', TransactionSchema);
