import React, { useState } from "react";
import axios from "axios";
import { useToast } from "../context/ToastContext";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();

    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            showToast("Please enter your registered email.", "error");
            return;
        }

        if (!validateEmail(email)) {
            showToast("Please enter a valid email address.", "error");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${apiUrl}/auth/forgot-password`, { email });

            showToast(res.data.message || "Reset link sent successfully!", "success");
            setEmail(""); // ✅ Clear input after success
        } catch (err) {
            showToast(
                err.response?.data?.message || "Something went wrong. Please try again.",
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    const pageStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#f9f9f9",
        padding: "1rem",
    };

    const formStyle = {
        backgroundColor: "#fff",
        padding: "3rem 2.5rem",
        borderRadius: "15px",
        boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
        width: "100%",
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "1.2rem",
    };

    const headingStyle = {
        textAlign: "center",
        color: "#ff4b4b",
        fontSize: "1.8rem",
        marginBottom: "1.5rem",
        fontWeight: "700",
    };

    const inputStyle = {
        padding: "0.9rem 1rem",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "1rem",
        outline: "none",
        transition: "border 0.3s, box-shadow 0.3s",
    };

    const buttonStyle = {
        padding: "0.9rem 1.5rem",
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
        <div style={pageStyle}>
            <form style={formStyle} onSubmit={handleSubmit}>
                <h2 style={headingStyle}>Forgot Password</h2>

                <input
                    type="email"
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                    required
                    aria-label="Registered Email"
                    disabled={loading}
                />

                <button
                    type="submit"
                    style={buttonStyle}
                    disabled={loading}
                    aria-label="Send reset link"
                >
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;
