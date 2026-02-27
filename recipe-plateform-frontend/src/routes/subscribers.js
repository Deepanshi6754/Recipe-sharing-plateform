// routes/subscribers.js
import express from "express";
import Subscriber from "../models/Subscriber.js";

const router = express.Router();

// Count endpoint
router.get("/count", async (req, res) => {
    try {
        const count = await Subscriber.countDocuments();
        res.json({ count });
    } catch (err) {
        res.status(500).json({ message: "Failed to get subscriber count" });
    }
});

export default router;
