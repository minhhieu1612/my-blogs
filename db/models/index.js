const { default: mongoose } = require("mongoose");
const post = require("./post").default;

const DB_URI = process.env.MIGRATE_dbConnectionUri;

if(!DB_URI) {
  throw Error('Could not connect due URI enviroment is not defined');
}

mongoose.connect(DB_URI);

module.exports = {
  Post: post
}