/*
Product.jsx
React component for the "Product" page (Bootstrap + custom CSS)

Usage:
1. Place this file in src/components/Product.jsx
2. Ensure Bootstrap CSS is imported in src/main.jsx: `import 'bootstrap/dist/css/bootstrap.min.css'`
3. Add images to /public or /src/assets and update paths below.
4. Import and use in App.jsx: `import Product from './components/Product'` then <Product />.

This component recreates the layout from your provided mock: hero with background and search, section title, two big feature cards (Item Satuan & Paketan), and a simple responsive footer.
*/

import React, { useState } from 'react';
import { Link } from "react-router-dom";

export default function Product() {
  const [query, setQuery] = useState('');
  
  return (
    <div className="product-page">
      <style>{`
        :root{
          --brand-orange: #f08b2d;
          --brand-dark: #3d231d;
          --muted: #fff8f1;
          --card-border: rgba(61,35,29,0.2);
        }
        .hero-product{
          background-image: url('/assets/hero-baking.jpg');
          background-size: cover;
          background-position: center;
          padding: 90px 0 60px;
          color: white;
          position: relative;
        }
        .hero-overlay{position:absolute;inset:0;background: linear-gradient(180deg, rgba(61,35,29,0.55), rgba(61,35,29,0.55));}
        .hero-content{position:relative;z-index:2}
        .search-box{max-width:760px;margin:20px auto 0;box-shadow:0 8px 30px rgba(0,0,0,0.15);}
        .section-title{padding:64px 0 24px;text-align:center;color:var(--brand-dark)}

        /* big cards */
        .category-card{background:#fff;border-radius:14px;padding:32px;border:4px solid var(--card-border);box-shadow:0 8px 20px rgba(0,0,0,0.06)}
        .category-card img{max-width:240px;height:140px;object-fit:cover}
        .category-cta{background:var(--brand-orange);border-radius:8px;color:white;padding:10px 18px;border:none}

        /* product grid */
        .product-grid .card{border-radius:14px;border:2px solid var(--card-border)}

        /* footer small */
        .product-footer{background:var(--brand-orange);color:var(--brand-dark);padding:40px 0;margin-top:48px}

        @media(max-width:767px){
          .hero-product{padding:48px 0}
          .category-card img{max-width:140px}
        }
      `}</style>

      {/* HERO */}
      <section className="hero-product">
        <div className="hero-overlay" />
        <div className="container hero-content">

          <div className="text-center">
            <h1 style={{fontWeight:700, fontSize: '1.9rem', maxWidth: 900, margin: '0 auto'}}>Temukan aneka kue dan hidangan spesial dari Lola Cake — dibuat dengan bahan berkualitas, rasa rumahan, dan cinta dari dapur kami!</h1>

            <div className="search-box bg-white rounded-pill p-2 mt-4">
              <div className="input-group">
                <span className="input-group-text bg-white border-0" style={{borderRadius: '999px 0 0 999px'}}>
                  <i className="bi bi-search" />
                </span>
                <input
                  className="form-control border-0"
                  placeholder="Temukan kue favoritmu di sini..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button className="btn bg-white border-0" style={{borderRadius:'0 999px 999px 0'}}> </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TITLE + DESCRIPTION */}
      <section className="section-title">
        <div className="container">
          <h2 style={{fontWeight:800}}>Temukan Beragam Pilihan Lezat dari Lola Cake!</h2>
          <p className="text-muted">Pilih produk satuan untuk pembelian per item, atau produk paketan untuk acara dan hampers spesialmu.</p>
        </div>
      </section>

      {/* BIG CATEGORY CARDS */}
      <section className="container mb-5">
        <div className="row gy-4 align-items-center">
          <div className="col-md-6">
            <div className="category-card d-flex align-items-center gap-4">
              <img src="/assets/card-item-satuan.jpg" alt="item" />
              <div>
                <h5 style={{color:'var(--brand-dark)'}}>Cocok untuk camilan harian dan hadiah kecil.</h5>
                <p className="text-muted">Jelajahi pilihan kue dan paket Lola Cake yang dibuat dari bahan segar dan citarasa rumahan.</p>
                <Link to="/product/satuan" className="category-cta">Pilih Item Satuan</Link>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="category-card d-flex align-items-center gap-4">
              <img src="/assets/card-paket.jpg" alt="paket" />
              <div>
                <h5 style={{color:'var(--brand-dark)'}}>Ideal untuk acara spesial, hampers, dan pesanan besar.</h5>
                <p className="text-muted">Pilih paket yang sesuai kebutuhan acara atau buat hampers personal untuk orang tersayang.</p>
                <Link to="/product/paketan" className="category-cta">Pilih Paketan</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
