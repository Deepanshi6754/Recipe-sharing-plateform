

import React from "react";
import { Link } from "react-router-dom";

const recipes = [
  {
    title: "Chocolate Cake",
    img: "https://tse3.mm.bing.net/th/id/OIP.1L8gCwTABU3YDcOx_aIy8gHaLH?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    title: "Pasta Carbonara",
    img: "https://tse1.mm.bing.net/th/id/OIP.dchqjONJhrMllqIkMeIZbwHaLH?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    title: "Avocado Salad",
    img: "https://www.isabeleats.com/wp-content/uploads/2018/06/avocado-salad-small-2.jpg",
  },
];

const FeaturedRecipe = () => (
  <section className="featured">
    <h2>Featured Recipes</h2>

    <div className="featured-content">
      {recipes.map((recipe, index) => (
        <Link
          to={`/recipe/${index + 1}`}
          key={index}
          className="card"
          aria-label={`View details for ${recipe.title}`}
        >
          <div className="img-wrap">
            <img src={recipe.img} alt={recipe.title} loading="lazy" />
          </div>

          <div className="text">
            <h3>{recipe.title}</h3>
          </div>
        </Link>
      ))}
    </div>

    <style>{`
      .featured {
        padding: 3.5rem 1.25rem;
        background-color: #fff;
        text-align: center;
      }

      .featured h2 {
        margin-bottom: 2rem;
        font-size: 2.2rem;
        font-weight: 700;
        color: #ff6b6b;
      }

      /* GRID layout: 3 columns desktop, 2 tablet, 1 mobile */
      .featured-content {
        display: grid;
        grid-template-columns: repeat(3, 1fr); /* desktop: 3 columns */
        gap: 1.5rem;                          /* uniform gap */
        justify-items: center;
        align-items: start;
        max-width: 1100px;
        margin: 0 auto;
      }

      /* CARD */
      .featured-content .card {
        width: 100%;
        max-width: 360px;
        background: #fff;
        border-radius: 14px;
        overflow: hidden;
        text-decoration: none;
        box-shadow: 0 10px 30px rgba(2, 8, 23, 0.06);
        transition: transform 0.32s ease, box-shadow 0.32s ease;
        display: flex;
        flex-direction: column;
        align-items: stretch;
      }

      .featured-content .card:hover {
        transform: translateY(-8px);
        box-shadow: 0 26px 50px rgba(2, 8, 23, 0.10);
      }

      /* IMAGE WRAPPER for consistent crop & aspect ratio */
      .featured-content .img-wrap {
        width: 100%;
        height: 0;
        padding-bottom: 56.25%; /* 16:9 aspect ratio */
        position: relative;
        overflow: hidden;
        background: #f6f6f6;
      }

      .featured-content .img-wrap img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        transition: transform 0.35s ease;
        display: block;
      }

      .featured-content .card:hover .img-wrap img {
        transform: scale(1.05);
      }

      /* TEXT */
      .featured-content .text {
        padding: 1rem 1.15rem 1.1rem;
        text-align: center;
      }

      .featured-content .text h3 {
        margin: 0;
        font-size: 1.15rem;
        font-weight: 700;
        color: #222;
      }

      /* RESPONSIVE: tablet */
      @media (max-width: 992px) {
        .featured-content {
          grid-template-columns: repeat(2, 1fr); /* tablet: 2 columns */
          gap: 1rem;
        }

        .featured h2 {
          font-size: 2rem;
        }

        .featured-content .card {
          max-width: 420px;
        }
      }

      /* RESPONSIVE: mobile */
      @media (max-width: 600px) {
        .featured-content {
          grid-template-columns: 1fr; /* mobile: 1 column */
          gap: 0.9rem;
          padding: 0 8px;
        }

        .featured h2 {
          font-size: 1.6rem;
        }

        .featured-content .card {
          max-width: 640px;
        }

        .featured-content .img-wrap {
          padding-bottom: 62%; /* slightly taller on small screens */
        }

        .featured-content .text h3 {
          font-size: 1.05rem;
        }
      }
    `}</style>
  </section>
);

export default FeaturedRecipe;

