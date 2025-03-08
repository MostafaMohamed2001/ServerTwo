const express = require("express");
const { JSONRPCServer } = require("json-rpc-2.0");

const app = express();
app.use(express.json());

const server = new JSONRPCServer();

// بيانات المستخدمين
const usersBalance = {
  "user_1": [
    {
      transactionType: "deposite",
      amount: 1000,
      timestamp: new Date(),
    },
    {
      transactionType: "withdrawal",
      amount: 500,
      timestamp: new Date(),
    },
    {
      transactionType: "deposite",
      amount: 250,
      timestamp: new Date(),
    },
  ],
  "user_2": [
    {
      transactionType: "deposite",
      amount: 1500,
      timestamp: new Date(),
    },
    {
      transactionType: "withdrawal",
      amount: 100,
      timestamp: new Date(),
    },
    {
      transactionType: "withdrawal",
      amount: 200,
      timestamp: new Date(),
    },
  ],
};

// دالة إرجاع العمليات المالية
server.addMethod("getTransactions", ({ userId }) => {
  console.log(`📩 Received request for userId: ${userId}`);
  const transactions = usersBalance[userId] || "User not found";
  console.log(`📤 Response:`, transactions);
  return transactions;
});

// نقطة نهاية JSON-RPC
app.post("/rpc", (req, res) => {
  console.log("🔹 Incoming JSON-RPC Request:", req.body);
  server.receive(req.body).then((jsonRPCResponse) => {
    // console.log("🔹 JSON-RPC Response:", jsonRPCResponse);
    res.json(jsonRPCResponse);
  });
});

// تشغيل السيرفر
app.listen(3001, () => {
  console.log("✅ JSON-RPC Server running on port 3001");
});