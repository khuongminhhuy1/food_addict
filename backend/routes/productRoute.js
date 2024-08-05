import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import { constructUrl } from "../urlHelper.js";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
} from "../controllers/productController.js";

const prisma = new PrismaClient();

router.use((req, res, next) => {
  res.locals.url = constructUrl(req);
  next();
});

router.get("/create", async (req, res) => {
  const categories = await prisma.category.findMany();
  res.render("./product/create", { categories: categories });
});

router.get("/", getAllProduct);
router.get("/:id", getProductById);
router.post("/create", createProduct);
router.delete("/:id", deleteProduct);

export default router;
