import React from "react";

const WhyChooseUs = () => {
    const sectionStyle = {
        padding: "4rem 2rem",
        backgroundColor: "#fff5f5",
        textAlign: "center",
        fontFamily: "'Poppins', sans-serif",
    };

    const headingStyle = {
        marginBottom: "3rem",
        fontSize: "2rem",
        fontWeight: 700,
        color: "#ff6b6b",
    };

    const gridStyle = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "2rem",
    };

    const cardStyle = {
        background: "#fff",
        padding: "2rem 1.5rem",
        borderRadius: "12px",
        width: "260px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
        transition: "transform 0.3s, box-shadow 0.3s",
        cursor: "default",
    };

    const cardHover = (e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.12)";
    };

    const cardOut = (e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.08)";
    };

    const features = [
        {
            title: "Easy to Use",
            desc: "Share and discover recipes effortlessly.",
            icon: "⚡",
        },
        {
            title: "Community Driven",
            desc: "Connect with food lovers around the world.",
            icon: "🌍",
        },
        {
            title: "Variety of Recipes",
            desc: "Find recipes for every meal and occasion.",
            icon: "🍲",
        },
    ];

    return (
        <section style={sectionStyle}>
            <h2 style={headingStyle}>Why Choose RecipeHub?</h2>
            <div style={gridStyle}>
                {features.map((item, index) => (
                    <div
                        key={index}
                        style={cardStyle}
                        onMouseOver={cardHover}
                        onMouseOut={cardOut}
                        aria-label={item.title}
                    >
                        <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>
                            {item.icon}
                        </div>
                        <h3 style={{ fontWeight: 600, marginBottom: "0.8rem" }}>
                            {item.title}
                        </h3>
                        <p style={{ color: "#555", fontSize: "0.95rem" }}>{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhyChooseUs;
