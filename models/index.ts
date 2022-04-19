import mongoose from "mongoose";
import Post from "./Post";
const DB_URI = process.env.MIGRATE_dbConnectionUri;

if(!DB_URI) {
  throw Error('Could not connect due URI enviroment is not defined');
}

mongoose.connect(DB_URI as string);

export {
  Post
}