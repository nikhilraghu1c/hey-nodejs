const express = require("express");
const { userAuth } = require("../middlewares/auth");
const profileRouter = express.Router();
const { validateEditProfileData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");

/** Get Login User Profile API */
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

/** Edit Login User Profile API */
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid edit request");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((field) => {
      loggedInUser[field] = req.body[field];
    });
    await loggedInUser.save();
    // res.send(`${loggedInUser.firstName} your profile updated successfully`);
    res.json({
      message: `${loggedInUser.firstName} your profile updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

/** Update Login user Password */
profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { oldPassword, newPassword } = req.body;
    const isOldPasswordValid = await bcrypt.compare(
      oldPassword,
      loggedInUser.password
    );
    if (!isOldPasswordValid) {
      throw new Error("Old password is invalid");
    }
    if (!validator.isStrongPassword(newPassword)) {
      throw new Error("Password is not strong!!");
    }

    loggedInUser.password = await bcrypt.hash(newPassword, 10);
    loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName} your password updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

module.exports = profileRouter;
