const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());

const PORT = process.env.PORT || 8080;

// ✅ Reusable function for both `/` and `/me`
const getProfileResponse = async () => {
  try {
    const response = await axios.get("https://catfact.ninja/fact", { timeout: 5000 });
    const catFact = response.data.fact;

    return {
      status: "success",
      user: {
        email: process.env.YOUR_EMAIL,
        name: process.env.YOUR_NAME,
        stack: process.env.YOUR_STACK,
      },
      timestamp: new Date().toISOString(),
      fact: catFact,
    };
  } catch (error) {
    console.error("Error fetching cat fact:", error.message);
    return {
      status: "success",
      user: {
        email: process.env.YOUR_EMAIL,
        name: process.env.YOUR_NAME,
        stack: process.env.YOUR_STACK,
      },
      timestamp: new Date().toISOString(),
      fact: "Could not fetch a cat fact right now. Please try again later 😿",
    };
  }
};

// ✅ Default route (/) now returns same as /me
app.get("/", async (req, res) => {
  const result = await getProfileResponse();
  res.status(200).json(result);
});

// ✅ /me route also returns same
app.get("/me", async (req, res) => {
  const result = await getProfileResponse();
  res.status(200).json(result);
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
