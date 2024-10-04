const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
      maxLength: 50,
    },
    emailId: {
      type: String,
      required: true, // Ensures that the email is provided
      unique: true, // Ensures that the email is unique
      lowercase: true, // Converts the email to lowercase before saving it
      trim: true, // Removes the extra spaces from the email
      validate(value) {
        // use to validate the value provided by the user is valid or not
        // Use to validate the email provided by the user is valid or not , using validator
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid!!");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong!!");
        }
      },
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: `{VALUE} is incorrect gender type`,
      },
      // validate(value) {
      // this is a custom validator to validate the gender , works same as enum
      //   if (!["male", "female", "others"].includes(value)) {
      //     throw new Error("Gender data is invalid!!");
      //   }
      // },
    },
    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png", // Default image for the user
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Photo URL is invalid!!");
        }
      },
    },
    about: {
      type: String,
      default: "This is a default about of the user!!",
    },
    skills: {
      type: [String],
      validate(value) {
        if (value.length > 10) {
          throw new Error("Skills cannot be more than 10!!");
        }
      },
    },
  },
  {
    timestamps: true, // Adds the createdAt and updatedAt fields
  }
);

/** Method to get the JWT token */
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$7777", {
    expiresIn: "1d",
  });
  return token;
};

/** Method to validate the password */
userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  return await bcrypt.compare(passwordInputByUser, passwordHash);
};

module.exports = mongoose.model("User", userSchema);
