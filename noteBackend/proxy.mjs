import express from "express";
import fetch from "node-fetch";

const app = express();
const port = 3001;

// CORS middleware to allow requests from your React frontend
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");  // Allow all origins (you can restrict this to http://localhost:3000 if you prefer)
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight request (OPTIONS)
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.get("/proxy", async (req, res) => {
  const sanityUrl = "https://qejur137.api.sanity.io/v2023-01-01/data/query/production";  // Updated project ID and dataset
  const query = req.query.query; // Forward query parameter

  try {
    const response = await fetch(`${sanityUrl}?query=${encodeURIComponent(query)}`);
    const data = await response.json();

    // Log the Sanity API response
    console.log("Sanity API Response:", response);
    console.log("Parsed Data:", data);

    // Send the data with CORS headers
    res.json(data);
  } catch (err) {
    console.error("Error fetching data from Sanity:", err);
    res.status(500).json({ error: "Failed to fetch data from Sanity API" });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
