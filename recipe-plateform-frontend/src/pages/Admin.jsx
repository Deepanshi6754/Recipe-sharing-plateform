import React from "react";

const Admin = () => {
    return (
        <section className="admin-page">
            <h1>Admin Dashboard</h1>
            <p>Manage Recipes, Users, Categories, and Featured Recipes here.</p>

            <div className="admin-grid">
                <div className="admin-card">
                    <h2>🍲 Recipes</h2>
                    <p>Create, update, and delete recipes.</p>
                </div>
                <div className="admin-card">
                    <h2>👥 Users</h2>
                    <p>Manage user accounts and permissions.</p>
                </div>
                <div className="admin-card">
                    <h2>📂 Categories</h2>
                    <p>Organize recipes into categories.</p>
                </div>
                <div className="admin-card">
                    <h2>⭐ Featured</h2>
                    <p>Highlight trending or special recipes.</p>
                </div>
            </div>

            {/* Inline CSS */}
            <style>{`
        .admin-page {
          padding: 4rem 2rem;
          font-family: 'Poppins', sans-serif;
          text-align: center;
        }

        .admin-page h1 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #ff6b6b;
          margin-bottom: 1rem;
        }

        .admin-page p {
          font-size: 1.1rem;
          color: #555;
          margin-bottom: 2.5rem;
        }

        .admin-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .admin-card {
          background: #fff;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.08);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .admin-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 25px rgba(0,0,0,0.12);
        }

        .admin-card h2 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: #333;
        }

        .admin-card p {
          font-size: 1rem;
          color: #666;
        }
      `}</style>
        </section>
    );
};

export default Admin;
