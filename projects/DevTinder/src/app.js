const express = require("express");
const app = express();

// "/abcd", "/abcNikhild" , n number time of bc in between a and d
app.get("/a(bc)+d", (req, res) => {
  res.send({ firstName: "Nikhil", lastName: "Raghuwanshi" });
});


app.listen(7777, () => {
  console.log("Server is running on http://localhost:7777");
});

