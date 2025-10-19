import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());

const PORT = process.env.PORT || 8080;

// Root endpoint (optional)
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Backend Wizards Stage 0 API! Go to /me 🚀",
  });
});

// /me endpoint
app.get("/me", async (req, res) => {
  try {
    const response = await axios.get("https://catfact.ninja/fact", {
      timeout: 5000, // 5 seconds timeout
    });

    const catFact = response.data.fact;
    const currentTime = new Date().toISOString();

    res.status(200).json({
      status: "success",
      user: {
        email: process.env.YOUR_EMAIL,
        name: process.env.YOUR_NAME,
        stack: process.env.YOUR_STACK,
      },
      timestamp: currentTime,
      fact: catFact,
    });
  } catch (error) {
    console.error("Error fetching cat fact:", error.message);

    // Handle external API error gracefully
    res.status(200).json({
      status: "success",
      user: {
        email: process.env.YOUR_EMAIL,
        name: process.env.YOUR_NAME,
        stack: process.env.YOUR_STACK,
      },
      timestamp: new Date().toISOString(),
      fact: "Could not fetch a cat fact right now. Please try again later 😿",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
