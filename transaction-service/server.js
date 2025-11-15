const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Mock transaction data
let transactions = [
  {
    id: 1,
    fromAccount: "ACC001",
    toAccount: "ACC002",
    amount: 100.0,
    type: "TRANSFER",
    timestamp: new Date().toISOString(),
  },
  {
    id: 2,
    fromAccount: "ACC002",
    toAccount: "ACC001",
    amount: 50.0,
    type: "TRANSFER",
    timestamp: new Date().toISOString(),
  },
];
let nextId = 3;

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    service: "Transaction Service",
    timestamp: new Date().toISOString(),
  });
});

// Get all transactions
app.get("/transactions", (req, res) => {
  res.json(transactions);
});

// Get transaction by ID
app.get("/transactions/:id", (req, res) => {
  const transaction = transactions.find(
    (t) => t.id === parseInt(req.params.id)
  );
  if (!transaction) {
    return res.status(404).json({ error: "Transaction not found" });
  }
  res.json(transaction);
});

// Create new transaction
app.post("/transactions", (req, res) => {
  const newTransaction = {
    id: nextId++,
    fromAccount: req.body.fromAccount,
    toAccount: req.body.toAccount,
    amount: req.body.amount,
    type: req.body.type || "TRANSFER",
    timestamp: new Date().toISOString(),
  };
  transactions.push(newTransaction);
  res.status(201).json(newTransaction);
});

// Get transactions by account
app.get("/transactions/account/:accountNumber", (req, res) => {
  const accountTransactions = transactions.filter(
    (t) =>
      t.fromAccount === req.params.accountNumber ||
      t.toAccount === req.params.accountNumber
  );
  res.json(accountTransactions);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Transaction Service running on port ${PORT}`);
});
