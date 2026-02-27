import React from "react";

const About = () => (
    <section className="about-page">
        <h1>About RecipeHub</h1>
        <p>
            RecipeHub is your go-to platform to discover, share, and enjoy thousands of
            delicious recipes worldwide. Whether you're a beginner or a seasoned chef,
            our community-driven hub makes cooking fun, easy, and inspiring.
        </p>
        <p>
            Our mission is to bring food lovers together — helping you explore new
            cuisines, share your favorite dishes, and connect with people who share
            your passion for cooking.
        </p>

        {/* Inline CSS */}
        <style>{`
      .about-page {
        padding: 4rem 2rem;
        max-width: 800px;
        margin: 0 auto;
        text-align: center;
        font-family: 'Poppins', sans-serif;
        line-height: 1.6;
      }

      .about-page h1 {
        font-size: 2.5rem;
        font-weight: 700;
        color: #ff6b6b;
        margin-bottom: 1.5rem;
      }

      .about-page p {
        font-size: 1.1rem;
        color: #555;
        margin-bottom: 1.2rem;
      }

      @media (max-width: 768px) {
        .about-page h1 {
          font-size: 2rem;
        }
        .about-page p {
          font-size: 1rem;
        }
      }
    `}</style>
    </section>
);

export default About;
