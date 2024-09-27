const express = require("express");
const app = express();

// Handle Auth Middleware for all the request to /admin (Get, Post, Put, Delete)
app.use("/admin", (req, res, next) => {
 console.log("Admin auth getting checked")
 const token = "xyz";
  if (token === "xyz") {
    next();
  } else {
    res.status(401).send("Unauthorized Access");
    // res.status(401) use to send the status code 401
  }
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

