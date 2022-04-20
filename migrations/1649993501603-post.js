const connectToDatabase = require("../models/connectToDatabase");
const { model: Post } = require("../models/post");
const { data } = require("../models/post");

/**
 * Make any changes you need to make to the database here
 */
async function up() {
  // Write migration here
  try {
    await connectToDatabase();

    if (typeof data === "object" && data.length) {
      await Post.create(data);
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down() {
  // Write migration here
  try {
    await Post.deleteMany();
  } catch (error) {
    console.log('cannot delete post data');
    console.error(error);
  }
}

module.exports = { up, down };
