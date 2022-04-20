const { default: mongoose } = require("mongoose");

module.exports = function connectToDatabase() {
  const DB_URI = process.env.MIGRATE_dbConnectionUri;

  if (!DB_URI) {
    throw Error("Could not connect due URI enviroment is not defined");
  }

  mongoose.connect(DB_URI, { useUnifiedTopology: true });

  const db = mongoose.connection;

  db.on("error", () => console.error("MongoDB connection error:"));
};
