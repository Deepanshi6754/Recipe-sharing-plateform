import React from "react";

const testimonials = [
    { name: "Alice", text: "RecipeHub has transformed my cooking!" },
    { name: "Bob", text: "I love discovering new recipes every day." },
    { name: "Cathy", text: "Sharing recipes is so easy and fun!" },
    { name: "David", text: "I found amazing recipes for every occasion!" },
    { name: "Eva", text: "RecipeHub makes cooking fun and effortless." },
];

const Testimonials = () => {
    return (
        <section style={{ padding: "4rem 2rem", textAlign: "center" }}>
            <h2
                style={{
                    marginBottom: "3rem",
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "#ff6b6b",
                }}
            >
                What Our Users Say
            </h2>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "2rem",
                }}
            >
                {testimonials.map((t, index) => {
                    const avatarUrl = `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1
                        }`;
                    return (
                        <div
                            key={index}
                            style={{
                                background: "#fff",
                                padding: "1.8rem",
                                borderRadius: "12px",
                                boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
                                fontStyle: "italic",
                                transition: "transform 0.3s, box-shadow 0.3s",
                            }}
                            aria-label={`Testimonial from ${t.name}`}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = "translateY(-5px)";
                                e.currentTarget.style.boxShadow =
                                    "0 12px 25px rgba(0,0,0,0.12)";
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow =
                                    "0 5px 15px rgba(0,0,0,0.08)";
                            }}
                        >
                            <img
                                src={avatarUrl}
                                alt={t.name || "User avatar"}
                                loading="lazy"
                                style={{
                                    width: "60px",
                                    height: "60px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    marginBottom: "1rem",
                                }}
                            />
                            <p style={{ opacity: 0.9 }}>"{t.text}"</p>
                            <h4 style={{ marginTop: "1rem", fontWeight: 600 }}>- {t.name}</h4>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Testimonials;
