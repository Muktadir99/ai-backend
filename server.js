const express = require("express");
const multer = require("multer");

const app = express();
const upload = multer({ dest: "uploads/" });

app.post("/generate", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.json({ message: "No file received" });
  }

  res.json({
    message: "File received successfully",
    filename: req.file.originalname
  });
});

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(3000);