const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");

const app = express();
dotenv.config();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => console.log(err));