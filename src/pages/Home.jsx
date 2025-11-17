import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {

  const products = [
    {
      id: 'brownies',
      name: 'Brownies',
      price: 'Rp. 60.000',
      img: '/assets/brownies.png',
      features: ['Tekstur lembut & fudgy', 'Coklat pekat', 'Toping kacang pilihan'],
      desc: 'Brownies kami dibuat dari coklat berkualitas tinggi sehingga menghasilkan tekstur fudgy yang lembut. Cocok untuk teman ngopi dan acara spesial.'
    },
    {
      id: 'bolu-zebra',
      name: 'Bolu Zebra',
      price: 'Rp. 75.000',
      img: '/assets/bolu-zebra.png',
      features: ['Coklat dan vanila lembut', 'Aroma wangi', 'Tekstur halus'],
      desc: 'Bolu Zebra klasik kami menggabungkan lapisan coklat dan vanila yang lembut. Ideal untuk kue ulang tahun atau hantaran.'
    },
    {
      id: 'panada',
      name: 'Panada',
      price: 'Rp. 20.000',
      img: '/assets/panada.png',
      features: ['Isian ikan gurih', 'Kulit renyah', 'Kecil & praktis'],
      desc: 'Panada gurih dengan isian ikan khas lokal. Renyah di luar, lezat di dalam — favorit untuk cemilan keluarga.'
    },
    {
      id: 'risoles',
      name: 'Risoles',
      price: 'Rp. 12.000',
      img: '/assets/risoles.png',
      features: ['Diisi sayur & ayam', 'Gorengan garing', 'Camilan serbaguna'],
      desc: 'Risoles rumahan kami berisi kombinasi sayur dan ayam yang lembut. Cocok untuk acara kecil maupun besar.'
    },
    {
      id: 'barongko',
      name: 'Barongko',
      price: 'Rp. 30.000',
      img: '/assets/barongko.png',
      features: ['Kue tradisional', 'Tekstur manis & lembut', 'Terbuat dari pisang'],
      desc: 'Barongko khas dengan rasa manis alami dari pisang. Tradisional dan cocok untuk oleh-oleh.'
    }
  ];

  const [activeId, setActiveId] = useState(products[1].id); // default Bolu Zebra
  const activeProduct = products.find(p => p.id === activeId) || products[0];

  return (
    <div className="lola-root">
      <style>{`
        :root{
          --brand-orange: #f08b2d;
          --brand-dark: #3d231d;
          --muted: #f4efe8;
          --accent: #ffd08a;
          --rounded: 18px;
        }
        .lola-root{font-family: 'Poppins', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial}
        /* NAVBAR */
        .lola-navbar{background: linear-gradient(0deg,var(--brand-orange),var(--brand-orange));}
        .lola-logo{font-weight:700;color:var(--brand-dark)}
        .lola-hero{background:var(--brand-dark);color:white;padding:80px 0;position:relative;overflow:hidden}
        .hero-card{background:linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.35));border-radius:18px;padding:48px}
        .hero-title{font-weight:800;font-size:38px;line-height:1.05}
        .hero-sub{color: #f1d9b8;margin-top:12px}
        .cta-btn{background:transparent;border:2px solid var(--accent);color:var(--accent);border-radius:8px;padding:8px 18px}
        .product-card{border-radius:18px;background:white;padding:24px;border:8px solid rgba(61,35,29,0.06)}

        /* Best seller list */
        .best-list{background:var(--brand-dark);color:white;padding:24px;border-radius:20px}
        .best-list .list-group-item{background:transparent;border:0;color:#fff}
        .product-preview{border:4px solid var(--accent);border-radius:18px;padding:20px}

        /* Why choose */
        .why-section{padding:64px 0}
        .why-title{font-weight:800;font-size:32px}
        .feature-box{border-radius:12px;padding:18px}

        /* testimonials */
        .testi{padding:60px 0;background:linear-gradient(180deg,#fff,#fff)}
        .quote-box{background: #fff6e6;border-radius:12px;padding:22px;box-shadow:0 6px 20px rgba(0,0,0,0.08)}

        .follow-section{
          background:#fff;
          position:relative;
          padding:60px 0 70px;
        }

        .follow-ig-badge{
          width:64px;
          height:64px;
          border-radius:50%;
          background:var(--brand-orange);
          display:flex;
          align-items:center;
          justify-content:center;
          margin:0 auto 16px;
          color:#fff;
          font-size:26px;
        }

        .follow-title{
          font-size:28px;
          font-weight:700;
          margin-bottom:4px;
          color:var(--brand-dark);
        }
        .follow-title span{
          color:var(--brand-orange);
        }

        .follow-subtext{
          font-size:13px;
          color:#777;
        }

        /* kartu foto */
        .follow-gallery-row{
          margin-top:26px;
        }
        .follow-card{
          background:#fff;
          border-radius:18px;
          box-shadow:0 10px 24px rgba(0,0,0,0.08);
          overflow:hidden;
        }
        .follow-card img{
          width:100%;
          height:210px;
          object-fit:cover;
          display:block;
        }

        /* bulatan dekorasi kiri / kanan */
        .follow-circle-left,
        .follow-circle-right{
          position:absolute;
          width:88px;
          height:88px;
          border-radius:50%;
          background:var(--brand-orange);
          z-index:0;
        }
        .follow-circle-left{
          left:40px;
          bottom:40px;
        }
        .follow-circle-right{
          right:40px;
          bottom:45px;
          background:#4a2e1b;
        }

        @media (max-width: 767px){
          .follow-card img{ height:160px; }
          .follow-circle-left,
          .follow-circle-right{ display:none; }
        }

        .testimonial-card {
          position: relative;
          background: #ffe7a3;
          border-radius: 18px;
          padding: 20px 24px 32px;
          box-shadow: 0 6px 16px rgba(0,0,0,0.08);
          max-width: 320px;
        }
        .testimonial-card::before {
          /* efek lipatan di pojok kiri atas */
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 60%);
          border-top-left-radius: 18px;
        }
        .testimonial-quote-icon {
          position: absolute;
          top: -16px;
          right: -8px;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: #f08b2d;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 30px;
          font-weight: 700;
          box-shadow: 0 4px 10px rgba(0,0,0,0.18);
        }
        .testimonial-text {
          font-size: 13px;
          line-height: 1.6;
          color: #5c4327;
          margin-bottom: 14px;
          margin-top: 4px;
        }
        .testimonial-separator {
          border: none;
          border-top: 1px solid rgba(0,0,0,0.15);
          margin: 8px 0 10px;
        }
        .testimonial-name {
          font-weight: 700;
          font-size: 14px;
          color: #4a2e1b;
        }
        .testimonial-role {
          font-size: 11px;
          text-transform: uppercase;
          color: #e17b1c;
          letter-spacing: 0.04em;
        }
        .testimonial-rating-label {
          font-size: 11px;
          color: #6c6c6c;
        }
        .testimonial-rating-value {
          font-size: 22px;
          font-weight: 700;
          color: #4a2e1b;
          line-height: 1;
        }
        .testimonial-stars {
          font-size: 13px;
          color: #f4b000;
        }
        .testimonial-avatar {
          position: absolute;
          left: 22px;
          bottom: -28px;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          border: 4px solid #fff;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0,0,0,0.18);
        }
        .testimonial-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .work-section{
          background: linear-gradient(180deg,var(--brand-orange), #efb674);
          color: var(--brand-dark);
          overflow: hidden;
        }
        .work-kicker{
          text-transform: uppercase;
          font-size: 11px;
          letter-spacing: 0.16em;
          color: #ffe9c0;
          font-weight: 600;
        }
        .work-title{
          font-weight: 800;
          font-size: 32px;
          color: var(--brand-dark);
        }
        .work-steps-row{
          margin-top: 28px;
          gap: 18px;
        }
        .work-step{
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          max-width: 180px;
        }
        .work-step-circle-wrap{
          position: relative;
          margin-bottom: 14px;
        }
        .work-step-badge{
          position: absolute;
          top: -10px;
          left: -6px;
          width: 26px;
          height: 26px;
          border-radius: 999px;
          background: #000;
          color: #fff;
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          box-shadow: 0 4px 10px rgba(0,0,0,0.25);
        }
        .work-step-circle{
          width: 108px;
          height: 108px;
          border-radius: 50%;
          background: #ffe339;
          border: 6px solid #262626;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 18px rgba(0,0,0,0.18);
        }
        .work-step-icon{
          font-size: 34px;
        }
        .work-step-title{
          font-weight: 800;
          font-size: 18px;
          margin-bottom: 4px;
        }
        .work-step-text{
          font-size: 13px;
          line-height: 1.6;
          color: #3f2b16;
        }

        /* bagian kanan (gambar brownies + bubble call) */
        .work-right{
          position: relative;
        }
        .work-call-bubble{
          position: absolute;
          top: -18px;
          right: 12%;
          transform: translateY(-10px);
          background: #1c8f3a;
          color: #fff;
          padding: 10px 18px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.22);
        }
        .work-call-icon{
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #0f6926;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }
        .work-call-label{
          text-transform: uppercase;
          font-size: 10px;
          opacity: .9;
        }
        .work-call-phone{
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.06em;
        }
        .work-call-dotted{
          position: absolute;
          top: 20px;
          right: 35%;
          width: 120px;
          height: 80px;
          border: 2px dashed rgba(255,255,255,0.7);
          border-color: rgba(255,255,255,0.7) transparent transparent transparent;
          border-radius: 80% 80% 0 0;
        }
        .work-cake-img{
          max-width: 360px;
          width: 100%;
          filter: drop-shadow(0 18px 28px rgba(0,0,0,0.35));
        }

        @media (max-width: 991px){
          .work-right{ margin-top:40px; }
          .work-call-bubble{
            right: 50%;
            transform: translate(50%,-10px);
          }
          .work-call-dotted{ display:none; }
        }
      `}</style>

      {/* HERO */}
      <header className="lola-hero d-flex align-items-center" style={{
        background: "#4a2d1a",
        padding: "80px 0",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background bentuk miring setengah (dibalik) */}
        <div
          style={{
            content: "''",
            position: "absolute",
            top: 0,
            right: 0,
            width: "30%",
            height: "100%",
            background: "#fff",
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 100%)",
            zIndex: 1,
          }}
        ></div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="row align-items-center">
            <div className="col-lg-7 text-white">
              <h1 className="hero-title" style={{ fontWeight: 700, lineHeight: "1.2" }}>
                Kue Lezat, <span style={{ color: "var(--accent)" }}>Langsung</span> dari Oven
                untuk Anda!
              </h1>
              <p className="hero-sub mt-3" style={{ fontSize: "1.1rem" }}>
                Lifestyle Bakery Dengan Varian Produk Terbanyak dan Jaminan Kualitas Produk &
                Layanan.
              </p>
              <button className="cta-btn mt-4">Pesan Sekarang</button>
            </div>

          </div>
        </div>
            <div className="col-lg-5 text-end">
              <img
                src="src/assets/homepage/pic1_hero.png"
                alt="roll"
                style={{ maxWidth: "420px", borderRadius: 24, position: "relative", zIndex: 2 }}
              />
            </div>
      </header>

      {/* BEST SELLER SECTION */}
      <section className="py-5">
        <div className="container">
          <div className="row gy-4 align-items-center">
            <div className="col-lg-4">
              <h6 className="text-uppercase text-muted">Favorit Sepanjang Waktu</h6>
              <h2 className="mb-4" style={{color: 'var(--brand-dark)'}}>Best Seller</h2>

              <div className="list-group best-list">
                {products.map(p => (
                  <button
                    key={p.id}
                    className={`list-group-item list-group-item-action ${p.id === activeId ? 'active' : ''}`}
                    onClick={() => setActiveId(p.id)}
                    type="button"
                    aria-pressed={p.id === activeId}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="col-lg-4 text-center">
              <div className="product-preview">
                <img src={activeProduct.img} alt={activeProduct.name} style={{width:220,height:220,objectFit:'cover',borderRadius:160,boxShadow:'0 12px 30px rgba(0,0,0,0.15)'}}/>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="product-card">
                <h4 style={{color: 'var(--brand-dark)'}}>{activeProduct.name}</h4>
                <p className="text-muted">{activeProduct.desc}</p>
                <ul className="mb-3">
                  {activeProduct.features.map((f, idx) => <li key={idx}>{f}</li>)}
                </ul>
                <p className="h4 text-danger">{activeProduct.price}</p>
                <button className="btn btn-dark rounded-pill">Product</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-section bg-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="">
              <h6 className="text-muted">Mengapa Memilih Kami?</h6>
              <h3 className="why-title">Kualitas Premium, Rasa Yang Bikin Senyum</h3>
              <p className="text-muted">Kami menghadirkan kue premium buatan tangan yang lembut, nikmat, dan dibuat dengan perhatian pada setiap detail. Karena bagi kami, kualitas terbaik adalah bentuk kasih sayang untuk pelanggan kami.</p>
              <div className="row mt-4">
                <div className="col-md-4">
                  <div className="feature-box d-flex align-items-start">
                    <img src="/assets/bread.png" alt="Kue Segar" className="me-3" style={{width:40, height:40}} />
                    <div>
                      <h6>Kue Segar Setiap Hari</h6>
                      <small className="text-muted">
                        Kami memanggang setiap kue dengan bahan segar pilihan dan resep khas Lola Cake.
                      </small>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="feature-box d-flex align-items-start">
                    <img src="/assets/handmade.png" alt="Handmade" className="me-3" style={{width:40, height:40}} />
                    <div>
                      <h6>Rasa Premium Handmade</h6>
                      <small className="text-muted">
                        Setiap potongan kue dibuat dengan tangan penuh cinta, bukan dari pabrik.
                      </small>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="feature-box d-flex align-items-start">
                    <img src="/assets/trophy.png" alt="Dipercaya" className="me-3" style={{width:40, height:40}} />
                    <div>
                      <h6>Dipercaya Banyak Pelanggan</h6>
                      <small className="text-muted">
                        Ratusan pelanggan telah jatuh cinta pada kelezatan Lola Cake.
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 d-flex align-items-center">
                <Link to="/about-us" className="btn btn-dark rounded-3 me-4 px-5">
                  More About Us
                </Link>
                <div>
                  <h6 className="mb-0">Team Lola Cake</h6>
                  <small className="text-muted">
                    Kepuasan Dan Senyum Pelanggan Adalah Kebahagiaan Terbesar Kami
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testi">
        <div className="container">
          <h3 className="why-title text-center" style={{color:'var(--brand-dark)'}}>Apa Kata Mereka?</h3>
          <p className="text-center text-muted">Cerita manis dari pelanggan yang jatuh cinta pada rasa Lola Cake.</p>

          <div className="row mt-4 g-4 justify-content-center">
            <div className="col-md-6">
              <div className="testimonial-card">
                <div className="testimonial-quote-icon">“</div>
                <p className="testimonial-text">
                  “Proses pemesanan sangat mudah, admin sabar bantu pilih ukuran dan
                  varian. Kue datang tepat waktu dengan packaging aman. Rasa kuenya moist
                  dan manisnya pas, Worth it!”
                </p>
                <hr className="testimonial-separator" />
                <div className="d-flex align-items-end">
                  <div>
                    <div className="testimonial-name">Ananditha S.</div>
                    <div className="testimonial-role">Senior Consultant</div>
                  </div>
                  <div className="ms-auto text-end">
                    <div className="testimonial-rating-label">Ratings &amp; Reviews</div>
                    <div className="testimonial-rating-value">5.0</div>
                    <div className="testimonial-stars">★★★★★</div>
                  </div>
                </div>
                <div className="testimonial-avatar">
                  <img src="/assets/user1.jpg" alt="Ananditha S." />
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="testimonial-card">
                <div className="testimonial-quote-icon">“</div>
                <p className="testimonial-text">
                  “Proses pemesanan sangat mudah, admin sabar bantu pilih ukuran dan
                  varian. Kue datang tepat waktu dengan packaging aman. Rasa kuenya moist
                  dan manisnya pas, Worth it!”
                </p>
                <hr className="testimonial-separator" />
                <div className="d-flex align-items-end">
                  <div>
                    <div className="testimonial-name">Ananditha S.</div>
                    <div className="testimonial-role">Senior Consultant</div>
                  </div>
                  <div className="ms-auto text-end">
                    <div className="testimonial-rating-label">Ratings &amp; Reviews</div>
                    <div className="testimonial-rating-value">5.0</div>
                    <div className="testimonial-stars">★★★★★</div>
                  </div>
                </div>
                <div className="testimonial-avatar">
                  <img src="/assets/user1.jpg" alt="Ananditha S." />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="work-section py-5">
        <div className="container py-4">
          <div className="row align-items-center">
            {/* KIRI: teks + 3 langkah */}
            <div className="col-lg-8 mb-4 mb-lg-0">
              <div className="work-kicker mb-2">
                PESAN DI LOLA CAKE HANYA 3 LANGKAH
              </div>
              <h2 className="work-title mb-4">Cara Kami Bekerja</h2>

              <div className="d-flex flex-wrap work-steps-row">
                {/* Step 1 */}
                <div className="work-step me-lg-4 mb-4 mb-lg-0">
                  <div className="work-step-circle-wrap">
                    <div className="work-step-badge">1</div>
                    <div className="work-step-circle">
                      <span className="work-step-icon">📋</span>
                    </div>
                  </div>
                  <div className="work-step-title">Lihat Product</div>
                  <p className="work-step-text">
                    Jelajahi pilihan kue dan paket Lola Cake yang dibuat dari
                    bahan segar dan cita rasa rumahan.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="work-step me-lg-4 mb-4 mb-lg-0">
                  <div className="work-step-circle-wrap">
                    <div className="work-step-badge">2</div>
                    <div className="work-step-circle">
                      <span className="work-step-icon">🍽️</span>
                    </div>
                  </div>
                  <div className="work-step-title">Pilih Pesanan</div>
                  <p className="work-step-text">
                    Tentukan varian, ukuran, dan jenis kue sesuai seleramu.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="work-step">
                  <div className="work-step-circle-wrap">
                    <div className="work-step-badge">3</div>
                    <div className="work-step-circle">
                      <span className="work-step-icon">🚚</span>
                    </div>
                  </div>
                  <div className="work-step-title">Pesan &amp; Nikmati</div>
                  <p className="work-step-text">
                    Pesan lewat WhatsApp atau website, lalu tunggu pesanan
                    lezatmu diantar ke rumah atau ambil langsung!
                  </p>
                </div>
              </div>
            </div>

            {/* KANAN: gambar brownies + bubble telpon */}
            <div className="col-lg-4 work-right text-center">
              <div className="work-call-dotted" />
              <div className="work-call-bubble">
                <div className="work-call-icon">📞</div>
                <div>
                  <div className="work-call-label">How to Order?</div>
                  <div className="work-call-phone">CALL US: 0852-4193-1688</div>
                </div>
              </div>

              <img
                src="src/assets/homepage/pic3_cara kami bekerja.png"
                alt="Brownies Lola Cake"
                className="work-cake-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOLLOW / GALLERY */}
      <section className="follow-section">
        {/* bulatan dekorasi */}
        <div className="follow-circle-left" />
        <div className="follow-circle-right" />

        <div className="container text-center position-relative" style={{zIndex:1}}>
          <div className="follow-ig-badge">
            {/* pakai icon IG sederhana, nanti bisa ganti SVG */}
            <i className="bi bi-instagram" />{/* kalau nggak pakai bootstrap icons, bisa diganti teks "IG" */}
          </div>

          <h4 className="follow-title">
            Follow <span>Lola Cake</span>
          </h4>
          <p className="follow-subtext">
            Join our Instagram community for updates, special deals, and more
          </p>

          <div className="row follow-gallery-row gx-3 gy-3 justify-content-center">
            <div className="col-6 col-sm-3">
              <div className="follow-card">
                <img src="/assets/gallery1.jpg" alt="Lola Cake gallery 1" />
              </div>
            </div>
            <div className="col-6 col-sm-3">
              <div className="follow-card">
                <img src="/assets/gallery2.jpg" alt="Lola Cake gallery 2" />
              </div>
            </div>
            <div className="col-6 col-sm-3">
              <div className="follow-card">
                <img src="/assets/gallery3.jpg" alt="Lola Cake gallery 3" />
              </div>
            </div>
            <div className="col-6 col-sm-3">
              <div className="follow-card">
                <img src="/assets/gallery4.jpg" alt="Lola Cake gallery 4" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}