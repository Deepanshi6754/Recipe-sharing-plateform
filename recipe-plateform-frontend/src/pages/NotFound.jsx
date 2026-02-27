import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    const pageStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        fontFamily: "'Poppins', sans-serif",
        textAlign: "center",
        backgroundColor: "#fafafa",
        padding: "2rem",
    };

    const headingStyle = {
        fontSize: "2.5rem",
        fontWeight: "700",
        color: "#ff4b4b",
        marginBottom: "1rem",
    };

    const textStyle = {
        fontSize: "1.1rem",
        color: "#555",
        marginBottom: "2rem",
    };

    const buttonStyle = {
        padding: "0.8rem 1.5rem",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#ff4b4b",
        color: "#fff",
        fontWeight: "600",
        fontSize: "1rem",
        cursor: "pointer",
        transition: "background-color 0.3s, transform 0.2s",
    };

    return (
        <section style={pageStyle} aria-label="Page Not Found">
            <h1 style={headingStyle}>404 | Page Not Found</h1>
            <p style={textStyle}>
                Oops! The page you’re looking for doesn’t exist or has been moved.
            </p>
            <Link to="/">
                <button
                    style={buttonStyle}
                    onMouseOver={(e) => {
                        e.target.style.backgroundColor = "#ff6b6b";
                        e.target.style.transform = "scale(1.05)";
                    }}
                    onMouseOut={(e) => {
                        e.target.style.backgroundColor = "#ff4b4b";
                        e.target.style.transform = "scale(1)";
                    }}
                >
                    Go Back Home
                </button>
            </Link>
        </section>
    );
};

export default NotFound;
