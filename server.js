const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/generate", (req, res) => {
  res.json({ message: "Hello from backend" });
});

app.listen(3000);