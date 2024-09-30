const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData, validateLoginData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

/** Middleware to parse the request body */
app.use(express.json());
app.use(cookieParser());

/** API to signup a user */
app.post("/signup", async (req, res) => {
  try {
    // Validate the request body
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;
    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

/** API to login a user */
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    validateLoginData(req);
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$7777");
      res.cookie("token", token);
      res.send("User logged in successfully");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

/** Profile API */
app.get("/profile", async (req, res) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if(!token) {
      throw new Error("Invalid token");
    }
    // Check if the token is valid
    const decodedMessage = jwt.verify(token, "DEV@Tinder$7777");
    const { _id } = decodedMessage;
    const user = await User.findById(_id);
    if(!user) {
      throw new Error("User not found");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
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
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Invalid updates provided!!");
    }
    const dataAfterUpdate = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!dataAfterUpdate) {
      throw new Error("No user found with the given user id");
    }
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Error while updating user:" + err.message);
  }
});

/** Connect to the database and start the server */
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





