
import express from "express";
import Recipe from "../models/Recipe.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create recipe (protected) - owner set from token
router.post("/", authMiddleware, async (req, res) => {
  try {
    const data = {
      title: req.body.title,
      description: req.body.description,
      ingredients: Array.isArray(req.body.ingredients) ? req.body.ingredients : req.body.ingredients ? [req.body.ingredients] : [],
      steps: Array.isArray(req.body.steps) ? req.body.steps : req.body.steps ? [req.body.steps] : [],
      category: req.body.category,
      cookingTime: req.body.cookingTime,
      imageUrl: req.body.imageUrl,
      isPublic: typeof req.body.isPublic === 'boolean' ? req.body.isPublic : true,
      createdBy: req.user._id,
    };

    const recipe = await Recipe.create(data);
    await recipe.populate('createdBy', 'name avatarUrl');
    res.status(201).json({ recipe });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all public recipes with optional pagination, search and sort
// Query: ?q=chicken&page=1&limit=10&sort=createdAt:desc
router.get("/", async (req, res) => {
  try {
    const { q, page = 1, limit = 20, sort = 'createdAt:desc' } = req.query;
    const skip = (Math.max(parseInt(page, 10), 1) - 1) * Math.max(parseInt(limit, 10), 1);

    const filter = { isPublic: true };
    if (q) {
      filter.$text = { $search: q };
    }

    const [sortField, sortDir] = sort.split(":");
    const sortObj = { [sortField || 'createdAt']: sortDir === 'asc' ? 1 : -1 };

    const recipes = await Recipe.find(filter)
      .populate('createdBy', 'name avatarUrl')
      .sort(sortObj)
      .skip(skip)
      .limit(Math.max(parseInt(limit, 10), 1));

    const total = await Recipe.countDocuments(filter);

    res.json({ recipes, total, page: parseInt(page, 10), limit: parseInt(limit, 10) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get recipes by user (public ones)
router.get('/user/:userId', async (req, res) => {
  try {
    const recipes = await Recipe.find({ createdBy: req.params.userId, isPublic: true })
      .populate('createdBy', 'name avatarUrl')
      .sort({ createdAt: -1 });
    res.json({ recipes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get recipe by id (if private, only owner can access)
router.get('/:id', authMiddlewareOptional, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('createdBy', 'name avatarUrl');
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

    if (!recipe.isPublic) {
      // if private, ensure requester is owner
      if (!req.user || String(req.user._id) !== String(recipe.createdBy._id)) {
        return res.status(403).json({ message: 'Forbidden' });
      }
    }

    res.json({ recipe });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update recipe (protected & owner only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    if (String(recipe.createdBy) !== String(req.user._id)) return res.status(403).json({ message: 'Not allowed' });

    const updates = ['title', 'description', 'ingredients', 'steps', 'category', 'cookingTime', 'imageUrl', 'isPublic'];
    updates.forEach(key => {
      if (req.body[key] !== undefined) recipe[key] = req.body[key];
    });

    await recipe.save();
    await recipe.populate('createdBy', 'name avatarUrl');
    res.json({ recipe });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete recipe (protected & owner only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    if (String(recipe.createdBy) !== String(req.user._id)) return res.status(403).json({ message: 'Not allowed' });

    await recipe.remove();
    res.json({ message: 'Recipe deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

/**
 * Helper: optional auth middleware wrapper
 * If request has Authorization header, verify and attach user, otherwise continue anonymously.
 * This allows endpoints (like GET /:id) to optionally use req.user when provided.
 */

import { authMiddleware as requiredAuth } from '../middleware/authMiddleware.js';

async function authMiddlewareOptional(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return next();
  return requiredAuth(req, res, next);
}
