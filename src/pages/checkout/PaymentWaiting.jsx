import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const fmtRp = (n=0) => `Rp${(n||0).toLocaleString("id-ID")}`;

function readOrder() {
  try { return JSON.parse(sessionStorage.getItem("lola_order")) || null; }
  catch { return null; }
}

export default function PaymentWaiting() {
  const nav = useNavigate();
  const order = useMemo(() => readOrder(), []);
  const [deadline, setDeadline] = useState(() => {
    const d = new Date();
    d.setMinutes(d.getMinutes() + 45);
    return d;
  });
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!order) nav("/order-info", { replace: true });
  }, [order, nav]);

  // countdown
  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, deadline.getTime() - now);
      const m = Math.floor(diff / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [deadline]);

  if (!order) return null;
  const { total, checkout } = order;
  const contact = {
    email: "lolamaharani09@gmail.com",
    whatsapp: "082236868822",
  };

  return (
    <div className="container py-4">
      <style>{`
        :root{--brand:#f08b2d;--dark:#3d231d}
        .step-pill{background:#f3e8d0;color:#3d231d;border-radius:28px;padding:12px 22px;font-weight:700}
        .title{font-weight:800;color:#2e2e2e}
        .panel{border:1px solid rgba(0,0,0,.08);border-radius:14px;background:#fff}
        .panel-b{padding:16px}
        .badge-deadline{background:#f7e9cf;border:1px solid #efd7a6;border-radius:24px;padding:6px 12px;font-weight:600}
        .qr-box{background:#f6f6f6;border:1px solid rgba(0,0,0,.08);border-radius:12px;padding:14px;text-align:center}
        .note{background:#f6f6f6;border:1px solid rgba(0,0,0,.08);border-radius:10px;padding:12px}
        .btn-brand{background:var(--brand);color:#fff}
      `}</style>

      {/* Steps */}
      <div className="d-flex gap-3 mb-4">
        <div className="step-pill" style={{opacity:.5}}>1. Cart</div>
        <div className="step-pill" style={{opacity:.5}}>2. Order Info</div>
        <div className="step-pill">3. Payment</div>
      </div>

      <h3 className="title text-center mb-4">Menunggu Pembayaran</h3>

      <div className="row g-4">
        {/* Kiri: QR + instruksi */}
        <div className="col-lg-7">
          <div className="panel">
            <div className="panel-b">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="badge-deadline">Complete payment in</span>
                <span className="fw-semibold">
                  {new Date().toLocaleDateString("id-ID", { day:"2-digit", month:"long" })},{" "}
                  {new Date().toLocaleTimeString("id-ID", { hour:"2-digit", minute:"2-digit" })}
                </span>
              </div>

              <div className="qr-box mb-3">
                <div className="small text-muted mb-2">gopay • QRIS</div>

                {/* QR Dummy: ganti "/assets/qr.png" dengan file QR mu */}
                <img
                  src="/assets/qr.png"
                  alt="QR Pembayaran"
                  width={220}
                  height={220}
                  style={{borderRadius:8, objectFit:"cover"}}
                  onError={(e)=>{e.currentTarget.style.display='none'}}
                />

                {/* fallback jika tidak ada gambar */}
                <div className="small text-muted mt-2">
                  Total: <b>{fmtRp(total)}</b> • Waktu tersisa: <b>{timeLeft}</b>
                </div>

                <div className="note mt-3">
                  Waiting for confirmation from the Gopay application
                </div>
                <button
                  className="btn btn-warning w-100 mt-2"
                  onClick={()=>alert("Status pembayaran akan diambil dari payment gateway.")}
                >
                  Periksa Status Pesanan
                </button>
              </div>

              <div className="mt-3">
                <div className="fw-semibold mb-1">Bagaimana Cara Pembayaran</div>
                <ol className="small text-muted mb-0">
                  <li>Pastikan sudah login di aplikasi GOJEK/GoPay.</li>
                  <li>Buka aplikasi & pilih menu scan QR.</li>
                  <li>Arahkan kamera ke QR di atas.</li>
                  <li>Periksa detail pembayaran & konfirmasi.</li>
                  <li>Selesai.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Kanan: bantuan / kontak */}
        <div className="col-lg-5">
          <div className="panel">
            <div className="panel-b">
              <div className="fw-semibold mb-2">Punya Pertanyaan Seputar Pesanan?</div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="badge text-bg-light">Email</span>
                <span className="small">{contact.email}</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className="badge text-bg-light">WhatsApp</span>
                <span className="small">{contact.whatsapp}</span>
              </div>
              <hr/>
              <div className="small text-muted">
                Kamu punya waktu <b>~45 menit</b> untuk menyelesaikan pembayaran di aplikasi e-wallet.
              </div>
              <button className="btn btn-outline-secondary w-100 mt-3" onClick={()=>nav("/")}>
                Kembali ke Beranda
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}