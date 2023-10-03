const express = require("express");
const BankAccount = require("../models/BankAccount");

const router = express.Router();

// Get all bank accounts
router.get("/", async (req, res) => {
  try {
    const bankAccounts = await BankAccount.find();
    res.json(bankAccounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single bank account by ID
router.get("/:id", getBankAccount, (req, res) => {
  res.json(res.bankAccount);
});

// Create a new bank account
router.post("/", async (req, res) => {
  const bankAccount = new BankAccount({
    bankName: req.body.bankName,
    bankLogo: req.body.bankLogo,
    accountType: req.body.accountType,
    accountNumber: req.body.accountNumber,
    ifscCode: req.body.ifscCode,
    cifNumber: req.body.cifNumber,
    branch: req.body.branch,
    balance: req.body.balance,
    numCards: req.body.numCards,
    cards: req.body.cards,
  });

  try {
    const newBankAccount = await bankAccount.save();
    res.status(201).json(newBankAccount);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: err.message });
  }
});

// Update a bank account by ID
router.patch("/:id", getBankAccount, async (req, res) => {
  if (req.body.bankName != null) {
    res.bankAccount.bankName = req.body.bankName;
  }
  if (req.body.bankLogo != null) {
    res.bankAccount.bankLogo = req.body.bankLogo;
  }
  if (req.body.accountType != null) {
    res.bankAccount.accountType = req.body.accountType;
  }
  if (req.body.accountNumber != null) {
    res.bankAccount.accountNumber = req.body.accountNumber;
  }
  if (req.body.ifscCode != null) {
    res.bankAccount.ifscCode = req.body.ifscCode;
  }
  if (req.body.cifNumber != null) {
    res.bankAccount.cifNumber = req.body.cifNumber;
  }
  if (req.body.branch != null) {
    res.bankAccount.branch = req.body.branch;
  }
  if (req.body.balance != null) {
    res.bankAccount.balance = req.body.balance;
  }
  if (req.body.numCards != null) {
    res.bankAccount.numCards = req.body.numCards;
  }
  if (req.body.cards != null) {
    res.bankAccount.cards = req.body.cards;
  }

  try {
    const updatedBankAccount = await res.bankAccount.save();
    res.json(updatedBankAccount);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a bank account by ID
router.delete("/:id", getBankAccount, async (req, res) => {
  try {
    await res.bankAccount.remove();
    res.json({ message: "Bank account deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a single bank account by ID
async function getBankAccount(req, res, next) {
  let bankAccount;
  try {
    bankAccount = await BankAccount.findById(req.params.id);
    if (bankAccount == null) {
      return res.status(404).json({ message: "Bank account not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.bankAccount = bankAccount;
  next();
}

module.exports = router;
