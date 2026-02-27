
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const publicNavItems = [
    { name: "Home", path: "/" },
    { name: "Recipes", path: "/recipes" },
    { name: "Blogs", path: "/blogs" },
  ];

  const protectedNavItems = [
    { name: "Share", path: "/share" },
    { name: "Profile", path: "/profile" },
  ];

  const navItems = token ? [...publicNavItems, ...protectedNavItems] : publicNavItems;

  return (
    <>
      <style>
        {`
          .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 2rem;
            background: #fff;
            box-shadow: 0 2px 12px rgba(0,0,0,0.08);
            position: sticky;
            top: 0;
            z-index: 1000;
          }

          .logo {
            font-size: 1.6rem;
            font-weight: 700;
            color: #ff6b6b;
            text-decoration: none;
          }

          /* Desktop nav */
          .nav-links {
            display: flex;
            align-items: center;
            gap: 2rem;
            transition: all 0.3s ease;
          }

          .nav-link {
            font-size: 1rem;
            text-decoration: none;
            color: #333;
            font-weight: 500;
            transition: color 0.3s ease;
          }

          .nav-link:hover {
            color: #ff6b6b;
          }

          .active-link {
            color: #ff6b6b;
            font-weight: 600;
          }

          .nav-btn {
            padding: 0.55rem 1.3rem;
            background: #ff6b6b;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: background 0.3s;
          }

          .nav-btn:hover {
            background: #ff4b4b;
          }

          /* Hamburger */
          .hamburger {
            display: none;
            flex-direction: column;
            cursor: pointer;
            gap: 5px;
            z-index: 2000;
          }

          .bar {
            width: 28px;
            height: 3px;
            background-color: #333;
            transition: 0.3s;
          }

          /* Mobile styles */
          @media (max-width: 768px) {
            .hamburger {
              display: flex;
            }

            .nav-links {
              position: fixed;
              top: 0;
              right: 0;
              height: 100vh;
              width: 70%;
              max-width: 300px;
              background: #ffffff;
              flex-direction: column;
              padding: 5rem 2rem;
              box-shadow: -3px 0 20px rgba(0,0,0,0.15);
              transform: translateX(100%);
              opacity: 0;
              pointer-events: none;
            }

            .nav-links.open {
              transform: translateX(0);
              opacity: 1;
              pointer-events: auto;
            }

            .nav-link {
              font-size: 1.1rem;
            }
          }
        `}
      </style>

      <header className="navbar">
        <NavLink to="/" className="logo">
          🍴 RecipeHub
        </NavLink>

        {/* Hamburger icon */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* Nav Links */}
        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active-link" : ""}`
              }
            >
              {item.name}
            </NavLink>
          ))}

          <button
            className="nav-btn"
            onClick={() => {
              setMenuOpen(false);
              token ? handleLogout() : navigate("/login");
            }}
          >
            {token ? "Logout" : "Login"}
          </button>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
