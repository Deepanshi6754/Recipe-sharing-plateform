
// src/components/HeroSlider.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    title: "Discover Delicious Recipes",
    text: "Cook. Share. Inspire others with your creativity.",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    btnText: "Explore Recipes",
    btnLink: "/recipes",
  },
  {
    title: "Fresh Ideas Everyday",
    text: "Explore trending recipes loved by our community.",
    img: "https://th.bing.com/th/id/OIP.kwxaz9cAHl_e7DpKnqr_AQHaEO?pid=ImgDet&w=800&h=500&rs=1",
    btnText: "View Trending",
    btnLink: "/recipes",
  },
  {
    title: "Cook With Passion",
    text: "Join thousands of foodies sharing recipes worldwide.",
    img: "https://th.bing.com/th/id/OIP.Go89BSnqfJZ8X8ZSVNhlPgAAAA?pid=ImgDet&w=800&h=500&rs=1",
    btnText: "Share Yours",
    btnLink: "/share",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section
      className="hero"
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: "80vh", // ensures slider is visible
      }}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === current ? "active" : ""}`}
          style={{
            backgroundImage: `url(${slide.img})`,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: index === current ? 1 : 0,
            transition: "opacity 1s ease-in-out",
            zIndex: index === current ? 2 : 1,
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.85)",
              padding: "2rem 3rem",
              borderRadius: "12px",
              textAlign: "center",
              maxWidth: "90%",
              animation: "fadeIn 1.2s ease-in-out",
            }}
          >
            <h1
              style={{
                fontSize: "2.5rem",
                marginBottom: "1rem",
                color: "#ff6b6b",
              }}
            >
              {slide.title}
            </h1>
            <p
              style={{
                fontSize: "1.15rem",
                marginBottom: "1.5rem",
                lineHeight: "1.4",
                color: "#333",
              }}
            >
              {slide.text}
            </p>
            <Link to={slide.btnLink}>
              <button
                style={{
                  padding: "0.6rem 1.4rem",
                  border: "2px solid #ff6b6b",
                  background: "#fff",
                  color: "#ff6b6b",
                  borderRadius: "8px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
                onMouseOver={(e) => {
                  e.target.style.background = "#ff6b6b";
                  e.target.style.color = "#fff";
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "#fff";
                  e.target.style.color = "#ff6b6b";
                }}
              >
                {slide.btnText}
              </button>
            </Link>
          </div>
        </div>
      ))}

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        style={{
          position: "absolute",
          top: "50%",
          left: "20px",
          transform: "translateY(-50%)",
          fontSize: "2rem",
          background: "rgba(0,0,0,0.35)",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "background 0.3s, transform 0.3s",
          zIndex: 3,
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = "rgba(0,0,0,0.6)";
          e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = "rgba(0,0,0,0.35)";
          e.currentTarget.style.transform = "translateY(-50%)";
        }}
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        style={{
          position: "absolute",
          top: "50%",
          right: "20px",
          transform: "translateY(-50%)",
          fontSize: "2rem",
          background: "rgba(0,0,0,0.35)",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "background 0.3s, transform 0.3s",
          zIndex: 3,
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = "rgba(0,0,0,0.6)";
          e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = "rgba(0,0,0,0.35)";
          e.currentTarget.style.transform = "translateY(-50%)";
        }}
      >
        ❯
      </button>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .hero h1 { font-size: 1.8rem !important; }
          .hero p { font-size: 1rem !important; }
        }
      `}</style>
    </section>
  );
};

export default HeroSlider;
