import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const fmtRp = (n=0) => `Rp${(n||0).toLocaleString("id-ID")}`;

function readOrder() {
  try { return JSON.parse(sessionStorage.getItem("lola_order")) || null; }
  catch { return null; }
}

export default function PaymentNow() {
  const nav = useNavigate();
  const order = useMemo(() => readOrder(), []);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    if (!order) nav("/order-info", { replace: true });
  }, [order, nav]);

  if (!order) return null;

  const { total, checkout } = order;
  const items = checkout.items || [];

  return (
    <div className="container py-4">
      <style>{`
        :root{--brand:#f08b2d;--dark:#3d231d}
        .step-pill{background:#f3e8d0;color:#3d231d;border-radius:28px;padding:12px 22px;font-weight:700}
        .panel{border:1px solid rgba(0,0,0,.08);border-radius:12px;background:#fff}
        .panel-h{padding:14px 16px;border-bottom:1px solid rgba(0,0,0,.06);font-weight:700}
        .panel-b{padding:16px}
        .btn-brand{background:var(--brand);color:#fff}
        .banner{background:#e7f7e9;border:1px solid #c8ebd1;color:#256b36;border-radius:8px;padding:10px 12px;font-weight:600}
      `}</style>

      {/* Steps */}
      <div className="d-flex gap-3 mb-3">
        <div className="step-pill" style={{opacity:.5}}>1. Cart</div>
        <div className="step-pill" style={{opacity:.5}}>2. Order Info</div>
        <div className="step-pill">3. Payment</div>
      </div>

      {paid && (
        <div className="banner mb-3">Pesanan berhasil dibuat</div>
      )}

      <div className="row g-4">
        {/* Invoice kiri */}
        <div className="col-lg-4">
          <div className="panel">
            <div className="panel-h">Invoice Pesanan</div>
            <div className="panel-b">
              <div className="small text-muted">Nomor Invoice</div>
              <div className="fw-semibold mb-2">#INV{new Date().getFullYear()}-{String(Date.now()).slice(-4)}</div>

              <div className="small text-muted">Tanggal Pesanan</div>
              <div className="mb-2">{new Date().toLocaleDateString("id-ID")}</div>

              <div className="small text-muted">Status</div>
              <div className="mb-3">{paid ? "Menunggu Konfirmasi" : "Menunggu Pembayaran"}</div>

              {items.map((it) => (
                <div className="d-flex justify-content-between mb-1" key={`${it.id}-${it.size}-${it.motif}`}>
                  <div className="small">{it.name}</div>
                  <div className="small">{fmtRp(it.price)}</div>
                </div>
              ))}

              <hr />
              <div className="d-flex justify-content-between">
                <div className="fw-semibold">Total Pembayaran</div>
                <div className="fw-semibold">{fmtRp(total)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Metode pembayaran kanan */}
        <div className="col-lg-8">
          <div className="panel">
            <div className="panel-h">Pilih Metode Pembayaran</div>
            <div className="panel-b">
              <div className="mb-2">
                <div className="small text-muted">Total</div>
                <div className="h4">{fmtRp(total)}</div>
                <div className="small text-muted">Order ID MID{String(Date.now()).slice(-8)}</div>
              </div>

              {/* daftar metode (dummy) */}
              {[
                "Credit/Debit Card",
                "ATM/Bank Transfer",
                "Virtual Account",
                "GoPay/other e-Wallets",
                "ShopeePay/other e-Wallets",
                "OVO",
                "Indomaret",
                "Alfa Group",
              ].map((name, idx) => (
                <div key={idx} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                  <div className="small">{name}</div>
                  <button className="btn btn-sm btn-outline-secondary">Pilih</button>
                </div>
              ))}

              <div className="d-flex gap-2 mt-3">
                <button className="btn btn-outline-secondary" onClick={()=>alert("Status pembayaran akan diintegrasi ke payment gateway.")}>
                  Lihat Status
                </button>
                <button className="btn btn-brand" onClick={()=>nav("/checkout/payment-waiting")}>
                  Lanjut Pembayaran
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
