require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const userRoutes = require("./routers/userRouter");
const feedbackRoutes = require("./routers/feedbackRouter");


// express app
const app = express();

// MongoDB connection
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.get("/", (req, res) => res.send("API Running!"));
app.use("/api/user", userRoutes);
app.use("/api/feedback", feedbackRoutes);


module.exports = app;


