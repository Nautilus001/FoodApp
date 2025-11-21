const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(cors());
const upload = multer({ storage: multer.memoryStorage() });

app.post("/analyze", upload.single("photo"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("Received file:", req.file.originalname);

    // simulate processing delay
    await new Promise((r) => setTimeout(r, 1000));

    // read mock JSON file
    const mockFilePath = path.join(__dirname, "mockMealPayload.json");
    const data = fs.readFileSync(mockFilePath, "utf-8");
    const jsonResult = JSON.parse(data);

    return res.json({ success: true, result: jsonResult });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

app.get("/initialMeals", async (req, res) => {
  try {

    const mockFilePath = path.join(__dirname, "mockInitialMeals.json");
    const data = fs.readFileSync(mockFilePath, "utf-8");
    const jsonResult = JSON.parse(data);

    return res.json({ success: true, result: jsonResult });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

app.listen(3000, () => {
  console.log("ML mock server running on http://localhost:3000");
});