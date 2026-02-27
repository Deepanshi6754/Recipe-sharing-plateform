import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchRecipes } from "../services/api";
import RecipeCard from "../components/RecipeCard";
import Loader from "../components/Loader";

const SearchResults = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("q");

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchResults = async () => {
            try {
                setLoading(true);
                const data = await searchRecipes(query);
                setResults(data);
            } catch (err) {
                console.error("Search error:", err);
                setError("Failed to load search results.");
            } finally {
                setLoading(false);
            }
        };

        if (query?.trim()) {
            fetchResults();
        } else {
            setLoading(false);
            setResults([]);
        }
    }, [query]);

    if (loading) return <Loader />;
    if (error)
        return (
            <p style={{ textAlign: "center", color: "red", marginTop: "2rem" }}>
                {error}
            </p>
        );

    return (
        <section
            style={{
                padding: "4rem 2rem",
                maxWidth: "1200px",
                margin: "auto",
                fontFamily: "'Poppins', sans-serif",
            }}
        >
            <h1
                style={{
                    textAlign: "center",
                    marginBottom: "2rem",
                    fontSize: "2.2rem",
                    color: "#ff4b4b",
                }}
            >
                Search Results for "{query}"
            </h1>

            {results.length > 0 ? (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: "2rem",
                    }}
                >
                    {results.map((recipe) => (
                        <RecipeCard key={recipe._id || recipe.id} recipe={recipe} />
                    ))}
                </div>
            ) : (
                <p style={{ textAlign: "center", color: "#555", marginTop: "2rem" }}>
                    No recipes found. Try another search term.
                </p>
            )}
        </section>
    );
};

export default SearchResults;
