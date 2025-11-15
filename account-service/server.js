const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Mock account data
let accounts = [
  { id: 1, accountNumber: 'ACC001', balance: 5000, customerId: 'CUST001' },
  { id: 2, accountNumber: 'ACC002', balance: 2500, customerId: 'CUST002' }
];

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', service: 'Account Service' });
});

// Get all accounts
app.get('/accounts', (req, res) => {
  res.json(accounts);
});

// Get account by ID
app.get('/accounts/:id', (req, res) => {
  const account = accounts.find(acc => acc.id === parseInt(req.params.id));
  if (!account) {
    return res.status(404).json({ error: 'Account not found' });
  }
  res.json(account);
});

// Create new account
app.post('/accounts', (req, res) => {
  const newAccount = {
    id: accounts.length + 1,
    accountNumber: `ACC${String(accounts.length + 1).padStart(3, '0')}`,
    balance: req.body.balance || 0,
    customerId: req.body.customerId
  };
  accounts.push(newAccount);
  res.status(201).json(newAccount);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Account Service running on port ${PORT}`);
});