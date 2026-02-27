import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#f7f7f7",
                padding: "20px",
                fontFamily: "'Poppins', sans-serif",
            }}
        >
            <div
                style={{
                    background: "#fff",
                    padding: "40px 30px",
                    borderRadius: "12px",
                    textAlign: "center",
                    maxWidth: "450px",
                    width: "100%",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
            >
                <h1
                    style={{
                        fontSize: "2.2rem",
                        marginBottom: "10px",
                        color: "#ff4b4b",
                        fontWeight: "700",
                    }}
                >
                    403 - Unauthorized
                </h1>

                <p
                    style={{
                        fontSize: "1rem",
                        marginBottom: "20px",
                        color: "#555",
                        lineHeight: "1.6",
                    }}
                >
                    You don't have permission to access this page.
                </p>

                <Link
                    to="/login"
                    style={{
                        display: "inline-block",
                        padding: "10px 20px",
                        background: "#ff4b4b",
                        color: "#fff",
                        textDecoration: "none",
                        borderRadius: "8px",
                        fontWeight: "600",
                        transition: "0.3s",
                    }}
                    onMouseEnter={(e) => (e.target.style.background = "#d63b3b")}
                    onMouseLeave={(e) => (e.target.style.background = "#ff4b4b")}
                >
                    Go to Login
                </Link>
            </div>
        </div>
    );
};

export default Unauthorized;
