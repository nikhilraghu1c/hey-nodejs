const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");

/** Middleware to parse the request body */
app.use(express.json());
app.use(cookieParser());

/** Import all routes */
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);


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

