const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  users: [String],
  bankAccounts: [String],
});

module.exports = mongoose.model("Account", AccountSchema);
