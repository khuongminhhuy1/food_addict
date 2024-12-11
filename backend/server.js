import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { runAdminJS } from "./services/admin.mjs"; // Assuming this initializes AdminJS

import userRoute from "./routes/userRoute.js";
import mainRoute from "./routes/mainRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import orderRoute from "./routes/orderRoute.js";
import cartRoute from "./routes/cartRoute.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// AdminJS Initialization (Make sure runAdminJS correctly sets up AdminJS for you)
runAdminJS(app);

// Middleware for parsing JSON and URL-encoded data
app.use(express.json({ limit: "50mb" })); // Allow larger payloads if needed
app.use(express.urlencoded({ extended: true, limit: "50mb" })); // Handle form submissions with larger data

// Static files and views setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// CORS setup for cross-origin requests
app.use(cors({ credentials: true, origin: true }));

// Routes setup
app.use("/", mainRoute);
app.use("/user", userRoute);
app.use("/category", categoryRoute);
app.use("/product", productRoute);
app.use("/orders", orderRoute);
app.use("/cart", cartRoute);

// Start the server
const port = process.env.PORT || 5555;
app.listen(port, () => console.log(`Listening on port ${port}`));
