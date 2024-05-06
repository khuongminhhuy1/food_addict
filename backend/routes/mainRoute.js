import express from "express";
const router = express.Router();
import cors from "cors";
import { constructUrl } from "../urlHelper.js";

router.use((req, res, next) => {
  res.locals.url = constructUrl(req);
  next();
});

router.get("/", (req, res) => {
  res.render("./index");
});

export default router;
