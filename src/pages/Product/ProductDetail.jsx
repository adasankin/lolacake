import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Popup from "../../components/Popup";
import ToastBanner from "../../components/ToastBanner";
import { slugify } from "../../lib/slugify";

const SAMPLE_PRODUCTS = [
  {
    id: "p1",
    name: "Bolu Keju",
    title: "Bolu Keju",
    category: "cake",
    price: 75000,
    img: "../../assets/homepage/best_zebra.png",
    sold: 120,
    stock: 850,
    createdAt: "2024-10-01",
    description: `
Bolu Keju Lola Cake adalah perpaduan sempurna antara kelembutan bolu dan gurihnya keju premium. 
Dibuat dari butter berkualitas, telur segar, dan parutan keju melimpah di bagian atas maupun di dalam adonan.

• Tekstur lembut dan moist, tidak mudah kering  
• Cocok untuk acara keluarga, arisan, maupun hampers  
• Dapat disimpan 3 hari suhu ruang, 5–6 hari di dalam kulkas (dalam wadah tertutup rapat)

*Rekomendasi saji:* paling nikmat dinikmati dengan teh atau kopi hangat.
    `,
    reviews: [
      {
        id: 1,
        name: "Dian Nurdiansyah",
        avatar: "/assets/user1.jpg",
        rating: 5,
        date: "2 hari lalu",
        text: "Pertama kali beli Bolu Keju di Lola Cake dan langsung jatuh cinta! Teksturnya lembut, rasa kejunya berasa banget, dan tidak bikin eneg.",
      },
      {
        id: 2,
        name: "Ayu",
        avatar: "/assets/user2.jpg",
        rating: 5,
        date: "5 hari lalu",
        text: "Sudah beberapa kali repeat order, rasanya selalu konsisten. Favorit keluarga kalau ada tamu datang.",
      },
      {
        id: 3,
        name: "Rizky",
        avatar: "/assets/user3.jpg",
        rating: 4,
        date: "1 minggu lalu",
        text: "Suka banget sama aroma butternya. Anak-anak paling suka bagian keju yang tebal di atasnya.",
      },
    ],
  },
  {
    id: "p2",
    name: "Bolu Zebra",
    title: "Bolu Zebra",
    category: "cake",
    price: 75000,
    img: "/assets/bolu-zebra.png",
    sold: 210,
    stock: 540,
    createdAt: "2024-09-10",
    description: `
Bolu Zebra Lola Cake memiliki motif garis coklat dan vanilla yang cantik ketika dipotong. 
Perpaduan rasa coklat dan vanilla-nya seimbang, tidak terlalu manis sehingga cocok untuk semua usia.

• Motif zebra cantik, cocok untuk suguhan tamu  
• Tekstur empuk dan tidak mudah hancur saat dipotong  
• Ideal untuk snack meeting, acara kantor, atau bingkisan

*Tips simpan:* simpan dalam wadah tertutup agar tetap lembut hingga 3 hari.
    `,
    reviews: [
      {
        id: 1,
        name: "Mira",
        avatar: "/assets/user2.jpg",
        rating: 5,
        date: "3 hari lalu",
        text: "Motifnya cantik banget, tamu pada suka. Rasanya juga lembut dan tidak terlalu manis.",
      },
      {
        id: 2,
        name: "Andre",
        avatar: "/assets/user1.jpg",
        rating: 4,
        date: "1 minggu lalu",
        text: "Pesan untuk rapat kantor, semua bilang enak. Packaging rapi dan mudah dipotong.",
      },
    ],
  },
  {
    id: "p3",
    name: "Bolu Pandan",
    title: "Bolu Pandan",
    category: "cake",
    price: 75000,
    img: "/assets/bolu-pandan.png",
    sold: 90,
    stock: 320,
    createdAt: "2024-11-05",
    description: `
Bolu Pandan Lola Cake menghadirkan aroma pandan wangi dengan rasa manis yang lembut. 
Menggunakan ekstrak pandan dan santan pilihan untuk menciptakan cita rasa khas kue tradisional.

• Wangi pandan yang menenangkan  
• Cocok untuk teman minum teh sore hari  
• Bisa dipotong kecil untuk snack box

*Catatan:* warna hijau berasal dari ekstrak pandan & pewarna food grade yang aman.
    `,
    reviews: [
      {
        id: 1,
        name: "Sinta",
        avatar: "/assets/user3.jpg",
        rating: 5,
        date: "4 hari lalu",
        text: "Aromanya bikin nostalgia jajanan masa kecil. Tidak terlalu manis, pas banget.",
      },
      {
        id: 2,
        name: "Dedi",
        avatar: "/assets/user1.jpg",
        rating: 4,
        date: "2 minggu lalu",
        text: "Tekstur lembut dan wangi pandan kuat. Anak-anak di rumah suka sekali.",
      },
    ],
  },
  {
    id: "p4",
    name: "Bolu Gula Merah",
    title: "Bolu Gula Merah",
    category: "cake",
    price: 75000,
    img: "/assets/bolu-gula.png",
    sold: 60,
    stock: 200,
    createdAt: "2024-07-21",
    description: `
Bolu Gula Merah menggunakan gula aren pilihan sehingga menghasilkan rasa manis karamel yang khas. 
Teksturnya padat namun tetap lembut, cocok untuk pecinta kue tradisional.

• Rasa gula merah khas, tidak bikin seret  
• Cocok dijadikan hantaran atau buah tangan  
• Manisnya pas, tidak berlebihan

*Rekomendasi:* enak disajikan hangat dengan teh tawar atau kopi hitam.
    `,
    reviews: [
      {
        id: 1,
        name: "Nadia",
        avatar: "/assets/user2.jpg",
        rating: 5,
        date: "1 hari lalu",
        text: "Rasa gula merahnya berasa banget, wangi dan manisnya pas. Orang tua saya suka!",
      },
    ],
  },
  {
    id: "p5",
    name: "Bolu Gulung",
    title: "Bolu Gulung",
    category: "cake",
    price: 75000,
    img: "/assets/bolu-gulung.png",
    sold: 45,
    stock: 150,
    createdAt: "2024-06-12",
    description: `
Bolu Gulung dengan isian selai manis legit, dilapis dengan bolu lembut yang digulung rapi. 
Cocok untuk camilan keluarga atau suguhan arisan.

• Isian selai melimpah, tidak pelit  
• Potongan rapi, mudah disajikan  
• Cocok untuk snack box dan hampers

Tersedia beberapa varian isi (sesuai ketersediaan di toko).
    `,
    reviews: [
      {
        id: 1,
        name: "Rani",
        avatar: "/assets/user1.jpg",
        rating: 4,
        date: "3 hari lalu",
        text: "Selainya banyak dan tidak terlalu manis, tekstur bolunya empuk.",
      },
    ],
  },
  {
    id: "p6",
    name: "Brownies Coklat",
    title: "Brownies Coklat",
    category: "cake",
    price: 75000,
    img: "/assets/brownies.png",
    sold: 300,
    stock: 420,
    createdAt: "2024-11-01",
    description: `
Brownies Coklat Lola Cake punya tekstur fudgy di dalam dan sedikit crust di bagian atas. 
Menggunakan coklat berkualitas sehingga rasa coklatnya pekat dan nagih.

• Cocok untuk pecinta coklat  
• Pas jadi dessert atau hampers  
• Bisa dihangatkan sebentar sebelum disajikan

*Tips:* enak dipadukan dengan es krim vanilla.
    `,
    reviews: [
      {
        id: 1,
        name: "Fajar",
        avatar: "/assets/user3.jpg",
        rating: 5,
        date: "5 hari lalu",
        text: "Coklatnya berasa banget, teksturnya fudgy. Ini brownies favorit saya sekarang.",
      },
      {
        id: 2,
        name: "Lia",
        avatar: "/assets/user2.jpg",
        rating: 5,
        date: "2 minggu lalu",
        text: "Saya pesan untuk ulang tahun, tamu banyak yang tanya pesan di mana.",
      },
    ],
  },
  {
    id: "pk1",
    name: "Tumpeng Nasi Kuning",
    title: "Tumpeng Nasi Kuning",
    category: "makanan",
    price: 350000,
    img: "/assets/tumpeng.png",
    sold: 50,
    stock: 10,
    createdAt: "2024-09-01",
    description: `
Tumpeng Nasi Kuning lengkap dengan lauk pauk khas Lola Cake. 
Cocok untuk syukuran, ulang tahun, atau acara kantor.

Porsi ±10–12 orang (tergantung konsumsi).  
Lauk standar: ayam goreng, perkedel, mie goreng, telur balado, sambal, lalapan, dan pelengkap lain (dapat menyesuaikan paket).
    `,
    reviews: [
      {
        id: 1,
        name: "Hendra",
        avatar: "/assets/user1.jpg",
        rating: 5,
        date: "1 minggu lalu",
        text: "Pesan untuk acara kantor, tampilannya cantik dan rasanya enak. Semua puas.",
      },
    ],
  },
  {
    id: "pk2",
    name: "Tampah Nasi Liwet",
    title: "Tampah Nasi Liwet",
    category: "makanan",
    price: 350000,
    img: "/assets/tampah-liwet.png",
    sold: 30,
    stock: 15,
    createdAt: "2024-08-15",
    description: `
Tampah Nasi Liwet dengan lauk komplit, cocok untuk makan bersama keluarga atau teman. 
Disajikan di atas tampah dengan alas daun pisang sehingga terasa lebih tradisional.

Porsi ±8–10 orang.
    `,
    reviews: [
      {
        id: 1,
        name: "Yuni",
        avatar: "/assets/user3.jpg",
        rating: 5,
        date: "3 hari lalu",
        text: "Nasi liwetnya wangi banget, lauknya banyak dan lengkap. Recommended buat kumpul keluarga.",
      },
    ],
  },
];
// ===========================================

function getUser() {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch {
    return null;
  }
}

export default function ProductDetail({ type = "satuan" }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("desc"); // 'desc' | 'review'
  const [qty, setQty] = useState(1);

  // Popup & toast
  const [popup, setPopup] = useState({ open: false });
  const [toast, setToast] = useState({ open: false, message: "" });
  const showPopup = (p) => setPopup({ open: true, ...p });
  const closePopup = () => setPopup((s) => ({ ...s, open: false }));
  const user = useMemo(() => getUser(), []);
  const isGuest = !user;

  // Ambil produk berdasarkan slug
  useEffect(() => {
    let alive = true;
    (async () => {
      const [slugPart, idMaybe] = String(slug || "").split("--");

      let found = idMaybe
        ? SAMPLE_PRODUCTS.find((p) => p.id === idMaybe)
        : SAMPLE_PRODUCTS.find(
            (p) => slugify(p.name || p.title) === slugPart
          );

      if (!found) {
        navigate(`/product/${type}`);
      } else if (alive) {
        setProduct(found);
      }
    })();
    return () => {
      alive = false;
    };
  }, [slug, type, navigate]);

  const addToCartLocal = () => {
    const key = "lola_cart";
    const raw = localStorage.getItem(key);
    const cart = raw ? JSON.parse(raw) : [];
    const index = cart.findIndex((i) => i.id === product.id);
    if (index >= 0) cart[index].qty += qty;
    else
      cart.push({
        id: product.id,
        name: product.name || product.title,
        price: product.price,
        qty,
      });
    localStorage.setItem(key, JSON.stringify(cart));
    try { window.dispatchEvent(new Event("cart-changed")); } catch {}
  };

  const handleAddToCart = () => {
    if (isGuest) {
      return showPopup({
        type: "error",
        message: "Silahkan login terlebih dahulu",
        okText: "Kembali Halaman Login",
        onOk: () => {
          closePopup();
          window.location.href = "/login";
        },
      });
    }
    addToCartLocal();
    setToast({
      open: true,
      message: "Produk berhasil ditambahkan ke daftar Lola Cake.",
    });
  };

  const handleBuyNow = () => {
    if (isGuest) {
      return showPopup({
        type: "error",
        message: "Silahkan login terlebih dahulu",
        okText: "Kembali Halaman Login",
        onOk: () => {
          closePopup();
          window.location.href = "/login";
        },
      });
    }
    window.location.href = "/checkout";
  };

  if (!product) return null;

  const productName = product.name || product.title;
  const reviews = product.reviews || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-4">
      <style>{`
        :root{--brand:#f08b2d; --dark:#3d231d;}
        .pd-breadcrumb{font-size:13px;color:#777}
        .pd-title{font-weight:800;color:var(--dark)}
        .tab-btn{background:none;border:none;font-weight:700;color:#444;padding:8px 0;margin-right:18px;border-bottom:2px solid transparent}
        .tab-btn.active{color:var(--brand);border-bottom-color:var(--brand)}
        .order-card{border:1px solid rgba(0,0,0,.08);border-radius:12px;padding:16px}
        .qty-btn{width:30px;height:30px;display:inline-flex;align-items:center;justify-content:center;border:1px solid #ddd;border-radius:6px;background:#fff}
        .qty-input{width:48px;text-align:center;border:1px solid #ddd;border-radius:6px;height:30px}
        .btn-brand{background:var(--brand);color:#fff}
      `}</style>

      <div className="pd-breadcrumb mb-2">
        <a href="/">Home</a> &gt; <a href="/product">Product</a> &gt; <a href={`/product/${type}`}>{type === "satuan" ? "Item Satuan" : "Paketan"}</a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Kiri: gambar + ratings */}
        <div className="lg:col-span-4">
          <img
            src={product.img}
            alt={productName}
            className="img-fluid rounded mb-3"
          />
          <div>
            <div className="fw-bold mb-2">Ratings & Reviews</div>
            <div className="h3">5.0</div>
            <div className="small text-muted mb-2">★★★★★</div>
            {[5, 4, 3, 2, 1].map((v, i) => (
              <div
                key={i}
                className="d-flex align-items-center gap-2 mb-1"
              >
                <div className="small" style={{ width: 14 }}>
                  {v}
                </div>
                <div
                  className="progress flex-grow-1"
                  style={{ height: 6 }}
                >
                  <div
                    className="progress-bar bg-warning"
                    style={{
                      width:
                        v === 5 ? "80%" : v === 4 ? "12%" : "2%",
                    }}
                  />
                </div>
                <div
                  className="small text-muted"
                  style={{ width: 24, textAlign: "right" }}
                >
                  {v === 5 ? 37 : v === 4 ? 5 : v === 3 ? 2 : v === 2 ? 1 : 0}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tengah: detail */}
        <div className="lg:col-span-5">
          <h3 className="pd-title mb-2">{productName}</h3>
          <div className="small text-muted mb-2">
            <span className="me-3">4.9 ★</span>
            <span className="me-3">2.5k Reviews</span>
            <span>{product.sold} Sold</span>
          </div>

          {/* Tabs */}
          <div className="mb-2">
            <button
              className={`tab-btn ${
                activeTab === "desc" ? "active" : ""
              }`}
              onClick={() => setActiveTab("desc")}
            >
              Description
            </button>
            <button
              className={`tab-btn ${
                activeTab === "review" ? "active" : ""
              }`}
              onClick={() => setActiveTab("review")}
            >
              Review
            </button>
          </div>

          {activeTab === "desc" ? (
            <div
              className="text-muted"
              style={{ lineHeight: 1.7, whiteSpace: "pre-line" }}
            >
              {product.description}
            </div>
          ) : (
            <div className="reviews-list">
              {reviews.length === 0 && (
                <div className="text-muted small">
                  Belum ada review untuk produk ini.
                </div>
              )}

              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="d-flex gap-3 mb-3 p-2 rounded border"
                >
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    width={48}
                    height={48}
                    className="rounded-circle"
                    style={{ objectFit: "cover" }}
                  />
                  <div>
                    <div className="fw-semibold">{rev.name}</div>
                    <div style={{ color: "#f5a300" }}>
                      {"★".repeat(rev.rating)}
                      {"☆".repeat(5 - rev.rating)}
                    </div>
                    <div className="small text-muted">{rev.date}</div>
                    <div className="mt-1 small text-dark">
                      {rev.text}
                    </div>
                  </div>
                </div>
              ))}

              <button className="btn btn-outline-secondary mt-3">
                Leave review and rate
              </button>
            </div>
          )}
        </div>

        {/* Kanan: Atur Pesanan */}
        <div className="lg:col-span-3">
          <div className="order-card">
            <div className="d-flex align-items-center gap-2 mb-2">
              <img
                src={product.img}
                alt=""
                width={48}
                height={48}
                className="rounded"
              />
              <div className="small text-muted">Selected Size</div>
            </div>

            <div className="d-flex align-items-center gap-2 mb-2">
              <button
                className="qty-btn"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={isGuest}
              >
                −
              </button>
              <input className="qty-input" value={qty} readOnly />
              <button
                className="qty-btn"
                onClick={() => setQty((q) => q + 1)}
                disabled={isGuest}
              >
                +
              </button>
              <div className="ms-auto small text-muted">
                Stock: <strong>{product.stock ?? "-"}</strong>
              </div>
            </div>

            <div className="small text-muted mb-1">Total Price:</div>
            <div className="h5 mb-3">
              Rp{product.price.toLocaleString("id-ID")}
            </div>

            <button
              className="btn btn-brand w-100 mb-2"
              onClick={handleBuyNow}
            >
              Buy now
            </button>
            <button
              className="btn btn-outline-success w-100"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>

            <div className="d-flex justify-content-between small mt-3">
              <button className="btn btn-link p-0">Chat Seller</button>
              <button className="btn btn-link p-0">Share Product</button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast & Popup */}
      <ToastBanner
        open={toast.open}
        message={toast.message}
        onClose={() => setToast({ open: false, message: "" })}
      />
      <Popup {...popup} />
    </div>
  );
}
