import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// GET profile
router.get("/me", authMiddleware, async (req, res) => {
  if (!req.user) return res.status(404).json({ message: "User not found" });
  res.json({ user: req.user });
});

// PUT profile (update)
router.put("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update fields from frontend
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    // Add any other fields you want to allow update

    await user.save(); // <-- important, saves to DB
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
