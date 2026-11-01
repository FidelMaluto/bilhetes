import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message, type = "success", duration = 3500) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        pointerEvents: "none",
        maxWidth: "92vw",
        width: "380px"
      }}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            style={{
              pointerEvents: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "0.75rem",
              padding: "0.85rem 1rem",
              borderRadius: "12px",
              backgroundColor: "var(--bg-surface)",
              color: "var(--text-primary)",
              border: `1.5px solid ${
                toast.type === "success"
                  ? "var(--confirm-green)"
                  : toast.type === "error"
                  ? "var(--primary-red)"
                  : "var(--accent-gold)"
              }`,
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.25)",
              animation: "fadeIn 0.25s ease-out",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              {toast.type === "success" && (
                <CheckCircle2 size={20} color="var(--confirm-green)" style={{ flexShrink: 0 }} />
              )}
              {toast.type === "error" && (
                <AlertCircle size={20} color="var(--primary-red)" style={{ flexShrink: 0 }} />
              )}
              {toast.type === "info" && (
                <Info size={20} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
              )}
              <span style={{ fontSize: "0.9rem", fontWeight: 500, lineHeight: 1.3 }}>
                {toast.message}
              </span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                color: "var(--text-secondary)",
                padding: "2px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="Fechar"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
