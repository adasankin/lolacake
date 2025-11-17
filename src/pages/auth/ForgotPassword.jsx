import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo_lolacake from "../../assets/loginpage/logo-lolacake.png";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    navigate("/auth/verify", { state: { email } });
  };

  return (
    <div className="container py-5">
      <div className="text-end mb-3">
              <img
                src={logo_lolacake}
                alt="Lola Cake logo"
                style={{width: 150 }}
              />
            </div>
      <div className="mx-auto p-4 p-md-5" style={{ maxWidth: 720, background: "#fdecb6", borderRadius: 24 }}>
        <h1 className="text-center fw-bold" style={{ color: "#3d231d", fontSize: 44 }}>Forgot Password ?</h1>
        <p className="text-center text-muted mb-4">
          Please enter your email address to get the verification code
        </p>

        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="form-label">Email*</label>
            <input
              type="email"
              className="form-control rounded-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              required
            />
          </div>

          <button className="btn w-100" style={{ background: "#f08b2d", color: "#fff" }}>
            Send Code
          </button>
        </form>

        <div className="text-center mt-4">
          <small className="text-muted">Don't have an account? </small>
          <a href="/login" className="fw-bold">GET STARTED</a>
        </div>
      </div>
    </div>
  );
}