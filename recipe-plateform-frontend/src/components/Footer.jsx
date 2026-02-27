// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   FaInstagram,
//   FaYoutube,
//   FaWhatsapp,
//   FaLinkedin,
//   FaMapMarkerAlt,
//   FaPhone,
//   FaEnvelope,
//   FaRegClock
// } from "react-icons/fa";

// const Footer = () => {
//   // accordion states for mobile (Quick Links, Categories)
//   const [openLinks, setOpenLinks] = useState(false);
//   const [openCats, setOpenCats] = useState(false);

//   return (
//     <footer
//       style={{
//         background: "#ffffff",
//         padding: "60px 7%",
//         fontFamily: "Poppins, sans-serif",
//         color: "#444",
//         borderTop: "1px solid #eee",
//         boxShadow: "0 -3px 12px rgba(0,0,0,0.05)",
//       }}
//     >
//       {/* GRID */}
//       <div className="rh-footer-grid">
//         {/* 1st Column (brand) */}
//         <div className="brand-col">
//           <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//             <span style={{ fontSize: "30px" }}>🍽️</span>
//             <h2
//               style={{
//                 fontSize: "24px",
//                 margin: 0,
//                 color: "#ff6b6b",
//                 fontWeight: 700,
//               }}
//             >
//               RecipeHub
//             </h2>
//           </div>

//           <p
//             style={{
//               marginTop: "15px",
//               lineHeight: "1.7",
//               color: "#666",
//               fontSize: "14px",
//               maxWidth: "300px",
//             }}
//           >
//             Discover thousands of curated recipes, tips, and delicious ideas.
//             Simple, tasty, and made for food lovers worldwide.
//           </p>

//           {/* Social Icons */}
//           <div style={{ display: "flex", gap: "12px", marginTop: "18px" }}>
//             <a href="#" className="rh-social" aria-label="Instagram"><FaInstagram /></a>
//             <a href="#" className="rh-social" aria-label="YouTube"><FaYoutube /></a>
//             <a href="#" className="rh-social" aria-label="WhatsApp"><FaWhatsapp /></a>
//             <a href="#" className="rh-social" aria-label="LinkedIn"><FaLinkedin /></a>
//           </div>
//         </div>

//         {/* 2nd Column - Quick Links (center-left) */}
//         <div className="footer-section center-col">
//           <div
//             className="footer-title clickable"
//             onClick={() => setOpenLinks((s) => !s)}
//             role="button"
//             tabIndex={0}
//             onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setOpenLinks((s) => !s); }}
//             aria-expanded={openLinks}
//           >
//             Quick Links
//           </div>

//           <div className={`footer-content ${openLinks ? "show" : ""}`}>
//             <FooterLink to="/">Home</FooterLink>
//             <FooterLink to="/recipes">Recipes</FooterLink>
//             <FooterLink to="/profile">Profile</FooterLink>
//             <FooterLink to="/contact">Contact</FooterLink>
//           </div>
//         </div>

//         {/* 3rd Column - Categories (center-right) */}
//         <div className="footer-section center-col">
//           <div
//             className="footer-title clickable"
//             onClick={() => setOpenCats((s) => !s)}
//             role="button"
//             tabIndex={0}
//             onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setOpenCats((s) => !s); }}
//             aria-expanded={openCats}
//           >
//             Categories
//           </div>

//           <div className={`footer-content ${openCats ? "show" : ""}`}>
//             {["Breakfast", "Lunch", "Snacks", "Desserts", "Drinks"].map((cat) => (
//               <FooterLink key={cat} to="/recipes">{cat}</FooterLink>
//             ))}
//           </div>
//         </div>

//         {/* 4th Column - Contact Info (hidden on mobile) */}
//         <div className="contact-col">
//           <h3
//             style={{
//               color: "#ff6b6b",
//               fontWeight: "600",
//               marginBottom: "20px",
//               fontSize: "18px",
//             }}
//           >
//             Contact Info
//           </h3>

//           <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
//             <p style={infoStyle}>
//               <span style={iconBox}><FaMapMarkerAlt /></span>
//               RecipeHub, India
//             </p>

//             <p style={infoStyle}>
//               <span style={iconBox}><FaPhone /></span>
//               +91 98765 43210
//             </p>

//             <p style={infoStyle}>
//               <span style={iconBox}><FaEnvelope /></span>
//               support@recipehub.com
//             </p>

//             <p style={infoStyle}>
//               <span style={iconBox}><FaRegClock /></span>
//               Mon - Sat: 9 AM - 7 PM
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* BOTTOM BAR */}
//       <div
//         style={{
//           textAlign: "center",
//           marginTop: "50px",
//           paddingTop: "25px",
//           borderTop: "1px solid #eee",
//           color: "#666",
//           fontSize: "14px",
//         }}
//       >
//         © 2025 RecipeHub — All rights reserved.
//       </div>

//       {/* Styles */}
//       <style>{`
//         .rh-footer-grid {
//           display: grid;
//           grid-template-columns: repeat(4, 1fr);
//           gap: 50px;
//           align-items: flex-start;
//         }

//         .brand-col { /* keep default visible on desktop */ }
//         .contact-col { text-align: left; }

//         .footer-section .footer-title {
//           color: #ff6b6b;
//           font-weight: 600;
//           margin-bottom: 12px;
//           font-size: 18px;
//         }

//         /* make title look clickable on mobile */
//         .footer-title.clickable { cursor: pointer; }

//         .footer-content { display: block; }

//         /* Links: one per row, full width */
//         .footer-link {
//           display: block;
//           width: 100%;
//           box-sizing: border-box;
//           padding: 8px 0;
//           margin: 0;
//           font-size: 15px;
//           color: #444;
//           text-decoration: none;
//         }
//         .footer-link:hover { color: #ff6b6b; }

//         /* Social icons */
//         .rh-social {
//           display: inline-flex;
//           align-items: center;
//           justify-content: center;
//           width: 40px;
//           height: 40px;
//           font-size: 18px;
//           background: #f7f7f7;
//           border-radius: 50%;
//           color: #444;
//           text-decoration: none;
//           transition: transform .18s ease, background .18s ease, color .18s ease;
//         }
//         .rh-social:hover { background: #fff0f0; color: #ff6b6b; }

//         /* MOBILE: only show center two columns, side-by-side; hide brand & contact */
//         @media (max-width: 600px) {
//           .brand-col, .contact-col { display: none; }

//           .rh-footer-grid {
//             grid-template-columns: repeat(2, minmax(0, 1fr));
//             gap: 18px;
//             justify-content: center; /* center the two columns */
//             max-width: 520px;
//             margin: 0 auto;
//           }

//           /* hide content by default and toggle with .show */
//           .footer-content { display: none; }
//           .footer-content.show { display: block; }

//           /* ensure each option is one per row and comfortably spaced */
//           .footer-link { padding: 10px 6px; border-bottom: 1px solid #f0f0f0; }
//         }

//         /* Tablet: show 2 columns (brand, center, contact distribution) */
//         @media (max-width: 992px) {
//           .rh-footer-grid {
//             grid-template-columns: repeat(2, 1fr);
//             gap: 32px;
//           }
//           .contact-col, .brand-col { display: block; }
//         }
//       `}</style>
//     </footer>
//   );
// };

// // Reusable FooterLink (uses class for styling)
// const FooterLink = ({ to, children }) => (
//   <Link to={to} className="footer-link" >
//     {children}
//   </Link>
// );

// const infoStyle = {
//   display: "flex",
//   alignItems: "center",
//   fontSize: "14px",
//   color: "#444",
//   gap: "10px",
// };

// const iconBox = {
//   width: "18px",
//   display: "flex",
//   justifyContent: "center",
//   fontSize: "16px",
// };

// export default Footer;




import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaRegClock
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      {/* MAIN GRID */}
      <div className="footer-grid">

        {/* Brand */}
        <div className="footer-col brand-col">
          <div className="brand-header">
            <span className="brand-icon">🍽️</span>
            <h2 className="brand-title">RecipeHub</h2>
          </div>
          <p className="brand-text">
            Discover thousands of curated recipes, tips, and delicious ideas.
            Simple, tasty, and made for food lovers worldwide.
          </p>

          <div className="social-row">
            <a href="#" className="social-icon"><FaInstagram /></a>
            <a href="#" className="social-icon"><FaYoutube /></a>
            <a href="#" className="social-icon"><FaWhatsapp /></a>
            <a href="#" className="social-icon"><FaLinkedin /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <div className="footer-title">
            Quick Links
          </div>

          <div className="footer-links open">
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/recipes">Recipes</FooterLink>
            <FooterLink to="/profile">Profile</FooterLink>
            <FooterLink to="/contact">Contact</FooterLink>
          </div>
        </div>

        {/* Categories */}
        <div className="footer-col">
          <div className="footer-title">
            Categories
          </div>

          <div className="footer-links open">
            {["Breakfast", "Lunch", "Snacks", "Desserts", "Drinks"].map((c) => (
              <FooterLink key={c} to="/recipes">{c}</FooterLink>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="footer-col contact-col">
          <div className="footer-title">Contact Info</div>

          <div className="contact-list">
            <ContactItem icon={<FaMapMarkerAlt />} text="RecipeHub, India" />
            <ContactItem icon={<FaPhone />} text="+91 98765 43210" />
            <ContactItem icon={<FaEnvelope />} text="support@recipehub.com" />
            <ContactItem icon={<FaRegClock />} text="Mon - Sat: 9 AM - 7 PM" />
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        © 2025 RecipeHub — All rights reserved.
      </div>

      {/* STYLES */}
      <style>{`
        .footer-wrapper {
          background: #fff;
          padding: 60px 7%;
          border-top: 1px solid #eee;
          box-shadow: 0 -3px 12px rgba(0,0,0,0.05);
          font-family: Poppins, sans-serif;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
        }

        .brand-header {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .brand-title {
          color: #ff6b6b;
          margin: 0;
          font-size: 24px;
          font-weight: 700;
        }

        .brand-text { margin-top: 15px; color: #666; line-height: 1.7; }

        .social-row { display: flex; gap: 10px; margin-top: 20px; }
        .social-icon {
          width: 40px;height: 40px;
          display:flex;align-items:center;justify-content:center;
          background:#f7f7f7; border-radius:50%; 
          transition:0.2s;
          color:#555;
        }
        .social-icon:hover { background:#ffe3e3; color:#ff6b6b; }

        .footer-title {
          color:#ff6b6b;
          font-weight:600;
          margin-bottom:12px;
          font-size:18px;
        }

        .footer-links {
          display:block;
        }

        .footer-link {
          display:block;
          padding:6px 0;
          color:#444;
          font-size:15px;
          text-decoration:none;
        }
        .footer-link:hover { color:#ff6b6b; }

        /* Contact */
        .contact-list { display:flex; flex-direction:column; gap:12px; }
        .contact-item { display:flex; align-items:center; gap:10px; font-size:14px; color:#444; }

        /* Mobile - All sections automatically visible */
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 25px;
          }

          .brand-col, .contact-col {
            display: none;
          }

          .footer-links {
            display: block !important;
          }

          .footer-link {
            padding: 10px 0;
            border-bottom: 1px solid #f0f0f0;
          }
        }

        /* Tablets */
        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .brand-col, .contact-col { display: block; }
        }

        .footer-bottom {
          margin-top:40px;
          padding-top:20px;
          border-top:1px solid #eee;
          text-align:center;
          color:#666;
          font-size:14px;
        }
      `}</style>
    </footer>
  );
};

const FooterLink = ({ to, children }) => (
  <Link className="footer-link" to={to}>{children}</Link>
);

const ContactItem = ({ icon, text }) => (
  <div className="contact-item">
    <span>{icon}</span> {text}
  </div>
);

export default Footer;
