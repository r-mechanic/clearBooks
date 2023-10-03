const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cardController = require("./controllers/cardsController");

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log(req.body);
  next();
});

app.use("/cards", cardController);
app.use("/bankAccounts", require("./controllers/bankAccountController"));
app.use("/transactions", require("./controllers/transactionsController"));

const PORT = process.env.PORT || 3050;

mongoose
  .connect("mongodb://127.0.0.1:27017/clearBooks", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
