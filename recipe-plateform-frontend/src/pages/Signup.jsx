// src/pages/Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
    const navigate = useNavigate();
    const { signup } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (pwd) => /^\d{6,}$/.test(pwd); // numeric-only, min 6

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!name || !email || !password || !confirmPassword) {
            setError("❌ Please fill in all fields.");
            return;
        }
        if (!validateEmail(email)) {
            setError("❌ Please enter a valid email address.");
            return;
        }
        if (!validatePassword(password)) {
            setError("❌ Password must be numeric and at least 6 digits long.");
            return;
        }
        if (password !== confirmPassword) {
            setError("❌ Passwords do not match.");
            return;
        }

        try {
            setLoading(true);
            const response = await signup({ name, email, password });

            // If backend returns token, user is already logged in
            if (response?.token && response?.user) {
                setSuccess("✅ Signup successful! Redirecting to Home...");
                setTimeout(() => navigate("/", { replace: true }), 1500);
            } else {
                // If no token, ask user to login manually
                setSuccess("✅ Signup successful! Please login to continue.");
                setTimeout(() => navigate("/login", { replace: true }), 1500);
            }
        } catch (err) {
            setError(err.message || "❌ Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const styles = {
        page: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "80vh",
            fontFamily: "'Poppins', sans-serif",
            padding: "2rem",
            backgroundColor: "#fafafa",
        },
        form: {
            backgroundColor: "#fff",
            padding: "3rem 2.5rem",
            borderRadius: "15px",
            boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
            width: "100%",
            maxWidth: "400px",
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
        },
        heading: {
            textAlign: "center",
            color: "#ff4b4b",
            fontSize: "1.8rem",
            marginBottom: "1.5rem",
            fontWeight: "700",
        },
        input: {
            padding: "0.8rem 1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "1rem",
        },
        button: {
            padding: "0.8rem 1.5rem",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#ff4b4b",
            color: "#fff",
            fontWeight: "600",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background-color 0.3s, transform 0.2s",
        },
        link: {
            color: "#ff4b4b",
            textDecoration: "none",
            fontWeight: "500",
        },
    };

    return (
        <div style={styles.page}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <h2 style={styles.heading}>Create Your Account</h2>

                {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
                {success && <p style={{ color: "green", textAlign: "center" }}>{success}</p>}

                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={styles.input}
                    required
                    disabled={loading}
                />

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                    required
                    disabled={loading}
                />

                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    required
                    disabled={loading}
                />
                <small style={{ color: "#666", fontSize: "0.9rem" }}>
                    Password must be numeric and at least 6 digits long.
                </small>

                <input
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={styles.input}
                    required
                    disabled={loading}
                />

                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? "Signing up..." : "Sign Up"}
                </button>

                <p style={{ textAlign: "center", marginTop: "1rem" }}>
                    Already have an account?{" "}
                    <Link to="/login" style={styles.link}>
                        Login here
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;
