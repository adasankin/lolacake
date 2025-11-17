import React from "react";

export default function Footer() {
  return (
    <footer className="lola-footer">
      <style>{`
        .lola-footer {
          background: #f08b2d;
          color: #fff;
          font-size: 14px;
          padding-bottom: 0;
        }
        .lola-footer a {
          color: #fff;
          text-decoration: none;
        }
        .lola-footer a:hover {
          text-decoration: underline;
        }
        .lola-footer-title {
          font-weight: 700;
          margin-bottom: 16px;
          font-size: 18px;
        }
        .lola-footer-logo {
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 12px;
        }
        .lola-footer-social {
          display: flex;
          gap: 12px;
          margin-top: 12px;
        }
        .lola-footer-social-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          color: #f08b2d;
          font-size: 16px;
        }
        .lola-footer-input-wrap {
          display: flex;
          border-radius: 6px;
          overflow: hidden;
          background: #fff;
        }
        .lola-footer-input-wrap input {
          border: none;
          padding: 8px 10px;
          font-size: 13px;
          flex: 1;
        }
        .lola-footer-input-wrap input:focus {
          outline: none;
        }
        .lola-footer-input-wrap button {
          border: none;
          padding: 0 14px;
          background: #4a261f;
          color: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .lola-footer-bottom {
          background: #4a261f;
          color: #fff;
          font-size: 12px;
          padding: 10px 0;
        }
        @media (max-width: 767px){
          .lola-footer .col-md-3,
          .lola-footer .col-md-4 {
            margin-bottom: 24px;
          }
        }
      `}</style>

      {/* main footer */}
      <div className="pt-5 pb-4">
        <div className="container">
          <div className="row gy-4">
            {/* Logo & desc */}
            <div className="col-md-4">
              <div className="lola-footer-logo">Lola Cake</div>
              <p style={{ maxWidth: 260 }}>
                Lola Cake adalah usaha rumahan yang memproduksi berbagai jenis
                kue dan makanan tradisional dengan rasa autentik dan bahan
                berkualitas.
              </p>

              {/* Halal logo */}
              <div className="mt-3 mb-2">
                <img
                  src="/assets/halal.png"
                  alt="Halal"
                  style={{ height: 46 }}
                />
              </div>

              {/* Social icons – ganti href ke akun asli */}
              <div className="lola-footer-social">
                <a
                  href="https://wa.me/6285241931688"
                  className="lola-footer-social-icon"
                  aria-label="WhatsApp"
                >
                  <i className="bi bi-whatsapp" />
                </a>
                <a
                  href="https://facebook.com"
                  className="lola-footer-social-icon"
                  aria-label="Facebook"
                >
                  <i className="bi bi-facebook" />
                </a>
                <a
                  href="https://instagram.com"
                  className="lola-footer-social-icon"
                  aria-label="Instagram"
                >
                  <i className="bi bi-instagram" />
                </a>
              </div>
            </div>

            {/* Menu */}
            <div className="col-md-2">
              <div className="lola-footer-title">Menu</div>
              <ul className="list-unstyled mb-0">
                <li className="mb-1">
                  <a href="/">Menu</a>
                </li>
                <li className="mb-1">
                  <a href="/product">Product</a>
                </li>
                <li className="mb-1">
                  <a href="/about-us">About Us</a>
                </li>
                <li className="mb-1">
                  <a href="/contact-us">Contact</a>
                </li>
                <li className="mb-1">
                  <a href="/account/profile">Profile</a>
                </li>
              </ul>
            </div>

            {/* Help center */}
            <div className="col-md-3">
              <div className="lola-footer-title">Help Center</div>
              <ul className="list-unstyled mb-0">
                <li className="mb-1">
                  <a href="#">FAQ</a>
                </li>
                <li className="mb-1">
                  <a href="#">Terms &amp; Conditions</a>
                </li>
                <li className="mb-1">
                  <a href="#">Privacy Policy</a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="col-md-3">
              <div className="lola-footer-title">Contact</div>
              <ul className="list-unstyled mb-3">
                <li className="mb-1">
                  <i className="bi bi-telephone me-2" />
                  0852-4193-1688
                </li>
                <li className="mb-1">
                  <i className="bi bi-envelope me-2" />
                  lolacake@gmail.com
                </li>
                <li className="mb-1">
                  <i className="bi bi-geo-alt me-2" />
                  Jl. Sapati No.19, Kendari,
                  <br />
                  Sulawesi Tenggara
                </li>
              </ul>

              <div className="lola-footer-input-wrap">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  aria-label="Your Email Address"
                />
                <button type="button">
                  <i className="bi bi-send" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="lola-footer-bottom">
        <div className="container text-center">
          Copyright © 2024 <a href="/">Lola Cake</a>, All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}