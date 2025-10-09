import React from "react";

const Toast = ({ kind = "info", message, onRetry, onClose }) => {
  const bg = kind === "error" ? "#ffefef" : kind === "success" ? "#eaffea" : "#eef6ff";
  const color = kind === "error" ? "#8a1f1f" : kind === "success" ? "#1f7a2e" : "#0e5cc1";
  return (
    <div style={{
      position: "fixed",
      right: 16,
      bottom: 16,
      zIndex: 9999,
      background: bg,
      color,
      border: `1px solid ${color}22`,
      borderRadius: 8,
      padding: "12px 16px",
      boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
      maxWidth: 360
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ flex: 1 }}>{message}</div>
        {onRetry ? (
          <button className="btn btn-outline-primary" onClick={onRetry}>Try again</button>
        ) : null}
        {onClose ? (
          <button className="btn" onClick={onClose}>✕</button>
        ) : null}
      </div>
    </div>
  );
};

export default Toast;
