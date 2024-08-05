import express from "express";
const router = express.Router();
import { authenticate } from "../middleware/authentication.js";
import { constructUrl } from "../urlHelper.js";
import { createOrderWithShipping } from "../controllers/orderController.js";

router.use((req, res, next) => {
  res.locals.url = constructUrl(req);
  next();
});

router.post("/create", createOrderWithShipping);

export default router;
