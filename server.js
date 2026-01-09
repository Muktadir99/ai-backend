const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();

const upload = multer({
  storage: multer.memoryStorage()
});

app.use(cors());

app.get("/", (req, res) => {
  res.send("Server running");
});

app.post("/generate", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file received" });
  }

  res.json({
    message: "File received successfully"
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});