const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("First Name and Last Name are mandatory fields");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is invalid!!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong!!");
  }
};

const validateLoginData = (req) => {
  const { emailId, password } = req.body;
  if (!emailId || !password) {
    throw new Error("Email and Password are mandatory fields");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is invalid!!");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "gender",
    "skills",
    "age",
    "about",
    "photoUrl",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) => {
    return allowedEditFields.includes(field);
  });

  return isEditAllowed;
};

module.exports = {
  validateSignUpData,
  validateLoginData,
  validateEditProfileData,
};
