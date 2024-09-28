const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user");

/** Middleware to parse the request body */
app.use(express.json());

/** API to signup a user */
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

/** GET user by email id */
app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("No user found with the given email id");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Error while fetching user:" + err.message);
  }
});

/** Feed API - GET API to get all users */
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Error while fetching users:" + err.message);
  }
});

/** Delete API - to delete the user by userId */
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    // const user = await User.findByIdAndDelete({ _id: userId }); Both are correct
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      res.status(404).send("No user found with the given user id");
    } else {
      res.send("User deleted successfully");
    }
  } catch (err) {
    res.status(400).send("Error while deleting user:" + err.message);
  }
});

/** Update API - to update the data of the user */

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    // returnDocument: "before" returns the document before the update is applied, optional but useful
    // First parameter is the id of the document to be updated and the second parameter is the data to be updated
    // If in the data any extra field is added which is not in the schema then it will not be added to the document , It will be ignored
    const dataBefore = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "before",
    });
    console.log(dataBefore);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Error while updating user:" + err.message);
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
