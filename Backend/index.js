const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes"); 

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json()); 

// Routes
app.use("/api/auth", authRoutes);    
app.use("/api/tasks", taskRoutes);  


mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(5000, () => {
            console.log("Server is running on port 5000");
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });
