import React, { useState } from "react";
import { useToast } from "../context/ToastContext";

const Newsletter = ({ setSubscriberCount }) => {
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
            showToast("Please enter your email.", "error");
            return;
        }

        if (!validateEmail(email)) {
            showToast("Please enter a valid email address.", "error");
            return;
        }

        try {
            setLoading(true);

            // ✅ Correct endpoint: POST /api/subscribers
            const res = await fetch(`${apiUrl}/subscribers`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                showToast(data.message || "Subscription failed.", "error");
                setLoading(false);
                return;
            }

            // ✅ Try fetching updated subscriber count (protected route)
            try {
                const token = localStorage.getItem("token");
                const countRes = await fetch(`${apiUrl}/subscribers/count`, {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                });
                const countData = await countRes.json();

                if (setSubscriberCount) {
                    setSubscriberCount(countData.count);
                }

                showToast(
                    `🎉 Congratulations! You’re now subscriber #${countData.count}.`,
                    "success"
                );
            } catch {
                showToast("🎉 Subscription successful!", "success");
            }

            setEmail("");
            setLoading(false);
        } catch (err) {
            console.error("Subscription error:", err);
            showToast("Server error. Please try again later.", "error");
            setLoading(false);
        }
    };

    const sectionStyle = {
        padding: "4rem 2rem",
        backgroundColor: "#ff4b4b",
        color: "#fff",
        textAlign: "center",
        borderRadius: "12px",
        maxWidth: "700px",
        margin: "3rem auto",
        boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
        fontFamily: "'Poppins', sans-serif",
        transition: "transform 0.3s",
    };

    const headingStyle = {
        fontSize: "2rem",
        marginBottom: "1.5rem",
        fontWeight: "700",
    };

    const formStyle = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "0.8rem",
    };

    const inputStyle = {
        padding: "0.8rem 1rem",
        borderRadius: "8px",
        border: "none",
        width: "250px",
        maxWidth: "80%",
        fontSize: "1rem",
    };

    const buttonStyle = {
        padding: "0.8rem 1.5rem",
        borderRadius: "8px",
        border: "2px solid #fff",
        backgroundColor: "transparent",
        color: "#fff",
        fontWeight: "600",
        fontSize: "1rem",
        cursor: "pointer",
        transition: "all 0.3s ease",
    };

    return (
        <section
            style={sectionStyle}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
            <h2 style={headingStyle}>Subscribe to Our Newsletter</h2>
            <form style={formStyle} onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    required
                    aria-label="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                    disabled={loading}
                />
                <button
                    type="submit"
                    style={buttonStyle}
                    disabled={loading}
                    aria-label="Subscribe to newsletter"
                    onMouseOver={(e) => {
                        e.target.style.backgroundColor = "#fff";
                        e.target.style.color = "#ff4b4b";
                    }}
                    onMouseOut={(e) => {
                        e.target.style.backgroundColor = "transparent";
                        e.target.style.color = "#fff";
                    }}
                >
                    {loading ? "Subscribing..." : "Subscribe"}
                </button>
            </form>
        </section>
    );
};

export default Newsletter;
