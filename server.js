const express = require("express");
const multer = require("multer");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
const PORT = 3000;

// multer memory storage (Render safe)
const upload = multer({
  storage: multer.memoryStorage()
});

app.use(cors());

// ===== TEST ROUTE =====
app.get("/", (req, res) => {
  res.send("Server running");
});

// ===== MAIN GENERATE ROUTE =====
app.post("/generate", upload.single("image"), async (req, res) => {
  try {
    const { style, apiKey } = req.body;

    // validations
    if (!apiKey) {
      return res.status(400).json({ message: "API key missing" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image missing" });
    }

    // create OpenAI client with USER key
    const openai = new OpenAI({
      apiKey: apiKey
    });

    // prompt based on dropdown
    const prompt = `Create a ${style} style image based on the uploaded photo`;

    // AI image generation
    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt: prompt,
      size: "1024x1024"
    });

    // send image URL to frontend
    res.json({
      imageUrl: result.data[0].url
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "AI generation failed"
    });
  }
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});