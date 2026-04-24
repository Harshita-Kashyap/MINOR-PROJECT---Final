// config\db.js

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in .env file");
    }

    console.log("⏳ Connecting to MongoDB...");

    // 🔧 Recommended setting
    mongoose.set("strictQuery", true);

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected ✅");
    console.log(`📦 Host: ${conn.connection.host}`);
    console.log(`🗄 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:");
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
