const { Post } = require("../models");
const { data } = require("../models/post");

/**
 * Make any changes you need to make to the database here
 */
async function up() {
  // Write migration here
  if (typeof data === "object" && data.length) {
    await Post.create(data);
  }
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down() {
  // Write migration here
}

module.exports = { up, down };
