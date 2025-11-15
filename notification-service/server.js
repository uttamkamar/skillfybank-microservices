const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock notification data
let notifications = [
  {
    id: 1,
    accountNumber: "ACC001",
    message: "Welcome to SkillfyBank!",
    type: "WELCOME",
    timestamp: new Date().toISOString(),
    status: "SENT",
  },
  {
    id: 2,
    accountNumber: "ACC002",
    message: "Transaction completed: $100.00",
    type: "TRANSACTION",
    timestamp: new Date().toISOString(),
    status: "SENT",
  },
];
let nextId = 3;

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    service: "Notification Service",
    timestamp: new Date().toISOString(),
  });
});

// Get all notifications
app.get("/notifications", (req, res) => {
  res.json(notifications);
});

// Get notification by ID
app.get("/notifications/:id", (req, res) => {
  const notification = notifications.find(
    (n) => n.id === parseInt(req.params.id)
  );
  if (!notification) {
    return res.status(404).json({ error: "Notification not found" });
  }
  res.json(notification);
});

// Get notifications by account number
app.get("/notifications/account/:accountNumber", (req, res) => {
  const accountNotifications = notifications.filter(
    (n) => n.accountNumber === req.params.accountNumber
  );
  res.json(accountNotifications);
});

// Create new notification
app.post("/notifications", (req, res) => {
  const newNotification = {
    id: nextId++,
    accountNumber: req.body.accountNumber,
    message: req.body.message,
    type: req.body.type || "GENERAL",
    timestamp: new Date().toISOString(),
    status: "SENT",
  };
  notifications.push(newNotification);
  res.status(201).json(newNotification);
});

// Simulate notification (bonus endpoint)
app.post("/notifications/simulate", (req, res) => {
  const newNotification = {
    id: nextId++,
    accountNumber: req.body.accountNumber || "ACC001",
    message: req.body.message || "Test notification from SkillfyBank",
    type: "SIMULATED",
    timestamp: new Date().toISOString(),
    status: "SENT",
  };
  notifications.push(newNotification);

  console.log(`Notification sent: ${newNotification.message}`);

  res.status(201).json({
    message: "Notification sent successfully",
    notification: newNotification,
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Notification Service running on port ${PORT}`);
});
