// src/App.js
import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import { ToastProvider } from "./context/ToastContext";
import { AuthProvider } from "./context/AuthContext";
import "./styles/style.css";
import "remixicon/fonts/remixicon.css";


function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <div className="app">
          <Navbar />

          <main className="main-content">
            <AppRoutes />
          </main>

          <Footer />
        </div>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
