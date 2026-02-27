// // src/index.js
// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";
// import "./styles/style.css";

// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );



// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";

import "remixicon/fonts/remixicon.css";

import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/style.css";
import { AuthProvider } from "./context/AuthContext";  // IMPORTANT

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>         {/* FIXED */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
