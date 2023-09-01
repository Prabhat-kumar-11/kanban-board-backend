const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  console.log("hello")
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: {conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
module.exports = connectDB;