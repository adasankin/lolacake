/*
ProductList.jsx

Halaman "Item Satuan" untuk Lola Cake.
Fitur:
- Kategori (Cake, Tradisional, Dessert, Bread, Donut, Cookie)
- Filter rentang harga (dual-range via 2 input range) dengan tombol "Terapkan Filter"
- Sort (Harga Terendah, Harga Tertinggi, Terbaru, Terlaris)
- Grid produk responsif dengan tombol Detail dan Add to Cart

Instruksi:
- Simpan file ini di `src/components/ProductList.jsx`
- Pastikan `react-router-dom` terpasang dan route untuk `/product/satuan` mengarah ke komponen ini
- Pastikan Bootstrap CSS diimpor (`import 'bootstrap/dist/css/bootstrap.min.css'` di main.jsx)
- Ganti path gambar `/assets/...` sesuai struktur proyekmu
*/

import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { slugify } from '../../lib/slugify';

const CATEGORIES = [
  { id: 'cake', label: 'Cake' },
  { id: 'tradisional', label: 'Tradisional' },
  { id: 'dessert', label: 'Dessert' },
  { id: 'bread', label: 'Bread' },
  { id: 'donut', label: 'Donut' },
  { id: 'cookie', label: 'Cookie' },
];

const SAMPLE_PRODUCTS = [
  { id: 'p1', title: 'Bolu Keju', category: 'cake', price: 75000, img: '/assets/bolu-keju.png', sold: 120, createdAt: '2024-10-01' },
  { id: 'p2', title: 'Bolu Zebra', category: 'cake', price: 75000, img: '/assets/bolu-zebra.png', sold: 210, createdAt: '2024-09-10' },
  { id: 'p3', title: 'Bolu Pandan', category: 'cake', price: 75000, img: '/assets/bolu-pandan.png', sold: 90, createdAt: '2024-11-05' },
  { id: 'p4', title: 'Bolu Gula Merah', category: 'cake', price: 75000, img: '/assets/bolu-gula.png', sold: 60, createdAt: '2024-07-21' },
  { id: 'p5', title: 'Bolu Gulung', category: 'cake', price: 75000, img: '/assets/bolu-gulung.png', sold: 45, createdAt: '2024-06-12' },
  { id: 'p6', title: 'Brownies Coklat', category: 'cake', price: 75000, img: '/assets/brownies.png', sold: 300, createdAt: '2024-11-01' },
  { id: 'p7', title: 'Bolu Pisang', category: 'cake', price: 70000, img: '/assets/bolu-pisang.png', sold: 80, createdAt: '2024-05-30' },
  { id: 'p8', title: 'Bolu Caramel', category: 'cake', price: 75000, img: '/assets/bolu-caramel.png', sold: 40, createdAt: '2024-03-18' },
  { id: 'p9', title: 'Bolu Cuke', category: 'cake', price: 3500, img: '/assets/bolu-cuke.png', sold: 15, createdAt: '2024-01-10' },
  { id: 'p10', title: 'Bolu Lapis Surabaya', category: 'cake', price: 3500, img: '/assets/bolu-lapis.png', sold: 9, createdAt: '2024-02-02' },
  // Add more items here and change categories accordingly (e.g. 'donut', 'cookie')
];

export default function ProductList() {
  // category selection
  const [activeCategory, setActiveCategory] = useState('cake');

  // sorting and filters (these are the *applied* filters)
  const [appliedSort, setAppliedSort] = useState('default');
  const [appliedMin, setAppliedMin] = useState(30000);
  const [appliedMax, setAppliedMax] = useState(500000);

  // temporary UI state for slider before applying
  const [tempMin, setTempMin] = useState(appliedMin);
  const [tempMax, setTempMax] = useState(appliedMax);

  // search box (instant)
  const [query, setQuery] = useState('');

  // compute filtered list
  const products = SAMPLE_PRODUCTS;

  const filteredProducts = useMemo(() => {
    const catFiltered = products.filter(p => p.category === activeCategory);
    const qFiltered = catFiltered.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
    const priceFiltered = qFiltered.filter(p => p.price >= appliedMin && p.price <= appliedMax);

    switch (appliedSort) {
      case 'price-asc':
        return priceFiltered.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return priceFiltered.sort((a, b) => b.price - a.price);
      case 'newest':
        return priceFiltered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'top':
        return priceFiltered.sort((a, b) => b.sold - a.sold);
      default:
        return priceFiltered;
    }
  }, [products, activeCategory, query, appliedMin, appliedMax, appliedSort]);

  function applyFilters() {
    setAppliedMin(Number(tempMin));
    setAppliedMax(Number(tempMax));
  }

  // ensure tempMin <= tempMax
  function onTempMinChange(val) {
    const v = Number(val);
    if (v <= tempMax) setTempMin(v);
    else setTempMin(tempMax);
  }
  function onTempMaxChange(val) {
    const v = Number(val);
    if (v >= tempMin) setTempMax(v);
    else setTempMax(tempMin);
  }

  return (
    <div className="product-list-page">
      <style>{`
        :root{--brand-orange:#f08b2d;--brand-dark:#3d231d}
        .hero-small{background-image:url('/assets/hero-baking.jpg');background-position:center;background-size:cover;padding:90px 0;color:white;}
        .category-row{display:flex;gap:18px;justify-content:center;margin-top:-14px}
        .cat-pill{border-radius:12px;padding:12px 18px;background:#fff;border:1px solid rgba(0,0,0,0.06);text-align:center;cursor:pointer;min-width:88px}
        .cat-pill.active{background:var(--brand-orange);color:white;box-shadow:0 10px 20px rgba(0,0,0,0.08);transform:translateY(-6px)}
        .product-grid{padding:40px 0}
        .product-card{border-radius:12px;border:1px solid rgba(61,35,29,0.08);padding:16px;background:white}
        .product-image{width:160px;height:140px;object-fit:cover;border-radius:10px}
        .controls-row{display:flex;gap:12px;align-items:center;justify-content:space-between;margin-bottom:18px}
        .slider-wrap{display:flex;gap:8px;align-items:center}
        @media(max-width:767px){.category-row{flex-wrap:wrap}}
      `}</style>

      {/* HERO */}
      <section className="hero-small text-center">
        <div className="container">
          <h2 style={{fontWeight:700,fontSize:28}}>Temukan Beragam Pilihan Lezat dari Lola Cake!</h2>
          <p style={{maxWidth:800,margin:'8px auto'}}>Koleksi kue panggang lembut dengan cita rasa klasik. Pilih kategori untuk melihat produk sesuai jenis.</p>

          <div className="category-row mt-4">
            {CATEGORIES.map(cat => (
              <div
                key={cat.id}
                className={`cat-pill ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <div style={{fontSize:22}}>🍰</div>
                <div style={{fontWeight:600,marginTop:6}}>{cat.label}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Breadcrumb + Title */}
      <div className="container mt-4">
        <nav style={{fontSize:13}}>
          Home &gt; Product &gt;
        </nav>
        <h3 style={{fontSize:34,fontWeight:800,marginTop:6,color:'var(--brand-dark)'}}>Kue Panggang</h3>
        <p className="text-muted">Koleksi kue panggang lembut dengan cita rasa klasik. Semua dipanggang segar dengan bahan pilihan terbaik.</p>

        {/* Controls */}
        <div className="controls-row">
          <div style={{display:'flex',gap:12,alignItems:'center'}}>
            <div>
              <label className="mb-1 small">Rentang Harga</label>
              <div className="d-flex gap-2 align-items-center">
                <div style={{fontSize:13,color:'#555'}}>Rp {tempMin.toLocaleString()}</div>
                <div className="slider-wrap">
                  <input type="range" min={30000} max={500000} step={5000} value={tempMin} onChange={e => onTempMinChange(e.target.value)} />
                  <input type="range" min={30000} max={500000} step={5000} value={tempMax} onChange={e => onTempMaxChange(e.target.value)} />
                </div>
                <div style={{fontSize:13,color:'#555'}}>Rp {tempMax.toLocaleString()}</div>
                <button className="btn btn-outline-secondary btn-sm" onClick={applyFilters}>Terapkan Filter</button>
              </div>
            </div>

            <div>
              <label className="mb-1 small">Cari</label>
              <input className="form-control form-control-sm" placeholder="Cari produk..." value={query} onChange={e => setQuery(e.target.value)} />
            </div>
          </div>

          <div style={{display:'flex',gap:12,alignItems:'center'}}>
            <label className="small">Urutkan Berdasarkan</label>
            <select className="form-select form-select-sm" value={appliedSort} onChange={e => setAppliedSort(e.target.value)}>
              <option value="default">Default</option>
              <option value="price-asc">Harga Terendah</option>
              <option value="price-desc">Harga Tertinggi</option>
              <option value="newest">Terbaru</option>
              <option value="top">Terlaris</option>
            </select>
          </div>
        </div>

        {/* Product grid */}
        <div className="row product-grid">
          {filteredProducts.length === 0 && (
            <div className="col-12 text-center py-5 text-muted">Tidak ada produk ditemukan.</div>
          )}

          {filteredProducts.map(p => {
            const slug = `${slugify(p.title)}--${p.id}`; // pakai pola “slug--id” biar aman
            return (
              <div key={p.id} className="col-6 col-md-3 mb-4">
                <div className="product-card text-center h-100 d-flex flex-column justify-content-between">
                  <div>
                    <img src={p.img} alt={p.title} className="product-image mx-auto" />
                    <h6 style={{marginTop:12,fontWeight:700}}>{p.title}</h6>
                    <div className="text-muted" style={{fontSize:13}}>Rp{p.price.toLocaleString()}</div>
                  </div>

                  <div className="d-flex gap-2 mt-3">
                    <button className="btn btn-outline-secondary btn-sm w-100">🛒</button>
                    <Link to={`/product/satuan/${slug}`} className="btn"
                          style={{background:'var(--brand-orange)',color:'#fff',borderRadius:8}}>
                      Detail
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
