// src/pages/AboutUs.jsx
import React from "react";

export default function AboutUs() {
  const waNumber = "6285241931688"; // nomor internasional (0852... => 62852...)
  const openWhatsApp = () => {
    window.open(`https://wa.me/${waNumber}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="about-page">
      <style>{`
        :root{
          --brand-orange: #f08b2d;
          --brand-dark: #3d231d;
          --muted-bg: #fff8f1;
        }

        .about-hero{
          background-image: url('/assets/hero-baking.jpg');
          background-size: cover;
          background-position: center;
          color: white;
          padding: 76px 0;
          text-align: center;
        }
        .about-hero .container { position: relative; z-index: 2; }
        .about-hero::after{
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(61,35,29,0.45);
          z-index: 1;
        }
        .about-hero h1, .about-hero p { position: relative; z-index: 2; }

        .about-main { padding: 48px 0; }
        .about-content p { color: #4b403a; line-height: 1.7; }

        /* Sidebar cards */
        .store-card {
          border-radius: 12px;
          background: #fff;
          padding: 18px;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 8px 20px rgba(0,0,0,0.04);
        }
        .wa-card {
          border-radius: 12px;
          overflow: hidden;
          background: linear-gradient(180deg, #fff, #fff);
          box-shadow: 0 18px 48px rgba(240,139,45,0.08);
        }
        .wa-card .wa-cta {
          background: var(--brand-orange);
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 10px 18px;
        }

        /* Timeline */
        .timeline {
          margin-top: 48px;
        }
        .timeline .year {
          font-size: 44px;
          font-weight: 700;
          color: var(--brand-orange);
        }
        .timeline .item { padding-top: 8px; }

        /* Responsive tweaks */
        @media (max-width: 991px) {
          .about-hero { padding: 60px 12px; }
          .about-main { padding: 28px 0; }
        }
      `}</style>

      {/* HERO */}
      <section className="about-hero position-relative">
        <div className="container">
          <h1 className="display-6 fw-bold">Tentang Kami</h1>
          <p className="lead mt-3 mb-0" style={{ maxWidth: 920, margin: "0 auto" }}>
            Lola Cake
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="about-main">
        <div className="container">
          <div className="row gx-5">
            {/* Left: big content */}
            <div className="col-lg-8">
              <div className="about-content">
                <h3 className="mb-3">About Us</h3>
                <p>
                  Lola Cake berdiri sejak tahun 2011, berawal dari dapur rumah kecil di Kendari,
                  Sulawesi Tenggara. Semua dimulai dari tangan seorang ibu yang gemar membuat
                  homemade brownies untuk keluarga dan teman dekat. Seiring meningkatnya
                  permintaan pelanggan, pendiri pun mulai menyewa etalase kecil dan berjualan
                  kue secara langsung.
                </p>

                <p>
                  Melihat antusiasme pelanggan yang semakin besar, usaha tumbuh — dari stand kecil
                  menjadi toko kue yang menerima pesanan untuk berbagai acara. Lola Cake terus
                  menjaga komitmen pada kualitas: bahan terbaik, proses yang higienis, dan rasa
                  yang otentik seperti buatan rumah.
                </p>

                <h4 className="mt-4">Filosofi Kami</h4>
                <p className="text-muted">
                  \"Kami percaya setiap kue punya cerita — tentang kerja keras, rasa syukur,
                  dan kebahagiaan yang dibagikan.\" Setiap resep dikembangkan dengan hati, setiap
                  kemasan dirancang dengan kehangatan.
                </p>

                <h4 className="mt-4">Nilai Kami</h4>
                <ul>
                  <li><strong>Cinta & Ketulusan:</strong> Setiap kue dibuat seolah untuk keluarga sendiri.</li>
                  <li><strong>Kualitas & Kepercayaan:</strong> Bahan terbaik dan proses yang bersih.</li>
                  <li><strong>Inovasi & Lokal:</strong> Menggabungkan citarasa tradisional Indonesia dengan sentuhan modern.</li>
                  <li><strong>Kebahagiaan Pelanggan:</strong> Kepuasan pelanggan adalah kebanggaan terbesar kami.</li>
                </ul>

                {/* Timeline / Sejarah */}
                <div className="timeline">
                  <h5 className="text-muted">Our History</h5>
                  <h2 className="fw-bold">Sejarah Kami</h2>

                  <div className="row gy-4 mt-4">
                    <div className="col-md-3">
                      <div className="item">
                        <div className="year">2011</div>
                        <h6 className="mt-2">Awal Manis dari Dapur Rumah</h6>
                        <p className="text-muted small">Lola Cake lahir dari kecintaan seorang ibu terhadap dunia baking, memulai dari brownies rumahan.</p>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="item">
                        <div className="year">2016</div>
                        <h6 className="mt-2">Kemitraan Pertama</h6>
                        <p className="text-muted small">Perluasan distribusi dan partner agribisnis yang membantu skala produksi.</p>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="item">
                        <div className="year">2020</div>
                        <h6 className="mt-2">Berdirinya Toko Kue</h6>
                        <p className="text-muted small">Toko fisik pertama dibuka, layanan pemesanan lebih rapi dan terpadu.</p>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="item">
                        <div className="year">2025</div>
                        <h6 className="mt-2">Inovasi Digital & Ekspansi</h6>
                        <p className="text-muted small">Memperkenalkan pemesanan online dan pengembangan produk baru.</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right: sidebar */}
            <aside className="col-lg-4">
              <div className="mb-4 store-card">
                <h6 className="fw-bold">Gambaran Toko</h6>
                <hr />
                <div className="mb-2">
                  <strong>Jam Operasional</strong>
                  <div className="small text-muted">Senin - Sabtu : 08.00 - 20.00<br/>Minggu : 09.00 - 17.00</div>
                </div>

                <div className="mb-2">
                  <strong>Alamat</strong>
                  <div className="small text-muted">Jl. Sapati No.19, Kendari, Sulawesi Tenggara</div>
                </div>

                <div className="mb-2">
                  <strong>Harga</strong>
                  <div className="small text-muted">Rp3.000 - Rp500.000</div>
                </div>

                <div className="mb-2">
                  <strong>Pengantaran</strong>
                  <div className="small text-muted">Delivery & Pick Up</div>
                </div>
              </div>

              <div className="wa-card mt-3">
                <div className="row g-0 align-items-center">
                  <div className="col-5">
                    <img src="/assets/wa-cake.png" alt="WhatsApp" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div className="col-7 p-3">
                    <h6 className="fw-bold">Stay Connected with Lola Cake via WhatsApp</h6>
                    <p className="small text-muted">Yuk ngobrol untuk pesanan, promo, atau menu terbaru!</p>
                    <div className="d-grid">
                      <button onClick={openWhatsApp} className="wa-cta">Chat Sekarang</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* optional: additional contact / badges */}
              <div className="mt-4 text-center text-muted small">
                <div><img src="/assets/halal-badge.png" alt="halal" style={{height:36}} /></div>
                <div className="mt-2">&copy; Lola Cake</div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
