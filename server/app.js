const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect DB
connectDB();

const PORT = process.env.port || 3000;

app.get("/", (req, res) => res.send("API Running"));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));