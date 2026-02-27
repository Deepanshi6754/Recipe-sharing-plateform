import React from "react";
import { Link } from "react-router-dom";



const categories = [
  { name: "Breakfast", img: "https://th.bing.com/th/id/R.0f50b24e1f1e33e6317b24fbe14d73b4?rik=S2r6PcoyeSQc0w&riu=http%3a%2f%2fstatic.independent.co.uk%2fs3fs-public%2fthumbnails%2fimage%2f2016%2f03%2f21%2f13%2fbreakfast-istock.jpg&ehk=RpiJ5JvN73nSUSUUCGXrOCUuMowouVQd5bDa2dSHnpY%3d&risl=&pid=ImgRaw&r=0" },
  { name: "Lunch",     img: "https://tse3.mm.bing.net/th/id/OIP.1cLOjOLzP2i6FvB_0nbhzwHaEK?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3" },
  { name: "Dinner",    img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?crop=entropy&cs=tinysrgb&fit=max&w=400&h=200" },
  { name: "Desserts",  img: "https://tse1.mm.bing.net/th/id/OIP.NuWZuBi8BzHYzSoGh5hbPAHaE8?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3" },
  { name: "Snacks",    img: "https://tse1.mm.bing.net/th/id/OIP.sCkUkVKzk-1Rdu4gzFVSHAHaEK?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3" },
  { name: "Breakfast", img: "https://th.bing.com/th/id/R.0f50b24e1f1e33e6317b24fbe14d73b4?rik=S2r6PcoyeSQc0w&riu=http%3a%2f%2fstatic.independent.co.uk%2fs3fs-public%2fthumbnails%2fimage%2f2016%2f03%2f21%2f13%2fbreakfast-istock.jpg&ehk=RpiJ5JvN73nSUSUUCGXrOCUuMowouVQd5bDa2dSHnpY%3d&risl=&pid=ImgRaw&r=0" },
];

const Categories = () => (
  <section className="categories" style={{ padding: "3.5rem 1.25rem", textAlign: "center", background: "#fff" }}>
    <h2 style={{ marginBottom: "1.5rem", fontSize: "2.2rem", fontWeight: 700, color: "#ff6b6b" }}>Recipe Categories</h2>

    <div className="categories-grid">
      {categories.map((cat, index) => (
        <Link
          to={`/recipes?category=${cat.name.toLowerCase()}`}
          key={index}
          className="cat-card"
          aria-label={`View ${cat.name} recipes`}
        >
          <div className="img-wrap">
            <img src={cat.img} alt={cat.name} loading="lazy" />
          </div>

          <div className="card-text">
            <h3>{cat.name}</h3>
          </div>
        </Link>
      ))}
    </div>

    <style>{`
      /* GRID: 3 / 2 / 1 */
      .categories-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr); /* desktop */
        gap: 1.25rem;                          /* uniform gap */
        justify-items: center;
        align-items: start;
        max-width: 1100px;
        margin: 0 auto;
      }

      /* CARD */
      .cat-card {
        width: 100%;
        max-width: 340px;
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

      .cat-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 26px 50px rgba(2, 8, 23, 0.10);
      }

      /* IMAGE WRAPPER for consistent crop */
      .img-wrap {
        width: 100%;
        height: 0;
        padding-bottom: 56.25%; /* 16:9 */
        position: relative;
        overflow: hidden;
        background: #f6f6f6;
      }

      .img-wrap img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        transition: transform 0.35s ease;
        display: block;
      }

      .cat-card:hover .img-wrap img {
        transform: scale(1.05);
      }

      /* TEXT */
      .card-text {
        padding: 0.9rem 1.15rem 1.1rem;
        text-align: center;
      }

      .card-text h3 {
        margin: 0;
        font-size: 1.18rem;
        font-weight: 700;
        color: #222;
      }

      /* Reduce vertical gaps between cards visually */
      .cat-card .img-wrap {
        margin-top: -8px; /* image appears slightly lifted like featured */
        border-top-left-radius: 14px;
        border-top-right-radius: 14px;
      }

      /* RESPONSIVE */
      @media (max-width: 992px) {
        .categories-grid {
          grid-template-columns: repeat(2, 1fr); /* tablet: 2 columns */
          gap: 1rem;
        }
        .cat-card { max-width: 420px; }
      }

      @media (max-width: 600px) {
        .categories-grid {
          grid-template-columns: 1fr; /* mobile */
          gap: 0.9rem;
          padding: 0 8px;
        }
        .cat-card { max-width: 640px; }
        .img-wrap { padding-bottom: 62%; } /* slightly taller on mobile */
        .card-text h3 { font-size: 1.05rem; }
      }
    `}</style>
  </section>
);

export default Categories;
