const express = require("express");
const Card = require("./../models/Cards");

const router = express.Router();

getAllCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

getCardById = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }
    res.status(200).json(card);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

createCard = async (req, res) => {
  const card = new Card({
    cardNumber: req.body.cardNumber,
    expirationDate: req.body.expirationDate,
    limit: req.body.limit,
    cardType: req.body.cardType,
    balance: req.body.balance,
    cardColor: req.body.cardColor,
    cardBankLogo: req.body.cardBankLogo,
    cardName: req.body.cardName,
  });
  try {
    const newCard = await card.save();
    res.status(201).json(newCard);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

updateCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }
    card.cardNumber = req.body.cardNumber;
    card.expirationDate = req.body.expirationDate;
    card.limit = req.body.limit;
    card.cardType = req.body.cardType;
    card.balance = req.body.balance;
    card.cardColor = req.body.cardColor;
    card.cardBankLogo = req.body.cardBankLogo;
    card.cardName = req.body.cardName;

    const updatedCard = await card.save();
    res.status(200).json(updatedCard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

deleteCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }
    await card.remove();
    res.status(200).json({ message: "Card deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

router.get("/", getAllCards);
router.get("/:id", getCardById);
router.post("/", createCard);
router.put("/:id", updateCard);
router.delete("/:id", deleteCard);

module.exports = router;
