const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://mongodb_node:x8rGIM6G8wjxSzLd@heynodejs.eig1v.mongodb.net/devTinder"
  );
};

module.exports = {
    connectDB,
}
