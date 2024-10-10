const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Unauthorized: Please Login");
    }
    // Check if the token is valid
    const decodedObj = await jwt.verify(token, "DEV@Tinder$7777");
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    } else {
      req.user = user; // Set the user object in the request object
      next();
    }
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
};

module.exports = {
  userAuth,
};
