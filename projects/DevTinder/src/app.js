const express = require("express");
const app = express();

app.get("/getUserData", (req, res) => {
  // Logic of DB call and get user data
  try {
    throw new Error("DB Connection Failed");
    res.send("User Data Sent");
  } catch (err) {
    res.status(500).send("Some Error Occurred");
  }
});

// Wild card error handling
app.use("/", (err, req, res, next) => {
  if (err) {
    // Log the error
    res.status(500).send("Something went wrong");
  }
});

app.listen(7777, () => {
  console.log("Server is running on http://localhost:7777");
});
