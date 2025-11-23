import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { slugify } from "../../lib/slugify";

const SAMPLE = [
  { id: "p1", title: "Bolu Keju", price: 75000, img: "/assets/bolu-keju.png", sold: 120, createdAt: "2024-10-01" },
  { id: "p2", title: "Bolu Zebra", price: 75000, img: "/assets/bolu-zebra.png", sold: 210, createdAt: "2024-09-10" },
  { id: "p3", title: "Bolu Pandan", price: 75000, img: "/assets/bolu-pandan.png", sold: 90, createdAt: "2024-11-05" },
  { id: "p6", title: "Brownies Coklat", price: 75000, img: "/assets/brownies.png", sold: 300, createdAt: "2024-11-01" },
  { id: "pk1", title: "Tumpeng Nasi Kuning", price: 350000, img: "/assets/tumpeng.png", sold: 50, createdAt: "2024-09-01" },
  { id: "pk2", title: "Tampah Nasi Liwet", price: 350000, img: "/assets/tampah-liwet.png", sold: 30, createdAt: "2024-08-15" },
];

function readUser() {
  try { return JSON.parse(localStorage.getItem("user")) || null; }
  catch { return null; }
}

export default function Search() {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [tempMax, setTempMax] = useState(500000);
  const [appliedMax, setAppliedMax] = useState(500000);
  const [openPrice, setOpenPrice] = useState(false);

  const onApply = () => setAppliedMax(Number(tempMax));

  const filtered = useMemo(() => {
    let list = SAMPLE;
    if (query.trim()) list = list.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
    list = list.filter(p => p.price >= 3000 && p.price <= appliedMax);
    switch (sortBy) {
      case "price-asc": list = list.sort((a,b)=>a.price-b.price); break;
      case "price-desc": list = list.sort((a,b)=>b.price-a.price); break;
      case "newest": list = list.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)); break;
      case "top": list = list.sort((a,b)=>b.sold-a.sold); break;
      default: break;
    }
    return list;
  }, [query, appliedMax, sortBy]);

  return (
    <div className="search-page">
      <style>{`
        :root{--brand-orange:#f08b2d;--brand-dark:#3d231d}
        .hero{background-image:url('/assets/hero-baking.jpg');background-size:cover;background-position:center;padding:88px 0;color:#fff;position:relative}
        .hero-overlay{position:absolute;inset:0;background:linear-gradient(180deg, rgba(61,35,29,0.55), rgba(61,35,29,0.55))}
        .controls{display:flex;justify-content:space-between;align-items:center;margin:24px 0}
        .dropdown{position:relative}
        .dropdown-menu{position:absolute;z-index:10;top:100%;left:0;background:#fff;border:1px solid rgba(0,0,0,0.08);border-radius:12px;padding:12px;min-width:260px;box-shadow:0 10px 24px rgba(0,0,0,0.12)}
      `}</style>

      <section className="hero text-center">
        <div className="hero-overlay" />
        <div className="max-w-6xl mx-auto px-4" style={{position:'relative'}}>
          <h2 style={{fontWeight:700,fontSize:28}}>Cari produk Lola Cake</h2>
          <div className="mx-auto" style={{maxWidth:760,marginTop:16}}>
            <input className="w-full px-5 py-3 rounded-full" placeholder="Cari produk..." value={query} onChange={e=>setQuery(e.target.value)} />
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4">
        <nav style={{fontSize:13,marginTop:18}}><Link to="/">Home</Link> &gt; <Link to="/search">Search</Link></nav>
        <div className="controls">
          <div className="dropdown">
            <button className="btn btn-outline-secondary btn-sm" onClick={()=>setOpenPrice(v=>!v)}>Rentang Harga</button>
            {openPrice && (
              <div className="dropdown-menu">
                <input type="range" min={3000} max={500000} step={1000} value={tempMax} onChange={e=>setTempMax(Number(e.target.value))} />
                <div className="text-muted small">Rp {Number(tempMax).toLocaleString()}</div>
                <button className="btn btn-sm btn-primary" onClick={onApply}>Terapkan</button>
              </div>
            )}
          </div>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <label className="small">Urutkan Berdasarkan</label>
            <select className="form-select form-select-sm" value={sortBy} onChange={e=>setSortBy(e.target.value)}>
              <option value="default">Default</option>
              <option value="price-asc">Harga Terendah</option>
              <option value="price-desc">Harga Tertinggi</option>
              <option value="newest">Terbaru</option>
              <option value="top">Terlaris</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.length===0 && <div className="col-span-full text-center py-5 text-muted">Tidak ada produk.</div>}
          {filtered.map(p => {
            const slug = `${slugify(p.title)}--${p.id}`;
            const to = p.id.startsWith("pk") ? `/product/paketan/${slug}` : `/product/satuan/${slug}`;
            return (
              <div key={p.id} className="border rounded p-3 text-center">
                <img src={p.img} alt={p.title} className="mx-auto" style={{width:160,height:140,objectFit:'cover',borderRadius:10}} />
                <div style={{fontWeight:700,marginTop:8}}>{p.title}</div>
                <div className="text-muted small">Rp{p.price.toLocaleString()}</div>
                <div className="flex gap-2 mt-2 justify-center">
                  <button className="border border-black/20 rounded-md px-2 py-1" onClick={() => {
                    const u = readUser();
                    if (!u) { window.location.href = "/login"; return; }
                    const key = "lola_cart";
                    const raw = localStorage.getItem(key);
                    const cart = raw ? JSON.parse(raw) : [];
                    const idx = cart.findIndex(i => i.id === p.id);
                    if (idx >= 0) cart[idx].qty = (cart[idx].qty || 1) + 1;
                    else cart.push({ id: p.id, name: p.title, price: p.price, qty: 1 });
                    localStorage.setItem(key, JSON.stringify(cart));
                    try { window.dispatchEvent(new Event("cart-changed")); } catch {}
                  }}>🛒</button>
                  <Link to={to} className="rounded-md px-3 py-1" style={{background:'var(--brand-orange)',color:'#fff'}}>Detail</Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}