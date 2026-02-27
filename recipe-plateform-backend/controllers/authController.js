import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// --------------------
// Helper: Generate JWT
// --------------------
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });
};

// --------------------
// Signup Controller
// --------------------
export const signupUser = async (req, res) => {
    try {
        const { fullName, email, password, confirmPassword } = req.body;

        // Validate required fields
        if (!fullName || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check password match
        if (password.trim() !== confirmPassword.trim()) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Check numeric-only and min 6 digits
        if (!/^\d{6,}$/.test(password)) {
            return res.status(400).json({
                message: "Password must be numeric and at least 6 digits long",
            });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
        });

        // Generate token
        const token = generateToken(newUser._id);

        res.status(201).json({
            message: "Signup successful",
            userId: newUser._id,
            token,
        });
    } catch (error) {
        console.error("❌ Signup error:", error);
        res.status(500).json({
            message: "Signup failed",
            error: error.message,
        });
    }
};

// --------------------
// Login Controller
// --------------------
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate token
        const token = generateToken(user._id);

        res.status(200).json({
            message: "Login successful",
            userId: user._id,
            token,
        });
    } catch (error) {
        console.error("❌ Login error:", error);
        res.status(500).json({
            message: "Login failed",
            error: error.message,
        });
    }
};
