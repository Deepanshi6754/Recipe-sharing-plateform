import React, { useState, useEffect, useCallback } from "react";
import HeroSlider from "../components/HeroSlider";
import FeaturedRecipe from "../components/FeaturedRecipe";
import Categories from "../components/Categories";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import { useToast } from "../context/ToastContext";

const Home = () => {
    const [subscriberCount, setSubscriberCount] = useState(null);
    const [loadingCount, setLoadingCount] = useState(true);
    const [error, setError] = useState(null);
    const { showToast } = useToast();

    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

    // Fetch subscriber count on page load
    const fetchSubscriberCount = useCallback(async () => {
        try {
            const res = await fetch(`${apiUrl}/subscribers/count`);
            if (!res.ok) throw new Error("Failed to fetch count");
            const data = await res.json();
            setSubscriberCount(data.count);
            setError(null);
        } catch (err) {
            console.error("Failed to fetch subscriber count:", err);
            setError("Unable to load subscriber count.");
        } finally {
            setLoadingCount(false);
        }
    }, [apiUrl]); // apiUrl is stable, include it in dependencies

    useEffect(() => {
        fetchSubscriberCount();
    }, [fetchSubscriberCount]); // now safe, no ESLint warning

    const handleSubscribe = async (email) => {
        if (!email) {
            showToast("❌ Please enter your email", "error");
            return;
        }
        try {
            const res = await fetch(`${apiUrl}/subscribers`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to subscribe");
            showToast("✅ Subscribed successfully!", "success");
            fetchSubscriberCount(); // update subscriber count
        } catch (err) {
            showToast(err.message, "error");
        }
    };

    const sectionStyle = { marginBottom: "4rem" };

    return (
        <main style={{ fontFamily: "'Poppins', sans-serif" }}>
            <section style={sectionStyle} aria-label="Hero Section">
                <HeroSlider />
            </section>

            <section style={sectionStyle} aria-label="Featured Recipes">
                <FeaturedRecipe />
            </section>

            <section style={sectionStyle} aria-label="Recipe Categories">
                <Categories />
            </section>

            <section style={sectionStyle} aria-label="Why Choose Us">
                <WhyChooseUs />
            </section>

            <section style={sectionStyle} aria-label="Testimonials">
                <Testimonials />
            </section>

            <section style={sectionStyle} aria-label="Newsletter">
                {loadingCount && (
                    <p style={{ textAlign: "center", fontWeight: "500", marginBottom: "1rem" }}>
                        Loading subscribers...
                    </p>
                )}
                {error && (
                    <p style={{ textAlign: "center", color: "red", marginBottom: "1rem" }}>
                        {error}
                    </p>
                )}
                {subscriberCount !== null && !error && (
                    <p style={{ textAlign: "center", fontWeight: "600", marginBottom: "1rem" }}>
                        🎉 Join {subscriberCount}+ food lovers already subscribed!
                    </p>
                )}
                <Newsletter onSubscribe={handleSubscribe} />
            </section>
        </main>
    );
};

export default Home;
