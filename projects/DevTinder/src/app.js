const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user");

// Middleware to parse the request body
app.use(express.json());

// API to signup a user
app.post("/signup", async (req, res) => {
  // Creating a new instance of the User model
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error while adding user:" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database cluster connected successfully");
    app.listen(7777, () => {
      console.log("Server is running on http://localhost:7777");
    });
  })
  .catch((err) => {
    console.log("Unable to connect to database cluster!!");
  });
