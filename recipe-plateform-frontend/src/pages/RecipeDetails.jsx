// // src/pages/RecipeDetails.jsx
// import React, { useEffect, useState } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import recipes from "../data/recipes";
// import { getAllRecipes } from "../services/api";
// import { useAuth } from "../context/AuthContext";

// const RecipeDetails = () => {
//   const { id } = useParams();
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [backendRecipe, setBackendRecipe] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [commentInput, setCommentInput] = useState("");
//   const [comments, setComments] = useState([]);
//   const [editingCommentId, setEditingCommentId] = useState(null);

//   let recipe = recipes.find((r) => r.id === Number(id));
//   if (!recipe) {
//     const stored = JSON.parse(localStorage.getItem("userRecipes") || "[]");
//     recipe = stored.find((r) => String(r.id) === id);
//   }

//   useEffect(() => {
//     const fetchBackendRecipe = async () => {
//       if (recipe) { setLoading(false); return; }
//       try {
//         const data = await getAllRecipes();
//         const found = data.recipes.find((r) => r._id === id);
//         if (found) setBackendRecipe(found);
//       } catch (error) { console.error(error); }
//       setLoading(false);
//     };
//     fetchBackendRecipe();
//   }, [id]);

//   // Load comments
//   useEffect(() => {
//     const storedComments = JSON.parse(localStorage.getItem(`comments-${id}`) || "[]");
//     setComments(storedComments);
//   }, [id]);

//   // Save comments to localStorage
//   const saveComments = (newComments) => {
//     setComments(newComments);
//     localStorage.setItem(`comments-${id}`, JSON.stringify(newComments));
//   };

//   const handleCommentSubmit = (e) => {
//     e.preventDefault();

//     if (!user) {
//       // Redirect to login if not logged in
//       navigate("/login");
//       return;
//     }

//     if (!commentInput.trim()) return;

//     if (editingCommentId) {
//       const updatedComments = comments.map((c) =>
//         c.id === editingCommentId ? { ...c, text: commentInput } : c
//       );
//       saveComments(updatedComments);
//       setEditingCommentId(null);
//     } else {
//       const newComment = {
//         id: Date.now(),
//         username: user.name, // show logged-in user's name
//         text: commentInput.trim(),
//       };
//       saveComments([newComment, ...comments]);
//     }

//     setCommentInput("");
//   };

//   const handleEdit = (comment) => {
//     if (!user || user.name !== comment.username) return; // only author can edit
//     setCommentInput(comment.text);
//     setEditingCommentId(comment.id);
//   };

//   const handleDelete = (comment) => {
//     if (!user || user.name !== comment.username) return; // only author can delete
//     const updatedComments = comments.filter((c) => c.id !== comment.id);
//     saveComments(updatedComments);
//   };

//   const finalRecipe = recipe || backendRecipe;

//   if (loading) return <p style={{ padding: 40, textAlign: "center" }}>Loading...</p>;
//   if (!finalRecipe)
//     return (
//       <div style={{ padding: 40, textAlign: "center" }}>
//         <h2>Recipe not found</h2>
//         <Link to="/recipes" style={{ color: "#ff4b4b" }}>Back to recipes</Link>
//       </div>
//     );

//   const rawSteps = finalRecipe.instructions || finalRecipe.steps || [];
//   const instructions =
//     typeof rawSteps === "string"
//       ? rawSteps.split(/[\r\n]+|\.\s+/).map((s) => s.trim()).filter(Boolean)
//       : rawSteps;

//   return (
//     <main style={{ padding: "3rem 1rem", maxWidth: "1200px", margin: "auto", fontFamily: "'Poppins', sans-serif", color: "#222" }}>
//       <Link to="/recipes" style={{ display: "inline-block", marginBottom: "20px", color: "#666", textDecoration: "none", fontSize: "14px" }}>← Back to recipes</Link>

//       <header style={{ textAlign: "center", marginBottom: "2rem" }}>
//         <h1 style={{ color: "#ff4b4b", fontSize: "2.7rem", fontWeight: 800 }}>{finalRecipe.title}</h1>
//         <p style={{ color: "#555", fontSize: "16px", maxWidth: 850, margin: "12px auto 0", lineHeight: "1.6" }}>{finalRecipe.description}</p>
//       </header>

//       <div style={{ background: "#fff5f5", border: "1px solid #ffd1d1", padding: "20px", borderRadius: 12, margin: "0 auto 2.5rem", maxWidth: 850, boxShadow: "0 6px 15px rgba(0,0,0,0.05)" }}>
//         <h3 style={{ color: "#ff4b4b", fontWeight: 700, marginBottom: 10 }}>Ingredients</h3>
//         <p style={{ color: "#444", fontSize: 15, lineHeight: 1.6 }}>
//           {Array.isArray(finalRecipe.ingredients) ? finalRecipe.ingredients.join(", ") : finalRecipe.ingredients}
//         </p>
//       </div>

//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "2rem", alignItems: "start" }}>
//         <div>
//           <img src={finalRecipe.imageUrl || finalRecipe.image} alt={finalRecipe.title} style={{ width: "100%", borderRadius: 14, objectFit: "cover", maxHeight: 520, boxShadow: "0 8px 30px rgba(2,6,23,0.06)" }} />
//         </div>

//         <div>
//           <h2 style={{ fontSize: "1.4rem", marginBottom: "18px", color: "#ff4b4b", fontWeight: 700 }}>Instructions</h2>
//           <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
//             {instructions.map((step, idx) => (
//               <article key={idx} style={{ display: "flex", gap: 14, alignItems: "flex-start", background: "#fff7f7", border: "1px solid #ffdfdf", borderRadius: 12, padding: "12px 14px" }}>
//                 <div aria-hidden style={{ minWidth: 44, minHeight: 44, borderRadius: "50%", background: "#fff1f0", color: "#ff4b4b", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.95rem", boxShadow: "0 6px 12px rgba(255,75,75,0.06)" }}>{idx + 1}</div>
//                 <p style={{ margin: 0, color: "#444", lineHeight: 1.8, fontSize: 15 }}>{step}</p>
//               </article>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Comments Section */}
//       <div style={{ maxWidth: 850, margin: "3rem auto" }}>
//         <h3 style={{ color: "#ff4b4b", fontWeight: 700, marginBottom: "1rem" }}>Comments</h3>

//         {user ? (
//           <form onSubmit={handleCommentSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.8rem", marginBottom: "1.5rem" }}>
//             <textarea placeholder="Write a comment..." value={commentInput} onChange={(e) => setCommentInput(e.target.value)} style={{ width: "100%", minHeight: "70px", padding: "0.75rem", borderRadius: 10, border: "1px solid #ddd", fontSize: 14, resize: "vertical", boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }} required />
//             <button type="submit" style={{ alignSelf: "flex-end", padding: "0.5rem 1.2rem", backgroundColor: "#ff4b4b", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>
//               {editingCommentId ? "Update" : "Post"}
//             </button>
//           </form>
//         ) : (
//           <p style={{ color: "#666" }}>You must <Link to="/login" style={{ color: "#ff4b4b" }}>login</Link> to comment.</p>
//         )}

//         {comments.length === 0 ? (
//           <p style={{ color: "#666", fontStyle: "italic" }}>No comments yet. Be the first to comment!</p>
//         ) : (
//           <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.8rem" }}>
//             {comments.map((c) => (
//               <li key={c.id} style={{ background: "#fff8f8", borderRadius: 10, padding: "10px 14px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                 <span><strong style={{ color: "#ff4b4b" }}>{c.username}:</strong> {c.text}</span>
//                 {user && user.name === c.username && (
//                   <div style={{ display: "flex", gap: "0.5rem" }}>
//                     <button onClick={() => handleEdit(c)} style={{ background: "none", border: "none", color: "#ff6b6b", cursor: "pointer" }}>Edit</button>
//                     <button onClick={() => handleDelete(c)} style={{ background: "none", border: "none", color: "#ff4b4b", cursor: "pointer" }}>Delete</button>
//                   </div>
//                 )}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </main>
//   );
// };

// export default RecipeDetails;



// src/pages/RecipeDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import recipes from "../data/recipes";
import { getAllRecipes } from "../services/api";
import { useAuth } from "../context/AuthContext";

const RecipeDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [backendRecipe, setBackendRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);

  let recipe = recipes.find((r) => r.id === Number(id));
  if (!recipe) {
    const stored = JSON.parse(localStorage.getItem("userRecipes") || "[]");
    recipe = stored.find((r) => String(r.id) === id);
  }

  useEffect(() => {
    const fetchBackendRecipe = async () => {
      if (recipe) {
        setLoading(false);
        return;
      }
      try {
        const data = await getAllRecipes();
        const found = data.recipes.find((r) => r._id === id);
        if (found) setBackendRecipe(found);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchBackendRecipe();
  }, [id]);

  // Load comments
  useEffect(() => {
    const storedComments = JSON.parse(
      localStorage.getItem(`comments-${id}`) || "[]"
    );
    setComments(storedComments);
  }, [id]);

  // Save comments
  const saveComments = (newComments) => {
    setComments(newComments);
    localStorage.setItem(`comments-${id}`, JSON.stringify(newComments));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    if (!commentInput.trim()) return;

    if (editingCommentId) {
      const updated = comments.map((c) =>
        c.id === editingCommentId ? { ...c, text: commentInput } : c
      );
      saveComments(updated);
      setEditingCommentId(null);
    } else {
      const newComment = {
        id: Date.now(),
        username: user.name,
        text: commentInput.trim(),
      };
      saveComments([newComment, ...comments]);
    }

    setCommentInput("");
  };

  const handleEdit = (comment) => {
    if (!user || user.name !== comment.username) return;
    setCommentInput(comment.text);
    setEditingCommentId(comment.id);
  };

  const handleDelete = (comment) => {
    if (!user || user.name !== comment.username) return;
    const updated = comments.filter((c) => c.id !== comment.id);
    saveComments(updated);
  };

  const finalRecipe = recipe || backendRecipe;

  if (loading)
    return (
      <p style={{ padding: 40, textAlign: "center" }}>Loading...</p>
    );

  if (!finalRecipe)
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2>Recipe not found</h2>
        <Link to="/recipes" style={{ color: "#ff4b4b" }}>
          Back to recipes
        </Link>
      </div>
    );

  const rawSteps = finalRecipe.instructions || finalRecipe.steps || [];
  const instructions =
    typeof rawSteps === "string"
      ? rawSteps
        .split(/[\r\n]+|\.\s+/)
        .map((s) => s.trim())
        .filter(Boolean)
      : rawSteps;

  return (
    <main
      style={{
        padding: "3rem 1rem",
        maxWidth: "1200px",
        margin: "auto",
        fontFamily: "'Poppins', sans-serif",
        color: "#222",
      }}
    >
      <Link
        to="/recipes"
        style={{
          display: "inline-block",
          marginBottom: "20px",
          color: "#666",
          textDecoration: "none",
          fontSize: "14px",
        }}
      >
        ← Back to recipes
      </Link>

      <header style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1
          style={{
            color: "#ff4b4b",
            fontSize: "2.7rem",
            fontWeight: 800,
          }}
        >
          {finalRecipe.title}
        </h1>
        <p
          style={{
            color: "#555",
            fontSize: "16px",
            maxWidth: 850,
            margin: "12px auto 0",
            lineHeight: "1.6",
          }}
        >
          {finalRecipe.description}
        </p>
      </header>

      <div
        style={{
          background: "#fff5f5",
          border: "1px solid #ffd1d1",
          padding: "20px",
          borderRadius: 12,
          margin: "0 auto 2.5rem",
          maxWidth: 850,
          boxShadow: "0 6px 15px rgba(0,0,0,0.05)",
        }}
      >
        <h3
          style={{
            color: "#ff4b4b",
            fontWeight: 700,
            marginBottom: 10,
          }}
        >
          Ingredients
        </h3>
        <p
          style={{
            color: "#444",
            fontSize: 15,
            lineHeight: 1.6,
          }}
        >
          {Array.isArray(finalRecipe.ingredients)
            ? finalRecipe.ingredients.join(", ")
            : finalRecipe.ingredients}
        </p>
      </div>

      {/* ------------- UPDATED RESPONSIVE GRID ------------- */}
      <div
        className="recipe-details-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: "2rem",
          alignItems: "start",
        }}
      >
        {/* IMAGE */}
        <div className="recipe-image">
          <img
            src={finalRecipe.imageUrl || finalRecipe.image}
            alt={finalRecipe.title}
            style={{
              width: "100%",
              borderRadius: 14,
              objectFit: "cover",
              maxHeight: 520,
              boxShadow: "0 8px 30px rgba(2,6,23,0.06)",
            }}
          />
        </div>

        {/* STEPS */}
        <div className="recipe-steps">
          <h2
            style={{
              fontSize: "1.4rem",
              marginBottom: "18px",
              color: "#ff4b4b",
              fontWeight: 700,
            }}
          >
            Instructions
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {instructions.map((step, idx) => (
              <article
                key={idx}
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                  background: "#fff7f7",
                  border: "1px solid #ffdfdf",
                  borderRadius: 12,
                  padding: "12px 14px",
                }}
              >
                <div
                  aria-hidden
                  style={{
                    minWidth: 44,
                    minHeight: 44,
                    borderRadius: "50%",
                    background: "#fff1f0",
                    color: "#ff4b4b",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    boxShadow: "0 6px 12px rgba(255,75,75,0.06)",
                  }}
                >
                  {idx + 1}
                </div>
                <p
                  style={{
                    margin: 0,
                    color: "#444",
                    lineHeight: 1.8,
                    fontSize: 15,
                  }}
                >
                  {step}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* ------------- COMMENTS SECTION ------------- */}
      <div style={{ maxWidth: 850, margin: "3rem auto" }}>
        <h3
          style={{
            color: "#ff4b4b",
            fontWeight: 700,
            marginBottom: "1rem",
          }}
        >
          Comments
        </h3>

        {user ? (
          <form
            onSubmit={handleCommentSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.8rem",
              marginBottom: "1.5rem",
            }}
          >
            <textarea
              placeholder="Write a comment..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              style={{
                width: "100%",
                minHeight: "70px",
                padding: "0.75rem",
                borderRadius: 10,
                border: "1px solid #ddd",
                fontSize: 14,
                resize: "vertical",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              }}
              required
            />
            <button
              type="submit"
              style={{
                alignSelf: "flex-end",
                padding: "0.5rem 1.2rem",
                backgroundColor: "#ff4b4b",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              {editingCommentId ? "Update" : "Post"}
            </button>
          </form>
        ) : (
          <p style={{ color: "#666" }}>
            You must{" "}
            <Link to="/login" style={{ color: "#ff4b4b" }}>
              login
            </Link>{" "}
            to comment.
          </p>
        )}

        {comments.length === 0 ? (
          <p style={{ color: "#666", fontStyle: "italic" }}>
            No comments yet. Be the first to comment!
          </p>
        ) : (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.8rem",
            }}
          >
            {comments.map((c) => (
              <li
                key={c.id}
                style={{
                  background: "#fff8f8",
                  borderRadius: 10,
                  padding: "10px 14px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>
                  <strong style={{ color: "#ff4b4b" }}>{c.username}:</strong>{" "}
                  {c.text}
                </span>
                {user && user.name === c.username && (
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      onClick={() => handleEdit(c)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#ff6b6b",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#ff4b4b",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ----------- RESPONSIVE CSS FIX (VERY IMPORTANT) ----------- */}
      <style>
        {`
          @media (max-width: 768px) {

            .recipe-details-grid {
              display: flex !important;
              flex-direction: column !important;
              gap: 1.5rem !important;
            }

            .recipe-image {
              order: 1;
            }

            .recipe-steps {
              order: 2;
            }
          }
        `}
      </style>
    </main>
  );
};

export default RecipeDetails;
