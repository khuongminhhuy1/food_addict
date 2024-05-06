import express from "express";
const router = express.Router();
import { authenticate } from "../middleware/authentication.js";

// Middleware to verify admin privileges
function requireAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    next(); // User is admin, proceed to the next middleware/route handler
  } else {
    res.status(403).send("Forbidden"); // User is not an admin
  }
}
// Protected admin route
router.get("/admin/dashboard", authenticate, requireAdmin, (req, res) => {
  res.send("Admin dashboard");
});
