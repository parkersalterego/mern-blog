// Packages
const express = require("express");

// Files
const connectDB = require("./config/db");
const controllers = require("./controllers/controllers");

// Variables
const app = express();
const PORT = process.env.port || 3000;

// Connect DB
connectDB();

// request parsing middleware
app.use(express.json({ extended: false }));

// index route
app.get("/", (req, res) => res.send("API Running"));

// route prefix
app.use("/api", controllers);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));