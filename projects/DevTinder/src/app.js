const express = require("express");
const app = express();

app.use("/", (req, res) => {
  res.send("Hello, Express.js");
});

app.use("/hello", (req, res) => {
  res.send("Hello Everyone!");
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
 * 
 * Fixed code: app.get() for Specific Routes
 */
