// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // Validation
    const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    const validatePassword = (val) => /^\d{6,}$/.test(val);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            showToast("❌ Please enter both email and password.", "error");
            return;
        }
        if (!validateEmail(email)) {
            showToast("❌ Please enter a valid email address.", "error");
            return;
        }
        if (!validatePassword(password)) {
            showToast("❌ Password must be numeric and at least 6 digits long.", "error");
            return;
        }

        try {
            setLoading(true);

            // ✅ Pass email & password as a single object
            await login({ email, password });

            showToast("✅ Login successful! Redirecting to Home...", "success");

            navigate("/", { replace: true });
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                err?.message ||
                "❌ Server error. Please try again later.";
            showToast(message, "error");
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
                <h2 style={styles.heading}>Login to RecipeHub</h2>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                    required
                    aria-label="Email address"
                    autoComplete="email"
                    disabled={loading}
                />

                <input
                    type="password"
                    placeholder="Enter numeric password (min 6 digits)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    required
                    aria-label="Password"
                    autoComplete="current-password"
                    inputMode="numeric"
                    pattern="\d{6,}"
                    disabled={loading}
                />
                <small style={{ color: "#666", fontSize: "0.9rem" }}>
                    Password must be numeric and at least 6 digits long.
                </small>

                <button
                    type="submit"
                    style={styles.button}
                    disabled={loading}
                    aria-label="Login button"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p style={{ textAlign: "center", marginTop: "1rem" }}>
                    Don’t have an account?{" "}
                    <Link to="/signup" style={styles.link}>
                        Signup
                    </Link>
                </p>
                <p style={{ textAlign: "center", marginTop: "0.5rem" }}>
                    <Link to="/forgot-password" style={styles.link}>
                        Forgot password?
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
