import express from "express";
const router = express.Router();
import cors from "cors";
import { constructUrl } from "../urlHelper.js";
import {
  createCategory,
  deleteCategory,
  showCategory,
  showSingleCategory,
  updateCategory,
} from "../controllers/categoryController.js";

router.use((req, res, next) => {
  res.locals.url = constructUrl(req);
  next();
});

router.get("/create", (req, res) => {
  res.render("./category/create");
});

//CRUD
router.get("/", showCategory, (req, res) => {
  res.render("./category/index");
});
router.get("/:id", showSingleCategory);
router.post("/create", createCategory);
router.put("/:id/edit", updateCategory);
router.delete("/:id/delete", deleteCategory);

export default router;
