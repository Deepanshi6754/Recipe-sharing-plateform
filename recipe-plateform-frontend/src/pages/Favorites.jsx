import React, { useEffect, useState } from "react";
import { getFavorites } from "../services/api";
import RecipeCard from "../components/RecipeCard";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFavorites = async () => {
        try {
            const data = await getFavorites(); // ✅ no userId needed
            setFavorites(data); // ✅ directly set array
            setError(null);
        } catch (err) {
            console.error("Error fetching favorites:", err);
            setError("Failed to load favorites. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    if (loading) return <Loader />;
    if (error)
        return (
            <div style={{ textAlign: "center", padding: "2rem" }}>
                <p style={{ color: "red" }}>{error}</p>
                <button
                    onClick={fetchFavorites}
                    style={{
                        marginTop: "1rem",
                        padding: "0.6rem 1.2rem",
                        backgroundColor: "#ff6b6b",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "600",
                    }}
                >
                    Retry
                </button>
            </div>
        );

    return (
        <div
            className="favorites-page"
            style={{ padding: "2rem", maxWidth: "900px", margin: "auto" }}
        >
            <h1
                style={{ textAlign: "center", color: "#ff6b6b" }}
                aria-label="Your Favorite Recipes"
            >
                Your Favorite Recipes
            </h1>
            <div
                className="recipe-grid"
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "1.5rem",
                    marginTop: "2rem",
                }}
                aria-label="Favorite recipes grid"
            >
                {favorites.length > 0 ? (
                    favorites.map((recipe) => (
                        <RecipeCard key={recipe._id || recipe.id} recipe={recipe} />
                    ))
                ) : (
                    <div style={{ textAlign: "center", color: "#666" }}>
                        <p>You haven't added any favorites yet.</p>
                        <Link to="/recipes">
                            <button
                                style={{
                                    marginTop: "1rem",
                                    padding: "0.6rem 1.2rem",
                                    backgroundColor: "#ff6b6b",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontWeight: "600",
                                }}
                            >
                                Browse Recipes
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorites;
