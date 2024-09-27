const express = require("express");
const app = express();

// We can add multiple request handlers to a single route
// (req,res) => {} is a request handler 
// All route handler can be written inside the array also [(req,res) => {}, (req,res) => {}]
// we can also define multiple app.get() for the same route and it will work same as array
  
app.get("/user", (req, res, next) => {
  console.log("Handling the route user!!");
  next();
});

app.get("/user", (req, res, next) => {
  console.log("Handling the route 2 user!!");
  res.send("Hello from user!!");
});

app.listen(7777, () => {
  console.log("Server is running on http://localhost:7777");
});

