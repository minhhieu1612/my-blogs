const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: String,
  description: String,
  createdDate: Date,
  updatedDate: Date,
});

const data = [
  {
    id: "adf",
    title: "post title 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, velit quam eveniet dolores facere voluptates consequatur. Quidem labore molestiae dolorem.",
    createdDate: new Date(),
    updatedDate: new Date()
  },
  {
    id: "abc",
    title: "post title 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, velit quam eveniet dolores facere voluptates consequatur. Quidem labore molestiae dolorem.",
    createdDate: new Date(),
    updatedDate: new Date()
  },
];

module.exports = { default: mongoose.model("post", schema), data };
