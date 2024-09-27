const express = require("express");
const app = express();

// We can add multiple request handlers to a single route
// (req,res) => {} is a request handler 
app.use("/user", (req, res, next) => {
  console.log("Handling the route user!!");
  // res.send("Hello User!!"); // next will called and error will be thrown
  // nextis use to pass the control to the next request handler called as middleware
  next();
}, (req, res) => {
  console.log("Handling the route user 2!!");
  res.send("Hello User 2!!");
});

app.listen(7777, () => {
  console.log("Server is running on http://localhost:7777");
});

