import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const fmtRp = (n=0) => `Rp${(n||0).toLocaleString("id-ID")}`;

function readCheckout() {
  try { return JSON.parse(sessionStorage.getItem("lola_checkout")); }
  catch { return null; }
}
function readUser() {
  try { return JSON.parse(localStorage.getItem("user")); }
  catch { return null; }
}

export default function OrderInfo() {
  const nav = useNavigate();
  const checkout = useMemo(() => readCheckout(), []);
  const user = useMemo(() => readUser(), []);

  // kalau masuk langsung tanpa cart
  useEffect(() => {
    if (!checkout || !checkout.items || checkout.items.length === 0) {
      nav("/cart", { replace: true });
    }
  }, [checkout, nav]);

  const total = checkout?.items?.reduce((s,i)=>s+i.price*i.qty,0) || 0;

  // form
  const [name, setName]   = useState(user?.username || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [email, setEmail] = useState(user?.email || "");
  const [day, setDay]     = useState("Sabtu");
  const [time, setTime]   = useState("12.30");
  const [payMethod, setPayMethod] = useState("pay_now"); // pay_now | cod

  const store = {
    addr: "Toko Lola Cake – Jl. Sapati No.19, Kota Kendari",
    hours: "Senin - Sabtu (08.00 – 17.00 WIB)",
  };

  const saveOrder = () => {
    if (!name || !phone || !email) return alert("Lengkapi identitas penerima.");
    const order = {
      receiver: { name, phone, email, day, time },
      store,
      payment: { method: payMethod },
      checkout,
      total,
      note: checkout?.note || ""
    };
    sessionStorage.setItem("lola_order", JSON.stringify(order));
    if (payMethod === "pay_now") nav("/checkout/payment");
    else nav("/checkout/payment-cod");
  };

  if (!checkout) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-4">
      <style>{`
        :root{--brand:#f08b2d;--dark:#3d231d}
        .step-pill{background:#f3e8d0;color:#3d231d;border-radius:28px;padding:12px 22px;font-weight:700}
        .box{border:1px solid rgba(0,0,0,.08);border-radius:12px;padding:16px;background:#fff}
        .btn-brand{background:var(--brand);color:#fff}
        .radio-line{border:1px solid rgba(0,0,0,.08);border-radius:12px;padding:14px}
      `}</style>

      {/* Steps */}
      <div className="d-flex gap-3 mb-4">
        <div className="step-pill" style={{opacity:.5}}>1. Cart</div>
        <div className="step-pill">2. Order Info</div>
        <div className="step-pill" style={{opacity:.5}}>3. Payment</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Kolom kiri: informasi penerima */}
        <div className="lg:col-span-4">
          <div className="box">
            <div className="fw-semibold mb-2">Informasi Penerima</div>
            <label className="small text-muted">Nama Penerima</label>
            <input className="form-control mb-2" value={name} onChange={e=>setName(e.target.value)} />
            <label className="small text-muted">Nomor Telepon</label>
            <input className="form-control mb-2" value={phone} onChange={e=>setPhone(e.target.value)} />
            <label className="small text-muted">Email</label>
            <input className="form-control mb-2" value={email} onChange={e=>setEmail(e.target.value)} />
            <label className="small text-muted">Hari Pengambilan</label>
            <input className="form-control mb-2" value={day} onChange={e=>setDay(e.target.value)} />
            <label className="small text-muted">Jam Pengambilan</label>
            <input className="form-control mb-3" value={time} onChange={e=>setTime(e.target.value)} />
            <button className="btn btn-brand w-100" onClick={saveOrder}>Simpan</button>
          </div>
        </div>

        {/* Kolom kanan atas: info toko */}
        <div className="lg:col-span-8">
          <div className="box mb-3">
            <div className="fw-semibold mb-2">Pesanan dapat diambil di:</div>
            <div className="small">{store.addr}</div>
            <div className="small text-muted mt-2">Buka: {store.hours}</div>
            <div className="small text-muted mt-2">
              Pesanan dapat diambil selama jam operasional toko setelah pembayaran dikonfirmasi.
            </div>
            <a
              className="btn btn-outline-secondary mt-3"
              href="https://maps.google.com/?q=Jl. Sapati No.19, Kendari"
              target="_blank"
            >
              Lihat di Google Maps
            </a>
          </div>

          {/* Metode pembayaran */}
          <div className="box">
            <div className="fw-semibold mb-2">Pilihlah Metode Pembayaran</div>

            <div className="radio-line d-flex align-items-center gap-2 mb-2">
              <input
                type="radio"
                id="pay_now"
                name="pay"
                checked={payMethod==="pay_now"}
                onChange={()=>setPayMethod("pay_now")}
              />
              <label htmlFor="pay_now" className="mb-0">Bayar Sekarang</label>
            </div>

            <div className="radio-line d-flex align-items-center gap-2">
              <input
                type="radio"
                id="cod"
                name="pay"
                checked={payMethod==="cod"}
                onChange={()=>setPayMethod("cod")}
              />
              <label htmlFor="cod" className="mb-0">Bayar Nanti (Saat Ambil)</label>
            </div>
          </div>

          <div className="text-center mt-4">
            <button className="btn btn-brand px-5" onClick={saveOrder}>Simpan Pesanan</button>
          </div>
        </div>
      </div>

      {/* Ringkasan singkat bisa ditaruh di sidebar juga; di mockup total ada di Payment */}
      <div className="text-end mt-3 text-sm text-muted">Total: <b>{fmtRp(total)}</b></div>
    </div>
  );
}
