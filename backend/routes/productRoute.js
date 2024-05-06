import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import { constructUrl } from "../urlHelper.js";
import {
  createProduct,
  deleteProduct,
} from "../controllers/productController.js";

const prisma = new PrismaClient();

router.use((req, res, next) => {
  res.locals.url = constructUrl(req);
  next();
});

router.get("/", (req, res) => {
  res.render("./index");
});

router.get("/create", async (req, res) => {
  const categories = await prisma.category.findMany();
  res.render("./product/create", { categories: categories });
});
router.post("/create", createProduct);
router.delete("/:id", deleteProduct);

export default router;
