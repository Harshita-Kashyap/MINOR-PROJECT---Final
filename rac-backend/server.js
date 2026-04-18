require("dotenv").config();
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

console.log("MONGO URI:", process.env.MONGO_URI);
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/", require("./routes/authRoutes"));
