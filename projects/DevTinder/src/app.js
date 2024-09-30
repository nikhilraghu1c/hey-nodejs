const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData, validateLoginData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

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
      const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$7777", {
        expiresIn: "1d",
      });
      res.cookie("token", token, { expires: new Date(Date.now() + 2 * 86400000) });
      res.send("User logged in successfully");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

/** Get Login User Profile API */
app.get("/profile", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

/** Send Connection Request */
app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  res.send(user.firstName + " Connection request sent successfully");
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
