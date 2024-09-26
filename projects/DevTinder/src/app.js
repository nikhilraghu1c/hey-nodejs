const express = require("express");
const app = express();

// Only Handle GET Requests for /user Route
app.get("/user", (req, res) => {
  res.send({ firstName: "Nikhil", lastName: "Raghuwanshi" });
});

app.post("/user", (req, res) => {
  // saving data to db
  res.send("User data saved successfully");
});

app.delete("/user", (req, res) => {
  // delete user data from db
  res.send("User data deleted successfully");
});

app.use("/test", (req, res) => {
  res.send("Hello from the test route");
});

app.listen(7777, () => {
  console.log("Server is running on http://localhost:7777");
});


/**
 * app.use() is typically used for middleware, and it matches any route that starts with the specified path.
 * So when you use app.use("/", ...), it will match any path, including "/hello" and "/test", because both these routes start with /.
 * This means that when you hit /hello or /test, the "/" route will be triggered because "/" matches all paths.
 * If we write app.use("/") after app.use("/hello") and app.use("/test"), then all routes will worked as expected. Sequence of routes is important.
 *
 * Fixed code: app.get() for Specific Routes
 */
