
// import React, { useState } from "react";
// import { createRecipe } from "../services/api";
// import { useToast } from "../context/ToastContext";

// const ShareRecipe = () => {
//     const [form, setForm] = useState({
//         title: "",
//         description: "",
//         ingredients: "",
//         steps: "",
//         category: "",
//         cookingTime: "",
//         imageUrl: "",
//     });

//     const [submitting, setSubmitting] = useState(false);
//     const { showToast } = useToast();

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setSubmitting(true);

//         const recipeData = {
//             ...form,
//             ingredients: form.ingredients.split(",").map((i) => i.trim()).filter(Boolean),
//             steps: form.steps.split(".").map((s) => s.trim()).filter(Boolean),
//         };

//         try {
//             await createRecipe(recipeData);
//             showToast("Recipe added successfully!", "success");

//             // Reset form after submit
//             setForm({
//                 title: "",
//                 description: "",
//                 ingredients: "",
//                 steps: "",
//                 category: "",
//                 cookingTime: "",
//                 imageUrl: "",
//             });
//         } catch (err) {
//             console.error("Error creating recipe:", err);
//             showToast("Failed to add recipe", "error");
//         } finally {
//             setSubmitting(false);
//         }
//     };

//     const styles = {
//         page: {
//             maxWidth: "700px",
//             margin: "3rem auto",
//             padding: "2rem",
//             backgroundColor: "#fff",
//             borderRadius: "12px",
//             boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
//             fontFamily: "'Poppins', sans-serif",
//         },
//         heading: {
//             textAlign: "center",
//             marginBottom: "2rem",
//             color: "#ff4b4b",
//             fontSize: "2rem",
//             fontWeight: "700",
//         },
//         form: {
//             display: "flex",
//             flexDirection: "column",
//             gap: "1rem",
//         },
//         input: {
//             padding: "0.8rem",
//             borderRadius: "8px",
//             border: "1px solid #ccc",
//             fontSize: "1rem",
//         },
//         button: {
//             padding: "1rem",
//             backgroundColor: "#ff4b4b",
//             color: "#fff",
//             fontSize: "1.1rem",
//             fontWeight: "600",
//             border: "none",
//             borderRadius: "10px",
//             cursor: "pointer",
//         },
//         error: {
//             color: "red",
//             textAlign: "center",
//         },
//     };

//     return (
//         <div style={styles.page}>
//             <h1 style={styles.heading}>Share Your Recipe</h1>

//             <form style={styles.form} onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     name="title"
//                     placeholder="Title"
//                     value={form.title}
//                     onChange={handleChange}
//                     style={styles.input}
//                     required
//                     disabled={submitting}
//                 />

//                 <textarea
//                     name="description"
//                     placeholder="Short description"
//                     value={form.description}
//                     onChange={handleChange}
//                     style={{ ...styles.input, resize: "vertical", minHeight: "80px" }}
//                     required
//                     disabled={submitting}
//                 />

//                 <textarea
//                     name="ingredients"
//                     placeholder="Ingredients (comma separated)"
//                     value={form.ingredients}
//                     onChange={handleChange}
//                     style={styles.input}
//                     required
//                     disabled={submitting}
//                 />

//                 <textarea
//                     name="steps"
//                     placeholder="Steps (separate each step with a dot.)"
//                     value={form.steps}
//                     onChange={handleChange}
//                     style={styles.input}
//                     required
//                     disabled={submitting}
//                 />

//                 <input
//                     type="text"
//                     name="category"
//                     placeholder="Category"
//                     value={form.category}
//                     onChange={handleChange}
//                     style={styles.input}
//                     disabled={submitting}
//                 />

//                 <input
//                     type="number"
//                     name="cookingTime"
//                     placeholder="Cooking time (minutes)"
//                     value={form.cookingTime}
//                     onChange={handleChange}
//                     style={styles.input}
//                     disabled={submitting}
//                 />

//                 <input
//                     type="text"
//                     name="imageUrl"
//                     placeholder="Image URL"
//                     value={form.imageUrl}
//                     onChange={handleChange}
//                     style={styles.input}
//                     disabled={submitting}
//                 />

//                 <button type="submit" style={styles.button} disabled={submitting}>
//                     {submitting ? "Submitting..." : "Share Recipe"}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default ShareRecipe;


import React, { useState } from "react";
import { createRecipe } from "../services/api";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";

const ShareRecipe = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        ingredients: "",
        steps: "",
        category: "",
        cookingTime: "",
        imageUrl: "",
    });

    const [submitting, setSubmitting] = useState(false);
    const { showToast } = useToast();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const recipeData = {
            id: Date.now().toString(), // unique dynamic ID
            ...form,
            ingredients: form.ingredients.split(",").map((i) => i.trim()),
            steps: form.steps.split(".").map((s) => s.trim()).filter(Boolean),
        };

        try {
            await createRecipe(recipeData);

            // store locally as well for viewing
            const saved = JSON.parse(localStorage.getItem("userRecipes") || "[]");
            saved.push(recipeData);
            localStorage.setItem("userRecipes", JSON.stringify(saved));

            showToast("Recipe added successfully!", "success");

            // redirect to recipe view page
            navigate(`/recipe/${recipeData.id}`);

        } catch (err) {
            console.error("Error creating recipe:", err);
            showToast("Failed to add recipe", "error");
        } finally {
            setSubmitting(false);
        }
    };

    const styles = {
        page: {
            maxWidth: "700px",
            margin: "3rem auto",
            padding: "2rem",
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
            fontFamily: "'Poppins', sans-serif",
        },
        heading: {
            textAlign: "center",
            marginBottom: "2rem",
            color: "#ff4b4b",
            fontSize: "2rem",
            fontWeight: "700",
        },
        form: {
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
        },
        input: {
            padding: "0.8rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "1rem",
        },
        button: {
            padding: "1rem",
            backgroundColor: "#ff4b4b",
            color: "#fff",
            fontSize: "1.1rem",
            fontWeight: "600",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
        },
    };

    return (
        <div style={styles.page}>
            <h1 style={styles.heading}>Share Your Recipe</h1>

            <form style={styles.form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />

                <textarea
                    name="description"
                    placeholder="Short description"
                    value={form.description}
                    onChange={handleChange}
                    style={{ ...styles.input, minHeight: "80px" }}
                    required
                />

                <textarea
                    name="ingredients"
                    placeholder="Ingredients (comma-separated)"
                    value={form.ingredients}
                    onChange={handleChange}
                    style={{ ...styles.input, minHeight: "80px" }}
                    required
                />

                <textarea
                    name="steps"
                    placeholder="Steps (separate each step using a dot.)"
                    value={form.steps}
                    onChange={handleChange}
                    style={{ ...styles.input, minHeight: "80px" }}
                    required
                />

                <input
                    type="text"
                    name="imageUrl"
                    placeholder="Image URL"
                    value={form.imageUrl}
                    onChange={handleChange}
                    style={styles.input}
                />

                <button type="submit" style={styles.button} disabled={submitting}>
                    {submitting ? "Submitting..." : "Share Recipe"}
                </button>
            </form>
        </div>
    );
};

export default ShareRecipe;
