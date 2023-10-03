const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  cardNumber: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: String,
    required: true,
  },
  limit: {
    type: Number,
    required: true,
  },
  cardType: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  cardColor: {
    type: String,
    required: true,
  },
  cardBankLogo: {
    type: String,
    required: true,
  },
  cardName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Card", cardSchema);
