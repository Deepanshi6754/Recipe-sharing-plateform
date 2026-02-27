
// routes/subscribers.js
import express from "express";
import Subscriber from "../models/Subscriber.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add subscriber
router.post("/", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const existing = await Subscriber.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already subscribed" });

    const subscriber = await Subscriber.create({ email });
    res.status(201).json({ subscriber });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get subscriber count
router.get("/count", async (req, res) => {
  try {
    const count = await Subscriber.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
