const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true, // 
      minLength: 4,
      maxLength: 50
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true, // Ensures that the email is provided
      unique: true, // Ensures that the email is unique
      lowercase: true, // Converts the email to lowercase before saving it
      trim: true, // Removes the extra spaces from the email
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      validate(value) { 
        // Use to validate the gender data provided by the user is valid or not
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is invalid!!");
        }
      },
    },
    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png", // Default image for the user
    },
    about: {
      type: String,
      default: "This is a default about of the user!!",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true, // Adds the createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("User", userSchema);
