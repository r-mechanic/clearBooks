const express = require("express");
const Transaction = require("../models/Transaction");

const router = express.Router();

// Get all transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single transaction by ID
router.get("/:id", getTransaction, (req, res) => {
  res.json(res.transaction);
});

// Create a new transaction
router.post("/", async (req, res) => {
  const transaction = new Transaction({
    amount: req.body.amount,
    date: req.body.date,
    category: req.body.category,
    method: req.body.method,
    notes: req.body.notes,
    type: req.body.type,
    card: req.body.card,
    account: req.body.account,
  });

  try {
    const newTransaction = await transaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a transaction by ID
router.patch("/:id", getTransaction, async (req, res) => {
  if (req.body.amount != null) {
    res.transaction.amount = req.body.amount;
  }
  if (req.body.date != null) {
    res.transaction.date = req.body.date;
  }
  if (req.body.category != null) {
    res.transaction.category = req.body.category;
  }
  if (req.body.method != null) {
    res.transaction.method = req.body.method;
  }
  if (req.body.notes != null) {
    res.transaction.notes = req.body.notes;
  }
  if (req.body.type != null) {
    res.transaction.type = req.body.type;
  }
  if (req.body.card != null) {
    res.transaction.card = req.body.card;
  }
  if (req.body.account != null) {
    res.transaction.account = req.body.account;
  }

  try {
    const updatedTransaction = await res.transaction.save();
    res.json(updatedTransaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a transaction by ID
router.delete("/:id", getTransaction, async (req, res) => {
  try {
    await res.transaction.remove();
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a single transaction by ID
async function getTransaction(req, res, next) {
  let transaction;
  try {
    transaction = await Transaction.findById(req.params.id);
    if (transaction == null) {
      return res.status(404).json({ message: "Transaction not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.transaction = transaction;
  next();
}

module.exports = router;
