const mongoose = require("mongoose");

const bankAccountSchema = new mongoose.Schema({
  bankName: {
    type: String,
    required: true,
  },
  bankLogo: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true,
  },
  ifscCode: {
    type: String,
    required: true,
  },
  cifNumber: {
    type: String,
    required: true,
    unique: true,
  },
  branch: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
  numCards: {
    type: Number,
    required: true,
    default: 0,
  },
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
    },
  ],
});

const BankAccount = mongoose.model("BankAccount", bankAccountSchema);

module.exports = BankAccount;
