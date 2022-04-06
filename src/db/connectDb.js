const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => {
        console.log("Database connected");
      })
      .catch((error) => {
        console.log("Error connecting to database", error);
      });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
