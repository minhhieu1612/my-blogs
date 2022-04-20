const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: String,
  description: String,
  createdDate: Date,
  updatedDate: Date,
});

module.exports = mongoose.model("post", schema);