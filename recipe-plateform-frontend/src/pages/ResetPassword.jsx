import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const { showToast } = useToast();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // ✅ Only numbers allowed (min 6 digits)
    const validatePassword = (pwd) => {
        const regex = /^[0-9]{6,}$/;
        return regex.test(pwd);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password || !confirmPassword) {
            showToast("Please fill in all fields.", "error");
            return;
        }

        if (!validatePassword(password)) {
            showToast("Password must be at least 6 digits and numeric only.", "error");
            return;
        }

        if (password !== confirmPassword) {
            showToast("Passwords do not match.", "error");
            return;
        }

        try {
            setLoading(true);
            const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
            const res = await axios.post(`${apiUrl}/auth/reset-password/${token}`, {
                password,
            });

            showToast(res.data.message || "Password reset successful!", "success");

            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            showToast(
                err.response?.data?.message || "Invalid or expired reset link.",
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
        backgroundColor: "#f9f9f9",
        padding: "1rem",
        fontFamily: "'Poppins', sans-serif",
    };

    const formStyle = {
        backgroundColor: "#fff",
        padding: "3rem 2.5rem",
        borderRadius: "15px",
        width: "100%",
        maxWidth: "400px",
        boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
    };

    const headingStyle = {
        textAlign: "center",
        marginBottom: "1rem",
        fontSize: "1.8rem",
        color: "#ff4b4b",
        fontWeight: "700",
    };

    const inputStyle = {
        padding: "0.9rem 1rem",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "1rem",
    };

    const buttonStyle = {
        padding: "0.9rem",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#ff4b4b",
        color: "#fff",
        fontSize: "1rem",
        fontWeight: "600",
        cursor: "pointer",
    };

    return (
        <div style={pageStyle}>
            <form style={formStyle} onSubmit={handleSubmit}>
                <h2 style={headingStyle}>Reset Password</h2>

                <input
                    type="password"
                    placeholder="Enter new numeric password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={inputStyle}
                    required
                    disabled={loading}
                />

                <input
                    type="password"
                    placeholder="Confirm numeric password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={inputStyle}
                    required
                    disabled={loading}
                />

                <button style={buttonStyle} disabled={loading}>
                    {loading ? "Resetting..." : "Reset Password"}
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
