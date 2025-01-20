const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  socialMediaHandle: { type: String, required: true },
  images: [String], // Storing image URLs as strings
});

module.exports = mongoose.model("User", userSchema);

