// import React from "react";
// import { Link } from "react-router-dom";
// import "../styles/style.css";

// const RecipeCard = ({ recipe }) => {
//     return (
//         <div className="recipe-card">
//             <img
//                 src={recipe.image || "https://via.placeholder.com/400x250.png?text=Recipe"}
//                 alt={recipe.title || "Recipe image"}
//                 loading="lazy"
//             />
//             <div className="recipe-info">
//                 <h3>{recipe.title || "Recipe Title"}</h3>
//                 <p>
//                     {recipe.description
//                         ? recipe.description.substring(0, 100) + "..."
//                         : "Delicious recipe description goes here."}
//                 </p>
//                 <Link to={`/recipe/${recipe._id || "unknown"}`}>
//                     <button className="btn-primary" aria-label={`View ${recipe.title || "recipe"}`}>
//                         View Recipe
//                     </button>
//                 </Link>
//             </div>

//             {/* Inline CSS for hover effect (optional) */}
//             <style>{`
//         .recipe-card {
//           background: #fff;
//           border-radius: 12px;
//           overflow: hidden;
//           box-shadow: 0 8px 20px rgba(0,0,0,0.1);
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//         }
//         .recipe-card:hover {
//           transform: translateY(-6px);
//           box-shadow: 0 12px 25px rgba(0,0,0,0.15);
//         }
//         .recipe-card img {
//           width: 100%;
//           height: 200px;
//           object-fit: cover;
//         }
//         .recipe-info {
//           padding: 1rem;
//         }
//         .recipe-info h3 {
//           font-size: 1.2rem;
//           font-weight: 600;
//           margin-bottom: 0.5rem;
//           color: #333;
//         }
//         .recipe-info p {
//           font-size: 0.95rem;
//           color: #555;
//           margin-bottom: 1rem;
//         }
//         .btn-primary {
//           padding: 0.6rem 1.2rem;
//           background-color: #ff6b6b;
//           color: #fff;
//           border: none;
//           border-radius: 8px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: background 0.3s;
//         }
//         .btn-primary:hover {
//           background-color: #ff4b4b;
//         }
//       `}</style>
//         </div>
//     );
// };

// export default RecipeCard;



// src/components/RecipeCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <div style={{
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
      overflow: "hidden",
      transition: "transform .18s ease"
    }}>
      <img src={recipe.image} alt={recipe.title} style={{ width: "100%", height: 180, objectFit: "cover" }} />

      <div style={{ padding: 16 }}>
        <h3 style={{ fontSize: "1.2rem", marginBottom: 8 }}>{recipe.title}</h3>
        <p style={{ color: "#666", marginBottom: 12 }}>{recipe.description}</p>

        <Link to={`/recipe/${recipe.id}`} style={{
          display: "inline-block",
          padding: "8px 14px",
          background: "#ff4b4b",
          color: "#fff",
          borderRadius: 8,
          textDecoration: "none",
          fontWeight: 600
        }}>
          View Recipe
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
