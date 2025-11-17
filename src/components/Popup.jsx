import React from "react";

export default function Popup({ open, type = "info", title, message, okText = "OK", onOk }) {
  if (!open) return null;

  const color = type === "success" ? "#22c55e" : type === "error" ? "#ef4444" : "#0ea5e9";
  const cardRadius = 18;

  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,.35)",
        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1050
      }}
      role="dialog" aria-modal="true"
    >
      <div
        style={{
          width: 360, maxWidth: "90%", background: "#fff",
          borderRadius: cardRadius, padding: 24, textAlign: "center",
          boxShadow: "0 20px 50px rgba(0,0,0,.15)"
        }}
      >
        {/* Icon */}
        <div style={{
          width: 84, height: 84, borderRadius: "50%",
          margin: "4px auto 16px", display: "grid", placeItems: "center",
          border: `3px solid ${color}`, color
        }}>
          {type === "success" ? "✓" : "!"}
        </div>

        {title && <h5 style={{ marginBottom: 8 }}>{title}</h5>}
        {message && <p className="mb-3" style={{ color: "#444" }}>{message}</p>}

        <button
          onClick={onOk}
          className="btn"
          style={{
            background: "#f08b2d", color: "#fff", borderRadius: 10,
            padding: "10px 18px", minWidth: 160
          }}
        >
          {okText}
        </button>
      </div>
    </div>
  );
}
