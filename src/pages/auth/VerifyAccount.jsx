import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function OtpInput({ length = 6, onComplete }) {
  const inputs = Array.from({ length });
  const refs = useRef([]);

  const handleChange = (e, idx) => {
    const v = e.target.value.replace(/\D/g, "").slice(0, 1);
    e.target.value = v;
    if (v && idx < length - 1) refs.current[idx + 1]?.focus();
    const code = refs.current.map(r => r?.value || "").join("");
    if (code.length === length) onComplete?.(code);
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !e.currentTarget.value && idx > 0) {
      refs.current[idx - 1]?.focus();
    }
  };

  return (
    <div className="d-flex justify-content-center gap-2 my-3">
      {inputs.map((_, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          className="form-control text-center"
          style={{ width: 44, height: 44, borderRadius: 10 }}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          inputMode="numeric"
          maxLength={1}
        />
      ))}
    </div>
  );
}

export default function VerifyAccount() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email;

  const RESEND_SECONDS = 45;
  const STORAGE_KEY = "otpDeadline";

  const [deadline, setDeadline] = useState(null);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    // Ambil deadline dari localStorage atau buat baru
    const stored = localStorage.getItem(STORAGE_KEY);
    let d = stored ? new Date(stored) : null;
    if (!d || isNaN(d.getTime()) || d.getTime() <= Date.now()) {
      d = new Date(Date.now() + RESEND_SECONDS * 1000);
      localStorage.setItem(STORAGE_KEY, d.toISOString());
    }
    setDeadline(d);
  }, []);

  useEffect(() => {
    if (!deadline) return;

    const tick = () => {
      const diff = Math.max(0, Math.floor((deadline.getTime() - Date.now()) / 1000));
      setCountdown(diff);
    };

    tick(); // set awal
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [deadline]);

  const onVerify = (code) => {
    navigate("/auth/set-password", { state: { email, code } });
  };

  const handleResend = () => {
    // TODO: panggil API kirim ulang OTP
    const newDeadline = new Date(Date.now() + RESEND_SECONDS * 1000);
    localStorage.setItem(STORAGE_KEY, newDeadline.toISOString());
    setDeadline(newDeadline); // trigger useEffect lagi
  };

  return (
    <div className="container py-5">
      <div className="mx-auto p-4 p-md-5" style={{ maxWidth: 720, background: "#fdecb6", borderRadius: 24 }}>
        <h1 className="text-center fw-bold" style={{ color: "#3d231d", fontSize: 42 }}>Verify Your Account</h1>
        <p className="text-center text-muted">
          Kami telah mengirimkan kode verifikasi 6-digit ke email Anda{email ? ` (${email})` : ""}.<br />
          Silakan masukkan di bawah ini untuk melanjutkan.
        </p>

        <OtpInput length={6} onComplete={onVerify} />

        <button
          className="btn w-100 mt-3"
          style={{ background: "#f08b2d", color: "#fff" }}
          onClick={() => onVerify("000000")}
        >
          Verifikasi Kode
        </button>

        <p className="text-center text-muted mt-3">
          {countdown > 0 ? (
            <>Tidak mendapatkan kode? <span className="text-secondary">Kirim ulang dalam {countdown} detik</span></>
          ) : (
            <button className="btn btn-link p-0" onClick={handleResend}>
              Kirim ulang sekarang
            </button>
          )}
        </p>

        <div className="text-center mt-2">
          <a href="/login">Back to Login</a>
        </div>
      </div>
    </div>
  );
}
