import React, { useEffect } from "react";

export default function ToastBanner({ open, message, onClose }) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => onClose?.(), 3000);
    return () => clearTimeout(t);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed", top: 12, left: "50%", transform: "translateX(-50%)",
        background: "#e7f7e9", color: "#256b36",
        border: "1px solid #bfe8c6", borderRadius: 8,
        padding: "10px 16px", zIndex: 1050, minWidth: 320
      }}
      role="status"
    >
      <span style={{ marginRight: 8 }}>✅</span>
      {message}
    </div>
  );
}
