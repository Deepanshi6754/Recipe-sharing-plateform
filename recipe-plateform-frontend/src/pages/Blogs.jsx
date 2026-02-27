// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useAuth } from "../context/AuthContext";

// // const Blogs = () => {
// //     const { user } = useAuth();
// //     const navigate = useNavigate();
// //     const [blogs, setBlogs] = useState([]);

// //     // Load blogs from localStorage
// //     useEffect(() => {
// //         const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
// //         setBlogs(storedBlogs);
// //     }, []);

// //     const handleDelete = (id) => {
// //         const updated = blogs.filter((b) => b.id !== id);
// //         localStorage.setItem("blogs", JSON.stringify(updated));
// //         setBlogs(updated);
// //     };

// //     const handleEdit = (id) => {
// //         navigate(`/add-blog?id=${id}`);
// //     };

// //     return (
// //         <div style={{ padding: 40, minHeight: "90vh", display: "flex", flexDirection: "column", alignItems: "center", background: "#f9f9f9" }}>
// //             <h1 style={{ textAlign: "center", marginBottom: 30, color: "#ff6b6b", fontSize: 32 }}>🍽️ Recipe Blogs</h1>

// //             <div style={{ display: "grid", gap: 30, width: "100%", maxWidth: 900 }}>
// //                 {blogs.length === 0 && <p style={{ textAlign: "center" }}>No blogs available</p>}

// //                 {blogs.map((blog) => (
// //                     <div key={blog.id} style={{ background: "#fff", padding: 20, borderRadius: 15, boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
// //                         <h2 style={{ color: "#333" }}>{blog.title}</h2>
// //                         {blog.recipeTitle && <p><strong>Recipe:</strong> {blog.recipeTitle}</p>}
// //                         {blog.image && <img src={blog.image} alt="" style={{ width: "100%", borderRadius: 10, maxHeight: 300, objectFit: "cover", marginTop: 10 }} />}
// //                         <div dangerouslySetInnerHTML={{ __html: blog.content }} style={{ marginTop: 15 }} />

// //                         {/* Edit/Delete buttons */}
// //                         <div style={{ marginTop: 15 }}>
// //                             <button
// //                                 onClick={() => handleEdit(blog.id)}
// //                                 style={{
// //                                     marginRight: 10,
// //                                     padding: 8,
// //                                     background: "#4CAF50",
// //                                     color: "#fff",
// //                                     border: "none",
// //                                     borderRadius: 8,
// //                                     cursor: "pointer",
// //                                 }}
// //                             >
// //                                 Edit
// //                             </button>
// //                             <button
// //                                 onClick={() => handleDelete(blog.id)}
// //                                 style={{
// //                                     padding: 8,
// //                                     background: "#ff4d4f",
// //                                     color: "#fff",
// //                                     border: "none",
// //                                     borderRadius: 8,
// //                                     cursor: "pointer",
// //                                 }}
// //                             >
// //                                 Delete
// //                             </button>
// //                         </div>
// //                     </div>
// //                 ))}
// //             </div>

// //             <button
// //                 onClick={() => navigate("/add-blog")}
// //                 style={{
// //                     marginTop: 50,
// //                     padding: "12px 25px",
// //                     fontSize: 18,
// //                     borderRadius: 10,
// //                     border: "none",
// //                     background: "#ff6b6b",
// //                     color: "#fff",
// //                     cursor: "pointer",
// //                 }}
// //             >
// //                 ➕ Add New Blog
// //             </button>
// //         </div>
// //     );
// // };

// // export default Blogs;


// // Blogs.jsx - updated to avoid duplicate image when content already contains the same image src
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const Blogs = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
//     setBlogs(storedBlogs);
//   }, []);

//   const handleDelete = (id) => {
//     const updated = blogs.filter((b) => b.id !== id);
//     localStorage.setItem("blogs", JSON.stringify(updated));
//     setBlogs(updated);
//   };

//   const handleEdit = (id) => {
//     navigate(`/add-blog?id=${id}`);
//   };

//   // helper to test if content already contains the featured image src
//   const contentContainsImage = (content = "", imgSrc = "") => {
//     if (!content || !imgSrc) return false;
//     // small normalization: sometimes dataURL may be large; direct includes works for base64 or absolute URL
//     try {
//       return content.indexOf(imgSrc) !== -1;
//     } catch (err) {
//       return false;
//     }
//   };

//   return (
//     <div
//       style={{ padding: 40, minHeight: "90vh", display: "flex", flexDirection: "column", alignItems: "center", background: "#f9f9f9" }}
//       className="p-10 min-h-screen bg-gray-50"
//     >
//       <h1 style={{ textAlign: "center", marginBottom: 30, color: "#ff6b6b", fontSize: 32 }}>🍽️ Recipe Blogs</h1>

//       {/* CSS for images in cards and content */}
//       <style>{`
//         .blog-card img.featured {
//           width: 100%;
//           max-height: 380px;
//           object-fit: cover;
//           border-radius: 10px;
//           display: block;
//         }
//         .blog-content img {
//           max-width: 100%;
//           height: auto;
//           object-fit: contain;
//           border-radius: 8px;
//           margin: 10px 0;
//         }
//         .blog-content iframe {
//           max-width: 100%;
//         }
//       `}</style>

//       <div style={{ display: "grid", gap: 30, width: "100%", maxWidth: 900 }}>
//         {blogs.length === 0 && <p style={{ textAlign: "center" }}>No blogs available</p>}

//         {blogs.map((blog) => {
//           const content = blog.content || "";
//           const imgSrc = blog.image || "";
//           const showFeatured = imgSrc && !contentContainsImage(content, imgSrc);

//           return (
//             <div key={blog.id} className="blog-card" style={{ background: "#fff", padding: 20, borderRadius: 15, boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
//               <h2 style={{ color: "#333" }}>{blog.title}</h2>
//               {blog.recipeTitle && <p><strong>Recipe:</strong> {blog.recipeTitle}</p>}

//               {/* Only render featured image if it's not already present in content */}
//               {showFeatured && <img src={imgSrc} alt="" className="featured" style={{ width: "100%", borderRadius: 10, maxHeight: 300, objectFit: "cover", marginTop: 10 }} />}

//               {/* Render content; images inside content are responsive via CSS above */}
//               <div className="blog-content" style={{ marginTop: 15 }} dangerouslySetInnerHTML={{ __html: content }} />

//               <div style={{ marginTop: 15 }}>
//                 <button
//                   onClick={() => handleEdit(blog.id)}
//                   style={{
//                     marginRight: 10,
//                     padding: 8,
//                     background: "#4CAF50",
//                     color: "#fff",
//                     border: "none",
//                     borderRadius: 8,
//                     cursor: "pointer",
//                   }}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(blog.id)}
//                   style={{
//                     padding: 8,
//                     background: "#ff4d4f",
//                     color: "#fff",
//                     border: "none",
//                     borderRadius: 8,
//                     cursor: "pointer",
//                   }}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <button
//         onClick={() => navigate("/add-blog")}
//         style={{
//           marginTop: 50,
//           padding: "12px 25px",
//           fontSize: 18,
//           borderRadius: 10,
//           border: "none",
//           background: "#ff6b6b",
//           color: "#fff",
//           cursor: "pointer",
//         }}
//       >
//         ➕ Add New Blog
//       </button>
//     </div>
//   );
// };

// export default Blogs;






















// src/pages/Blogs.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Blogs.jsx — final complete version
 * - Inline styles only
 * - Modal for reading, Delete confirmation modal
 * - Avoids duplicate featured image in modal
 * - Responsive grid (1 or 2 columns)
 */

/* ---------------------- Delete Confirm Modal ---------------------- */
const DeleteConfirmModal = ({ open, onClose, onConfirm }) => {
  if (!open) return null;

  const overlay = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1500,
  };

  const box = {
    background: "#fff",
    width: "100%",
    maxWidth: 380,
    borderRadius: 12,
    padding: "22px 24px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
    textAlign: "center",
  };

  const btnRow = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 20,
  };

  const cancelBtn = {
    flex: 1,
    marginRight: 8,
    background: "#f3f4f6",
    padding: "10px 0",
    borderRadius: 8,
    border: "1px solid #e5e7eb",
    fontWeight: 600,
    cursor: "pointer",
  };

  const deleteBtn = {
    flex: 1,
    marginLeft: 8,
    background: "#dc2626",
    color: "#fff",
    padding: "10px 0",
    borderRadius: 8,
    border: "none",
    fontWeight: 700,
    cursor: "pointer",
  };

  return (
    <div style={overlay}>
      <div style={box}>
        <h3 style={{ fontSize: 18, margin: 0, fontWeight: 700, color: "#dc2626" }}>Delete Blog?</h3>
        <p style={{ marginTop: 10, fontSize: 14, color: "#374151" }}>
          Are you sure you want to delete this blog? This action cannot be undone.
        </p>

        <div style={btnRow}>
          <button style={cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button
            style={deleteBtn}
            onClick={() => {
              onConfirm();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------- Read Modal -------------------------- */
const ReadModal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  const overlay = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1200,
    padding: 20,
  };
  const box = {
    width: "100%",
    maxWidth: 900,
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 20px 40px rgba(2,6,23,0.15)",
    overflow: "auto",
    maxHeight: "92vh",
  };
  const header = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
    borderBottom: "1px solid #f2f2f4",
  };
  const content = { padding: 18, color: "#111827", lineHeight: 1.7 };

  return (
    <div style={overlay} onClick={onClose}>
      <div style={box} onClick={(e) => e.stopPropagation()}>
        <div style={header}>
          <div style={{ fontSize: 17, fontWeight: 800, color: "#dc2626" }}>{title}</div>
          <button
            onClick={onClose}
            style={{ border: "none", background: "transparent", cursor: "pointer", fontSize: 20, color: "#374151" }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div style={content}>{children}</div>
      </div>
    </div>
  );
};

/* ---------------------------- Main Component ---------------------- */
const Blogs = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [viewPost, setViewPost] = useState(null);
  const [columns, setColumns] = useState(2);
  const [hoveredId, setHoveredId] = useState(null);

  // delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("blogs") || "[]");
    stored.sort((a, b) => (b.id || 0) - (a.id || 0));
    setBlogs(stored);
  }, []);

  // responsive columns
  const updateColumns = useCallback(() => {
    setColumns(window.innerWidth < 820 ? 1 : 2);
  }, []);
  useEffect(() => {
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, [updateColumns]);

  // perform confirmed deletion
  const handleConfirmDelete = () => {
    if (deleteId == null) {
      setDeleteModalOpen(false);
      return;
    }
    const updated = blogs.filter((b) => b.id !== deleteId);
    localStorage.setItem("blogs", JSON.stringify(updated));
    setBlogs(updated);
    setDeleteId(null);
    setDeleteModalOpen(false);
    // close modal if the deleted blog was being viewed
    if (viewPost && viewPost.id === deleteId) setViewPost(null);
  };

  const initiateDelete = (id) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  };

  const handleEdit = (id) => {
    navigate(`/add-blog?id=${id}`);
  };

  // Inline style objects (always objects)
  const page = {
    background: "#fbfbfd",
    minHeight: "100vh",
    padding: 28,
    boxSizing: "border-box",
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
  };
  const container = { maxWidth: 1100, margin: "0 auto" };

  const header = { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 };
  const titleBlock = { display: "flex", flexDirection: "column" };
  const title = { fontSize: 28, fontWeight: 900, color: "#dc2626", display: "flex", alignItems: "center", gap: 10 };
  const subtitle = { marginTop: 6, color: "#6b7280", fontSize: 14 };

  const addBtn = {
    background: "linear-gradient(180deg,#ef4444,#dc2626)",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    fontWeight: 800,
    boxShadow: "0 10px 30px rgba(220,38,38,0.18)",
  };

  const grid = { display: "grid", gap: 20, gridTemplateColumns: `repeat(${columns}, 1fr)` };

  const cardBase = {
    background: "#fff",
    borderRadius: 14,
    overflow: "hidden",
    border: "1px solid #f3f4f6",
    boxShadow: "0 12px 30px rgba(3,7,18,0.06)",
    display: "flex",
    flexDirection: "column",
    transition: "transform .18s ease, box-shadow .18s ease",
  };

  const cardHoverStyle = {
    transform: "translateY(-6px)",
    boxShadow: "0 20px 50px rgba(3,7,18,0.09)",
  };

  const imgWrap = { position: "relative", minHeight: 140, overflow: "hidden" };
  const featured = { width: "100%", height: 220, objectFit: "cover", display: "block" };
  const badge = {
    position: "absolute",
    left: 14,
    top: 14,
    background: "rgba(255,255,255,0.95)",
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 13,
    color: "#374151",
    boxShadow: "0 8px 20px rgba(2,6,23,0.05)",
  };

  const body = { padding: 16, display: "flex", flexDirection: "column", gap: 12, minHeight: 160 };
  const h2 = { margin: 0, fontSize: 18, fontWeight: 800, color: "#0f172a" };
  const excerpt = { color: "#475569", fontSize: 14, lineHeight: 1.6, marginTop: 6 };

  const meta = { display: "flex", alignItems: "center", gap: 12, color: "#6b7280", marginTop: 8 };
  const avatar = {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "#fff7ed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#b45309",
    fontWeight: 800,
  };

  const actions = { display: "flex", alignItems: "center", gap: 8, marginTop: "auto" };
  const ghostBtn = {
    background: "transparent",
    color: "#059669",
    padding: "8px 12px",
    borderRadius: 10,
    border: "1px solid #dcfce7",
    cursor: "pointer",
    fontWeight: 700,
  };
  const deleteBtn = {
    background: "transparent",
    color: "#dc2626",
    padding: "8px 12px",
    borderRadius: 10,
    border: "1px solid #fecaca",
    cursor: "pointer",
    fontWeight: 700,
  };
  const readMoreLink = {
    color: "#dc2626",
    textDecoration: "none",
    fontWeight: 800,
    cursor: "pointer",
    background: "transparent",
    border: "none",
  };

  const empty = { textAlign: "center", padding: 40, background: "#fff", borderRadius: 12, boxShadow: "0 8px 30px rgba(3,7,18,0.04)" };

  const makeExcerpt = (html) => {
    const text = (html || "").replace(/<[^>]+>/g, "");
    if (!text) return "...";
    return text.length > 150 ? text.slice(0, 150).trim() + "…" : text;
  };

  // Help: detect if content already contains the featured image src (avoid duplicates in modal)
  const contentContainsImage = (content = "", imgSrc = "") => {
    if (!content || !imgSrc) return false;
    try {
      return content.indexOf(imgSrc) !== -1;
    } catch (err) {
      return false;
    }
  };

  return (
    <div style={page}>
      <div style={container}>
        <div style={header}>
          <div style={titleBlock}>
            <div style={title}>
              <span style={{ fontSize: 22 }}>🍜</span>
              Recipe Blogs
            </div>
            <div style={subtitle}>Share tasty recipes, quick tips and everyday meals.</div>
          </div>

          <div>
            <button onClick={() => navigate("/add-blog")} style={addBtn}>
              ➕ Add New Blog
            </button>
          </div>
        </div>

        <main>
          {blogs.length === 0 ? (
            <div style={empty}>
              <h3 style={{ margin: 0, fontSize: 20, color: "#0f172a" }}>No blogs yet</h3>
              <p style={{ color: "#6b7280", marginTop: 8 }}>Click the "Add New Blog" button to create your first recipe.</p>
            </div>
          ) : (
            <div style={grid}>
              {blogs.map((blog) => {
                const excerptText = makeExcerpt(blog.content);
                const isHovered = hoveredId === blog.id;
                const cardStyle = isHovered ? { ...cardBase, ...cardHoverStyle } : cardBase;

                return (
                  <article
                    key={blog.id}
                    style={cardStyle}
                    onMouseEnter={() => setHoveredId(blog.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div style={imgWrap}>
                      {blog.image ? (
                        <img src={blog.image} alt={blog.title} style={featured} />
                      ) : (
                        <div style={{ height: 220, background: "linear-gradient(90deg,#fff7ed,#fff0f6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <div style={{ fontSize: 40 }}>🍜</div>
                        </div>
                      )}
                      <div style={badge}>{blog.recipeTitle || "Recipe"}</div>
                    </div>

                    <div style={body}>
                      <h2 style={h2}>{blog.title || "Untitled"}</h2>

                      <div style={meta}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={avatar}>{blog.author ? blog.author[0].toUpperCase() : (user?.name ? user.name[0].toUpperCase() : "U")}</div>
                          <div style={{ fontSize: 13 }}>
                            <div style={{ fontWeight: 700, color: "#0f172a" }}>{blog.author || (user?.name || "You")}</div>
                            <div style={{ color: "#9ca3af", fontSize: 12 }}>{blog.createdAt || "Unknown date"}</div>
                          </div>
                        </div>
                      </div>

                      <p style={excerpt}>{excerptText}</p>

                      <div style={actions}>
                        <button style={readMoreLink} onClick={() => setViewPost(blog)}>
                          Read more
                        </button>

                        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                          <button onClick={() => handleEdit(blog.id)} style={ghostBtn}>
                            Edit
                          </button>
                          <button onClick={() => initiateDelete(blog.id)} style={deleteBtn}>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* Read modal (avoid duplicate images) */}
      <ReadModal open={!!viewPost} onClose={() => setViewPost(null)} title={viewPost?.title || ""}>
        {viewPost && (
          <div>
            <style>{`
              .modal-content img { max-width: 100%; height: auto; display: block; margin: 12px 0; border-radius: 8px; }
              .modal-content figure { margin: 0 0 12px 0; }
              .modal-content figcaption { color: #6b7280; font-size: 13px; margin-top: 6px; }
            `}</style>

            {/* only render the featured image on top if the content does not already include it */}
            {!contentContainsImage(viewPost.content, viewPost.image) && viewPost.image && (
              <img src={viewPost.image} alt="" style={{ width: "100%", borderRadius: 12, objectFit: "cover", marginBottom: 12 }} />
            )}

            <div style={{ color: "#6b7280", marginBottom: 12 }}>
              <strong>{viewPost.recipeTitle}</strong> • {viewPost.createdAt}
            </div>

            <div className="modal-content" dangerouslySetInnerHTML={{ __html: viewPost.content }} />
          </div>
        )}
      </ReadModal>

      {/* Delete confirmation modal */}
      <DeleteConfirmModal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onConfirm={handleConfirmDelete} />
    </div>
  );
};

export default Blogs;
