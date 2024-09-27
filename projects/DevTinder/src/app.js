const express = require("express");
const app = express();
const { adminAuth, userAuth } = require("./middlewares/auth");

// Handle Auth Middleware for all the request to /admin (Get, Post, Put, Delete)
app.use("/admin", adminAuth);

// userAuth Middleware for /user route
app.get("/user", userAuth, (req, res) => {
  res.send("User Data Sent");
});

// Middleware mainly use for logging and authentication purpose
app.get("/admin/getAllData", (req, res) => {
  res.send("All Data Sent");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted User");
});

app.listen(7777, () => {
  console.log("Server is running on http://localhost:7777");
});
