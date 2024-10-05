const express = require("express");
const userRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");

/** Get all pending connection request for the loggedIn user */
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    // Find all the connection requests where the loggedIn user is the toUserId and status is interested
    const connectionRequests = await connectionRequest.find({
        toUserId: loggedInUser._id,
        status: "interested"
    }).populate("fromUserId", ["firstName", "lastName", "photoUrl", "age", "gender", "about", "skills"]);
    // .populate("fromUserId", "firstName lastName"); It also works same as above

    res.json({
        message: "Data fetched successfully",
        data: connectionRequests
    })

  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

module.exports = userRouter;
