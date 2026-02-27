import React, { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();
export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "info", duration) => {
    const id = Date.now();
    const toastDuration = duration || (type === "error" ? 5000 : 3000);

    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, toastDuration);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="toast-container">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast toast-${toast.type}`}
            role="alert"
            aria-live="assertive"
          >
            <span>{toast.message}</span>
            <button onClick={() => removeToast(toast.id)}>×</button>
          </div>
        ))}
      </div>

      <style>{`
        .toast-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          z-index: 2000;
        }
        .toast {
          padding: 1rem 1.5rem;
          border-radius: 8px;
          color: #fff;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          animation: slideIn 0.4s ease;
          max-width: 300px;
          word-break: break-word;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .toast-info { background-color: #3498db; }
        .toast-success { background-color: #2ecc71; }
        .toast-error { background-color: #e74c3c; }
        .toast button {
          background: transparent;
          border: none;
          color: #fff;
          font-size: 1.2rem;
          cursor: pointer;
          margin-left: 1rem;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </ToastContext.Provider>
  );
};
