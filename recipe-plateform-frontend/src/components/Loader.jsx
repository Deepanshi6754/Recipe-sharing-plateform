import React from "react";

const Loader = () => (
    <div
        style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
            fontSize: "1.2rem",
            color: "#ff6b6b",
            gap: "1rem",
        }}
    >
        {/* Spinner */}
        <div
            style={{
                border: "4px solid #f3f3f3",
                borderTop: "4px solid #ff6b6b",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                animation: "spin 1s linear infinite",
            }}
        ></div>

        {/* Text */}
        <span>Loading...</span>

        {/* Inline CSS for animation */}
        <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
    </div>
);

export default Loader;
