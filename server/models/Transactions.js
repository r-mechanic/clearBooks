const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  category: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
  card: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Card",
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BankAccount",
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
