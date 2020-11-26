const mongoose = require("mongoose");

const TransactionLocationSchema = new mongoose.Schema({
  address: String,
  city: String,
  region: String,
  postal_code: String,
  country: String,
  lat: Number,
  long: Number,
  store_number: String,
});

const TransactionPaymentMetaSchema = new mongoose.Schema({
  by_order_of: String,
  payee: String,
  payer: String,
  payment_method: String,
  payment_processor: String,
  ppd_id: String,
  reason: String,
  reference_number: String,
});

const TransactionSchema = new mongoose.Schema({
  account_id: String,
  amount: Number,
  iso_currency_code: String,
  unofficial_currency_code: String,
  category: [String],
  category_id: String,
  date: String,
  authorized_date: String,
  location: TransactionLocationSchema,
  name: String,
  merchant_name: String,
  payment_meta: TransactionPaymentMetaSchema,
  payment_channel: String,
  pending: Boolean,
  pending_transaction_id: String,
  account_owner: String,
  transaction_id: String,
  transaction_code: String,
  transaction_type: String,
});

module.exports = mongoose.model("Transaction", TransactionSchema);
