const adminAuth = (req, res, next) => {
  console.log("Admin auth getting checked");
  const token = "xyz";
  if (token === "xyz") {
    next();
  } else {
    res.status(401).send("Unauthorized Access");
  }
};

const userAuth = (req, res, next) => {
    console.log("User auth getting checked");
    const token = "xyz";
    if (token === "xyz") {
      next();
    } else {
      res.status(401).send("Unauthorized Access");
    }
  };


module.exports = {
    adminAuth,
    userAuth
}