const express = require("express");
const app = express();

// regex /a/ will match any string that has a in it. we can also give regex on the route
app.get(/a/, (req, res) => {
  res.send({ firstName: "Nikhil", lastName: "Raghuwanshi" });
});

// https://localhost:7777/user?firstName=Nikhil&lastName=Raghuwanshi
// req.query will give us the query params
app.get("/user", (req, res) => {
  console.log(req.query);
  res.send({ firstName: "Nikhil", lastName: "Raghuwanshi" });
});

// https://localhost:7777/user/123 https://localhost:7777/user/234
// req.params will give us the params
// Dynamic route
app.get("/user/:userId", (req, res) => {
  console.log(req.params);
  res.send({ firstName: "Nikhil", lastName: "Raghuwanshi" });
});

app.listen(7777, () => {
  console.log("Server is running on http://localhost:7777");
});

