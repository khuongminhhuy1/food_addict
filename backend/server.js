import "dotenv/config";
import express from "express";
const app = express();
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import userRoute from "./routes/userRoute.js";
import mainRoute from "./routes/mainRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import orderRoute from "./routes/orderRoute.js";
import cartRoute from "./routes/cartRoute.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(cors({ credentials: true, origin: true }));

//route
app.use("/", mainRoute);
app.use("/user", userRoute);
app.use("/category", categoryRoute);
app.use("/product", productRoute);
app.use("/orders", orderRoute);
app.use("/cart", cartRoute);

const port = process.env.PORT || 5555;
app.listen(port, () => console.log(`Listening on port ${port}`));
