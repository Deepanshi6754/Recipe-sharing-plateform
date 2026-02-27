
import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    ingredients: { type: [String], default: [] },
    // Use an array of step strings so each step is addressable
    steps: { type: [String], default: [] },
    category: { type: String, trim: true, default: "Uncategorized" },
    cookingTime: { type: Number, min: 0 }, // minutes
    imageUrl: { type: String },
    // createdBy is required to link recipe to a user; set on server from authenticated user
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    // make recipe public by default; you can use this flag later to support drafts/private recipes
    isPublic: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Text index to help with simple search by title/description/ingredients
recipeSchema.index({ title: "text", description: "text", ingredients: "text" });

// Optional helper method: returns brief summary
recipeSchema.methods.summary = function (maxLen = 120) {
  const txt = this.description || "";
  return txt.length > maxLen ? txt.slice(0, maxLen) + "..." : txt;
};

const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;
