const express = require("express");
const User = require("../models/user");
const { validateSignUpData, validateLoginData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const authRouter = express.Router();

/** API to signup a user */
authRouter.post("/signup", async (req, res) => {
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
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    validateLoginData(req);
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 2 * 86400000),
      });
      res.send(user);
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

/** API to logout a user */
authRouter.post("/logout", async (req, res) => {
  try {
    res.clearCookie("token");
    // res.cookie("token", null, { expires: new Date(0) }).send("User logged out successfully");
    res.send("User logged out successfully");
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

module.exports = authRouter;

//
