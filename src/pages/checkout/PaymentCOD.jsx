// src/pages/checkout/PaymentCOD.jsx
import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const fmtRp = (n=0) => `Rp${(n||0).toLocaleString("id-ID")}`;

function readOrder() {
  try { return JSON.parse(sessionStorage.getItem("lola_order")) || null; }
  catch { return null; }
}

export default function PaymentCOD() {
  const nav = useNavigate();
  const order = useMemo(() => readOrder(), []);

  useEffect(() => {
    if (!order) nav("/order-info", { replace: true });
  }, [order, nav]);

  if (!order) return null;
  const { total, checkout } = order;
  const items = checkout?.items || [];

  const invoiceNo = `#INV${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`;
  const kodeTrans = `MID${String(Date.now()).slice(-8)}`;
  const tanggal = new Date().toLocaleDateString("id-ID");

  return (
    <div className="max-w-6xl mx-auto px-4 py-4">
      <style>{`
        :root{--brand:#f08b2d;--dark:#3d231d}
        .step-pill{background:#f3e8d0;color:#3d231d;border-radius:28px;padding:12px 22px;font-weight:700}
        .panel{border:1px solid rgba(0,0,0,.08);border-radius:12px;background:#fff}
        .panel-h{padding:14px 16px;border-bottom:1px solid rgba(0,0,0,.06);font-weight:700}
        .panel-b{padding:16px}
        .btn-brand{background:var(--brand);color:#fff}
        .banner{background:#e7f7e9;border:1px solid #c8ebd1;color:#256b36;border-radius:8px;padding:10px 12px;font-weight:600}
        .note{background:#f6f6f6;border:1px solid rgba(0,0,0,.08);border-radius:10px;padding:12px}
        .rowline{display:flex;justify-content:space-between;margin-bottom:8px}
        .smallmuted{font-size:12px;color:#777}
      `}</style>

      {/* Steps */}
      <div className="d-flex gap-3 mb-3">
        <div className="step-pill" style={{opacity:.5}}>1. Cart</div>
        <div className="step-pill" style={{opacity:.5}}>2. Order Info</div>
        <div className="step-pill">3. Payment</div>
      </div>

      <div className="banner mb-3">Pesanan berhasil dibuat</div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Kiri: invoice */}
        <div className="lg:col-span-4">
          <div className="panel">
            <div className="panel-h">Invoice Pesanan</div>
            <div className="panel-b">
              <div className="smallmuted">Nomor Invoice</div>
              <div className="fw-semibold mb-2">{invoiceNo}</div>

              <div className="smallmuted">Tanggal Pesanan</div>
              <div className="mb-2">{tanggal}</div>

              <div className="smallmuted">Kode Transaksi</div>
              <div className="mb-2">{kodeTrans}</div>

              <div className="smallmuted">Status</div>
              <div className="mb-2">Menunggu Pembayaran</div>

              <div className="smallmuted">Metode Pembayaran</div>
              <div className="mb-3">Bayar Nanti (saat ambil)</div>

              {items.map((it) => (
                <div key={`${it.id}-${it.size}-${it.motif}`} className="rowline">
                  <div className="small">{it.name}{it.qty>1?` x ${it.qty}`:""}</div>
                  <div className="small">{fmtRp(it.price)}</div>
                </div>
              ))}

              <hr/>
              <div className="rowline fw-semibold">
                <div>Total Pembayaran</div>
                <div>{fmtRp(total)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Kanan: panel payment info */}
        <div className="lg:col-span-8">
          <div className="panel">
            <div className="panel-h">Pilih Metode Pembayaran</div>
            <div className="panel-b">
              <div className="mb-2">
                <div className="smallmuted">Total</div>
                <div className="h4">{fmtRp(total)}</div>
                <div className="smallmuted">Order ID {kodeTrans}</div>
              </div>

              <div className="note mb-3">
                Pesananmu akan kami proses dan bisa dibayar saat pengambilan di toko
                atau kepada kurir saat pengantaran.
              </div>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => alert("Status pembayaran untuk COD akan terlihat setelah kasir mengonfirmasi di sistem.")}
                >
                  Lihat Status
                </button>
                <button
                  className="btn btn-brand"
                  onClick={() => nav("/")}
                >
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
