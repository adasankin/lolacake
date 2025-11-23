import React, { useEffect, useMemo, useState } from "react";
import Popup from "../../components/Popup";
import ToastBanner from "../../components/ToastBanner";

const CART_KEY = "lola_cart";

const fmtRp = (n = 0) => `Rp${(n || 0).toLocaleString("id-ID")}`;

function readCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}
function writeCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("cart-changed"));
}

export default function CartPage() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState({}); // {id|variantKey: true}
  const [note, setNote] = useState("");
  const [toast, setToast] = useState({ open: false, message: "" });
  const [popup, setPopup] = useState({ open: false });

  const showPopup  = (p) => setPopup({ open: true, ...p });
  const closePopup = () => setPopup((s) => ({ ...s, open: false }));

  // load cart
  useEffect(() => {
    const list = readCart().map((it) => ({
      ...it,
      _key: `${it.id}__${it.size || ""}__${it.motif || ""}`, // kunci unik per varian
      img: it.img || "/assets/bolu-keju.png",
      stock: it.stock ?? 999,
    }));
    setItems(list);

    // default: semua terpilih
    const sel = {};
    list.forEach((i) => (sel[i._key] = true));
    setSelected(sel);
  }, []);

  const allChecked = useMemo(
    () => items.length > 0 && items.every((i) => selected[i._key]),
    [items, selected]
  );

  const toggleAll = (checked) => {
    const obj = {};
    if (checked) items.forEach((i) => (obj[i._key] = true));
    setSelected(obj);
  };

  const toggleOne = (key, checked) => {
    setSelected((s) => ({ ...s, [key]: checked }));
  };

  const removeChecked = () => {
    const remaining = items.filter((i) => !selected[i._key]);
    setItems(remaining);
    writeCart(remaining);
    setSelected({});
    setToast({ open: true, message: "Item terpilih telah dihapus." });
  };

  const updateQty = (item, delta) => {
    const newQty = Math.max(1, Math.min(item.stock, (item.qty || 1) + delta));
    const updated = items.map((i) => (i._key === item._key ? { ...i, qty: newQty } : i));
    setItems(updated);
    writeCart(updated);
  };

  const total = useMemo(() => {
    return items.reduce((sum, i) => (selected[i._key] ? sum + i.price * i.qty : sum), 0);
  }, [items, selected]);

  const buyNow = () => {
    const chosen = items.filter((i) => selected[i._key]);
    if (chosen.length === 0) {
      return showPopup({
        type: "error",
        message: "Pilih minimal satu produk terlebih dahulu.",
        okText: "OK",
        onOk: closePopup,
      });
    }
    // simpan ke session untuk dipakai di /order-info
    sessionStorage.setItem(
      "lola_checkout",
      JSON.stringify({ items: chosen, note, total })
    );
    window.location.href = "/checkout/order-info";
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-4">
      <style>{`
        :root{--brand:#f08b2d;--dark:#3d231d}
        .step-pill{background:#f3e8d0;color:#3d231d;border-radius:28px;padding:12px 22px;font-weight:700}
        .card-cart{border:1px solid rgba(0,0,0,.08);border-radius:12px}
        .qty-btn{width:26px;height:26px;display:inline-flex;align-items:center;justify-content:center;border:1px solid #ddd;border-radius:6px;background:#fff}
        .qty-input{width:44px;text-align:center;border:1px solid #ddd;border-radius:6px;height:26px}
        .btn-brand{background:var(--brand);color:#fff}
      `}</style>

      {/* Steps */}
      <div className="d-flex gap-3 mb-4">
        <div className="step-pill">1. Cart</div>
        <div className="step-pill" style={{ opacity: .5 }}>2. Order Info</div>
        <div className="step-pill" style={{ opacity: .5 }}>3. Payment</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LEFT: cart list */}
        <div className="lg:col-span-8">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="form-check">
              <input
                id="checkAll"
                className="form-check-input"
                type="checkbox"
                checked={allChecked}
                onChange={(e) => toggleAll(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="checkAll">
                Pilih Semua
              </label>
            </div>
            <button className="btn btn-link text-danger p-0" onClick={removeChecked}>
              Hapus
            </button>
          </div>

          {items.map((it) => (
            <div key={it._key} className="card-cart p-3 mb-3">
              <div className="d-flex align-items-center">
                <div className="form-check me-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={!!selected[it._key]}
                    onChange={(e) => toggleOne(it._key, e.target.checked)}
                  />
                </div>

                <img src={it.img} alt={it.name} width={56} height={56} className="rounded me-3" />
                <div className="flex-grow-1">
                  <div className="fw-semibold">{it.name}</div>
                  <div className="small text-muted">
                    {it.size ? `${it.size}, ` : ""}{it.motif || ""}
                  </div>
                </div>

                <div className="text-end" style={{ minWidth: 120 }}>
                  <div className="small text-muted">{fmtRp(it.price)}</div>
                  <div className="d-flex justify-content-end align-items-center gap-2 mt-1">
                    <button className="qty-btn" onClick={() => updateQty(it, -1)}>−</button>
                    <input className="qty-input" value={it.qty} readOnly />
                    <button className="qty-btn" onClick={() => updateQty(it, +1)}>+</button>
                  </div>
                </div>

                <div className="text-end ms-3" style={{ minWidth: 120 }}>
                  <div className="small text-muted">{fmtRp(it.price * it.qty)}</div>
                </div>
              </div>
            </div>
          ))}

          {items.length === 0 && (
            <div className="text-muted py-5 text-center">
              Keranjang kosong. Ayo belanja dulu 😊
            </div>
          )}
        </div>

        {/* RIGHT: summary */}
        <div className="lg:col-span-4">
          <div className="card-cart p-3">
            <div className="fw-semibold mb-2">Ringkasan Belanja</div>
            <div className="d-flex justify-content-between">
              <div className="text-muted">Total</div>
              <div className="fw-bold">{fmtRp(total)}</div>
            </div>

            <div className="mt-3">
              <label className="small text-muted mb-1">Add Order Note (Optional)</label>
              <textarea
                className="form-control"
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            <button className="btn btn-brand w-100 mt-3" onClick={buyNow}>
              Buy now
            </button>
          </div>
        </div>
      </div>

      <ToastBanner open={toast.open} message={toast.message} onClose={() => setToast({ open:false, message:"" })} />
      <Popup {...popup} />
    </div>
  );
}
