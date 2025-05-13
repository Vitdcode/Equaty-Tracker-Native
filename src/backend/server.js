import http from "http";
import { readFile, writeFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Get the directory name of the current module
// This ensures file paths are relative to the server.js file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define file paths for your different data types
const assetsFilePath = join(__dirname, "equaty-tracker-data.json");
const fixedCostsFilePath = join(__dirname, "fixed-costs-data.json");
const subscriptionsFilePath = join(__dirname, "subscriptions-data.json"); // New file path for subscriptions

const server = http.createServer(async (req, res) => {
  // Parse the request URL to determine the path
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const path = parsedUrl.pathname;

  // Set CORS headers to allow requests from your React Native app
  // This is important if your app and server are on different devices/ports
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any origin (adjust for production)
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // Allowed HTTP methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allowed headers

  // Handle CORS preflight requests (browsers send OPTIONS before POST/PUT etc.)
  if (req.method === "OPTIONS") {
    res.writeHead(204); // Respond with 204 No Content for successful preflight
    res.end();
    return; // End the request handling
  }

  // --- Handle requests based on the URL path ---

  // --- Handle requests for Asset Data ---
  if (path === "/api/assets") {
    if (req.method === "GET") {
      try {
        const data = await readFile(assetsFilePath, "utf-8");
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(data);
      } catch (err) {
        // If the file doesn't exist yet (first run), return an empty array as JSON
        if (err.code === "ENOENT") {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end("[]");
        } else {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Server Error: Could not read asset data.");
          console.error("Error reading asset file:", err);
        }
      }
    } else if (req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", async () => {
        try {
          const newData = JSON.parse(body); // The asset data sent from frontend
          await writeFile(assetsFilePath, JSON.stringify(newData, null, 2), "utf-8"); // Overwrite file
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("✅ Asset data overwritten successfully!");
        } catch (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Server Error: Could not write asset data.");
          console.error("Error writing asset file:", err);
        }
      });
    } else {
      res.writeHead(405, { "Content-Type": "text/plain" });
      res.end("❌ Method Not Allowed for /api/assets");
    }
  }

  // --- Handle requests for Fixed Costs Data ---
  else if (path === "/api/fixed-costs") {
    if (req.method === "GET") {
      try {
        const data = await readFile(fixedCostsFilePath, "utf-8");
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(data);
      } catch (err) {
        // If the file doesn't exist yet, return an empty array as JSON
        if (err.code === "ENOENT") {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end("[]");
        } else {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Server Error: Could not read fixed costs data.");
          console.error("Error reading fixed costs file:", err);
        }
      }
    } else if (req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", async () => {
        try {
          const newFixedCostsData = JSON.parse(body); // The fixed costs data sent from frontend
          await writeFile(fixedCostsFilePath, JSON.stringify(newFixedCostsData, null, 2), "utf-8"); // Overwrite file
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("✅ Fixed costs data overwritten successfully!");
        } catch (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Server Error: Could not write fixed costs data.");
          console.error("Error writing fixed costs file:", err);
        }
      });
    } else {
      res.writeHead(405, { "Content-Type": "text/plain" });
      res.end("❌ Method Not Allowed for /api/fixed-costs");
    }
  }

  // --- Handle requests for Subscriptions Data ---
  else if (path === "/api/subscriptions") {
    // New endpoint path
    if (req.method === "GET") {
      try {
        const data = await readFile(subscriptionsFilePath, "utf-8");
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(data);
      } catch (err) {
        // If the file doesn't exist yet, return an empty array as JSON
        if (err.code === "ENOENT") {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end("[]");
        } else {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Server Error: Could not read subscriptions data.");
          console.error("Error reading subscriptions file:", err);
        }
      }
    } else if (req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", async () => {
        try {
          const newSubscriptionsData = JSON.parse(body); // The subscriptions data sent from frontend
          await writeFile(
            subscriptionsFilePath,
            JSON.stringify(newSubscriptionsData, null, 2),
            "utf-8"
          ); // Overwrite file

          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("✅ Subscriptions data overwritten successfully!");
        } catch (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Server Error: Could not write subscriptions data.");
          console.error("Error writing subscriptions file:", err);
        }
      });
    } else {
      res.writeHead(405, { "Content-Type": "text/plain" });
      res.end("❌ Method Not Allowed for /api/subscriptions");
    }
  }

  // --- Handle requests for unknown paths ---
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("❓ Not Found");
  }
});

server.listen(8082, () => console.log("🚀 Server running on http://localhost:8082"));
