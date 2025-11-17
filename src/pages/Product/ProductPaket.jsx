import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { slugify } from '../../lib/slugify';

const CATS = [
  { id: 'kue', label: 'Kue' },
  { id: 'makanan', label: 'Makanan' },
  { id: 'drink', label: 'Drink' },
];

const SAMPLE = [
  { id: 'pk1', title: 'Tumpeng Nasi Kuning', category: 'makanan', price: 350000, img: '/assets/tumpeng.png', sold: 50, createdAt: '2024-09-01' },
  { id: 'pk2', title: 'Tampah Nasi Liwet', category: 'makanan', price: 350000, img: '/assets/tampah-liwet.png', sold: 30, createdAt: '2024-08-15' },
  { id: 'pk3', title: 'Tampah Rebusan', category: 'makanan', price: 300000, img: '/assets/tampah-rebusan.png', sold: 45, createdAt: '2024-10-05' },
  { id: 'pk4', title: 'Tampah Rujak', category: 'makanan', price: 280000, img: '/assets/tampah-rujak.png', sold: 40, createdAt: '2024-06-11' },
  { id: 'pk5', title: 'Tampah Buah Segar', category: 'makanan', price: 225000, img: '/assets/tampah-buah.png', sold: 25, createdAt: '2024-07-01' },
  { id: 'pk6', title: 'Nasi Dos', category: 'makanan', price: 40000, img: '/assets/nasi-dos.png', sold: 70, createdAt: '2024-05-02' },
  { id: 'pk7', title: 'Box Nasi Liwet', category: 'makanan', price: 45000, img: '/assets/box-liwet.png', sold: 80, createdAt: '2024-11-03' },

  // kue paket (misal hampers kue)
  { id: 'pk8', title: 'Paket Kue Kering', category: 'kue', price: 150000, img: '/assets/paket-kue.png', sold: 90, createdAt: '2024-04-12' },
  { id: 'pk9', title: 'Hampers Bolu + Snacks', category: 'kue', price: 220000, img: '/assets/hampers-bolu.png', sold: 60, createdAt: '2024-02-20' },

  // drinks
  { id: 'pk10', title: 'Paket Minuman Segar', category: 'drink', price: 80000, img: '/assets/paket-drink.png', sold: 35, createdAt: '2024-03-08' },
  { id: 'pk11', title: 'Box Juice 12pcs', category: 'drink', price: 120000, img: '/assets/box-juice.png', sold: 20, createdAt: '2024-10-20' },
];

export default function ProductPaket() {
  const [activeCat, setActiveCat] = useState('kue');
  const [query, setQuery] = useState('');

  const [tempMin, setTempMin] = useState(30000);
  const [tempMax, setTempMax] = useState(500000);
  const [appliedMin, setAppliedMin] = useState(30000);
  const [appliedMax, setAppliedMax] = useState(500000);

  const [sortBy, setSortBy] = useState('default');
  const [page, setPage] = useState(1);
  const perPage = 8;

  const onApply = () => {
    setAppliedMin(Number(tempMin));
    setAppliedMax(Number(tempMax));
    setPage(1);
  };

  const filtered = useMemo(() => {
    let list = SAMPLE.filter(p => p.category === activeCat);
    if (query.trim()) list = list.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
    list = list.filter(p => p.price >= appliedMin && p.price <= appliedMax);

    switch (sortBy) {
      case 'price-asc': list = list.sort((a,b)=>a.price-b.price); break;
      case 'price-desc': list = list.sort((a,b)=>b.price-a.price); break;
      case 'newest': list = list.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)); break;
      case 'top': list = list.sort((a,b)=>b.sold-a.sold); break;
      default: break;
    }
    return list;
  }, [activeCat, query, appliedMin, appliedMax, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page-1)*perPage, page*perPage);

  return (
    <div className="product-paket-page">
      <style>{`
        :root{--brand-orange:#f08b2d;--brand-dark:#3d231d}
        .hero{background-image:url('/assets/hero-baking.jpg');background-size:cover;background-position:center;padding:88px 0;color:#fff}
        .cat-row{display:flex;gap:16px;justify-content:center;margin-top:-10px}
        .cat-box{background:#fff;border-radius:12px;padding:12px 18px;border:1px solid rgba(0,0,0,0.06);cursor:pointer;min-width:110px;text-align:center}
        .cat-box.active{background:var(--brand-orange);color:#fff;transform:translateY(-6px);box-shadow:0 12px 28px rgba(0,0,0,0.12)}
        .controls{display:flex;justify-content:space-between;align-items:center;margin:28px 0}
        .product-grid .card{border-radius:12px;border:1px solid rgba(61,35,29,0.08)}
        .product-img{width:160px;height:140px;object-fit:cover;border-radius:10px}
        .pagination-wrap{display:flex;gap:8px;justify-content:center;margin:28px 0}
        @media(max-width:767px){.controls{flex-direction:column;gap:12px}}
      `}</style>

      <section className="hero text-center">
        <div className="container">
          <h2 style={{fontWeight:700,fontSize:28}}>Lola Cake menyediakan berbagai pilihan paket lengkap untuk setiap acara</h2>
          <p style={{maxWidth:900,margin:'8px auto'}}>Semua dibuat dengan bahan premium dan cita rasa rumahan yang istimewa.</p>

          <div className="cat-row mt-4">
            {CATS.map(c=> (
              <div key={c.id} className={`cat-box ${activeCat===c.id? 'active': ''}`} onClick={()=>{setActiveCat(c.id); setPage(1)}}>
                <div style={{fontSize:22}}>{c.id==='kue'? '🍰' : c.id==='makanan' ? '🍽️' : '🥤'}</div>
                <div style={{fontWeight:700,marginTop:6}}>{c.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        <nav style={{fontSize:13,marginTop:18}}>Home &gt; Product &gt;</nav>
        <h3 style={{fontSize:32,fontWeight:800,color:'var(--brand-dark)',marginTop:6}}>Makanan Paketan</h3>
        <p className="text-muted">Berisi aneka paket lengkap makanan dalam tampah cantik. Cocok untuk acara keluarga, arisan, dan rapat.</p>

        <div className="controls">
          <div style={{display:'flex',gap:12,alignItems:'center'}}>
            <div>
              <label className="small">Rentang Harga</label>
              <div className="d-flex align-items-center gap-2">
                <div style={{fontSize:13}}>Rp {tempMin.toLocaleString()}</div>
                <div>
                  <input type="range" min={30000} max={500000} step={5000} value={tempMin} onChange={e=>{const v=Number(e.target.value); if(v<=tempMax) setTempMin(v); else setTempMin(tempMax)}} />
                  <input type="range" min={30000} max={500000} step={5000} value={tempMax} onChange={e=>{const v=Number(e.target.value); if(v>=tempMin) setTempMax(v); else setTempMax(tempMin)}} />
                </div>
                <div style={{fontSize:13}}>Rp {tempMax.toLocaleString()}</div>
                <button className="btn btn-outline-secondary btn-sm" onClick={onApply}>Terapkan Filter</button>
              </div>
            </div>

            <div>
              <label className="small">Cari</label>
              <input className="form-control form-control-sm" placeholder="Cari produk..." value={query} onChange={e=>{setQuery(e.target.value); setPage(1)}} />
            </div>
          </div>

          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <label className="small">Urutkan Berdasarkan</label>
            <select className="form-select form-select-sm" value={sortBy} onChange={e=>{setSortBy(e.target.value); setPage(1)}}>
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
          {paginated.length===0 && <div className="col-12 text-center py-5 text-muted">Tidak ada produk.</div>}

          {paginated.map((p) => {
            const slug = `${slugify(p.title)}--${p.id}`;
            return (
              <div key={p.id} className="col-6 col-md-3 mb-4">
                <div className="card h-100 text-center p-3">
                  <img src={p.img} alt={p.title} className="product-img mx-auto" />
                  <div className="card-body">
                    <h6 style={{fontWeight:700}}>{p.title}</h6>
                    <div className="text-muted small">Rp{p.price.toLocaleString()}</div>
                  </div>
                  <div className="d-flex gap-2 px-3 mb-2">
                    <button className="btn btn-outline-secondary btn-sm">🛒</button>
                    <Link to={`/product/paketan/${slug}`} className="btn btn-sm" style={{background:'var(--brand-orange)',color:'#fff',borderRadius:8}}>Detail</Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* pagination */}
        <div className="pagination-wrap">
          <button className="btn btn-sm btn-light" disabled={page===1} onClick={()=>setPage(page-1)}>Prev</button>
          {Array.from({length:totalPages}).map((_,i)=> (
            <button key={i} className={`btn btn-sm ${page===i+1? 'btn-primary':'btn-light'}`} onClick={()=>setPage(i+1)}>{i+1}</button>
          ))}
          <button className="btn btn-sm btn-light" disabled={page===totalPages} onClick={()=>setPage(page+1)}>Next</button>
        </div>

      </div>
    </div>
  );
}
