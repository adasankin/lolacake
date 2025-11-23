import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Popup from "../../components/Popup";
import ToastBanner from "../../components/ToastBanner";
import { useNavigate } from "react-router-dom";

function readUser() {
  try { return JSON.parse(localStorage.getItem("user")) || null; }
  catch { return null; }
}
const saveUser = (u) => localStorage.setItem("user", JSON.stringify(u));

export default function AccountPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useMemo(() => readUser(), []);
  const [tab, setTab] = useState("akun"); // akun | orders | history | logout

  const [profile, setProfile] = useState({
    fullName: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
    verified: false,
    avatar: localStorage.getItem("lola_avatar") || "",
  });

  const [pwd, setPwd] = useState({ old: "", next: "", confirm: "" });
  const [toast, setToast] = useState({ open: false, message: "" });
  const [popup, setPopup] = useState({ open: false });
  const [statusBanner, setStatusBanner] = useState(null); // success / error banner
  const fileRef = useRef();

  // ===== Dummy data untuk "Pesanan saya" & Riwayat =====
  const SAMPLE_ACTIVE_ORDERS = [
    {
      id: "ORD-1",
      code: "#3478FCHVKGO",
      type: "Self Pick Up",
      items: [
        { name: "Bolu Keju x2" },
        { name: "Bolu Zebra x2" },
      ],
      total: 280000,
      status: "unpaid",          // unpaid | processing | ready | delivering
      badgeText: "Menunggu pembayaran",
      badgeTone: "warning",
      date: "22 Okt 2025",
      bottomText: "Bayar sebelum 30 Oktober 2025, pukul 23.59",
      bottomType: "danger",      // warna teks merah kecil
      actions: ["Batalkan pesanan", "Bayar sekarang"],
    },
    {
      id: "ORD-2",
      code: "#3478FCHVKGO",
      type: "Self Pick Up",
      items: [{ name: "Bolu Keju" }],
      total: 75000,
      status: "unpaid",
      badgeText: "Menunggu pembayaran",
      badgeTone: "warning",
      date: "05 May 2025",
      bottomText: "Bayar sebelum 30 Oktober 2025, pukul 23.59",
      bottomType: "danger",
      actions: ["Batalkan pesanan", "Hubungi Kontak"],
    },
    {
      id: "ORD-3",
      code: "#3478FCHVKGO",
      type: "Self Pick Up",
      items: [{ name: "Bolu Keju" }],
      total: 75000,
      status: "processing",
      badgeText: "Sedang Diproses",
      badgeTone: "info",
      date: "30 Okt 2025",
      bottomText:
        "Estimasi siap diambil 1–2 hari kerja setelah pembayaran dikonfirmasi.",
      bottomType: "muted",
      actions: ["Hubungi Toko"],
    },
    {
      id: "ORD-4",
      code: "#3478FCHVKGO",
      type: "Self Pick Up",
      items: [{ name: "Bolu Keju" }],
      total: 75000,
      status: "ready",
      badgeText: "Siap Diambil",
      badgeTone: "success",
      date: "05 May 2025",
      bottomText: "Ambil di jam operasional (08.00 – 17.00 WIB)",
      bottomType: "success",
      actions: ["Hubungi Toko"],
    },
    {
      id: "ORD-5",
      code: "#3478FCHVKGO",
      type: "Delivery",
      items: [{ name: "Bolu Keju" }],
      total: 75000,
      status: "delivering",
      badgeText: "Siap Dikirim",
      badgeTone: "success",
      date: "05 May 2025",
      bottomText: "Ambil di jam operasional (08.00 – 17.00 WIB)",
      bottomType: "success",
      actions: ["Hubungi Toko"],
    },
  ];

  const SAMPLE_HISTORY = [
    {
      id: "HIST-1",
      code: "#3478FCHVKGO",
      type: "Self Pick Up",
      itemName: "Bolu Keju",
      total: 75000,
      date: "30 Okt 2025",
      status: "completed", // completed | canceled
      statusText: "Selesai",
      statusTone: "success",
      bottomText: "Tanggal Selesai: 31 Oktober 2025",
      bottomTone: "danger",
      actions: ["Pesan lagi", "Tulis Ulasan"],
    },
    {
      id: "HIST-2",
      code: "#3478FCHVKGO",
      type: "Self Pick Up",
      itemName: "Bolu Keju",
      total: 75000,
      date: "30 Okt 2025",
      status: "canceled",
      statusText: "Dibatalkan",
      statusTone: "danger",
      bottomText: "Pembayaran tidak dilakukan dalam 24 jam.",
      bottomTone: "danger",
      actions: ["Pesan Ulang"],
    },
  ];

  const [orderFilter, setOrderFilter] = useState("all"); // all | unpaid | processing | taken
  const [historyFilter, setHistoryFilter] = useState("done"); // done | canceled

  const filteredActiveOrders = SAMPLE_ACTIVE_ORDERS.filter((o) => {
    if (orderFilter === "all") return true;
    if (orderFilter === "unpaid") return o.status === "unpaid";
    if (orderFilter === "processing") return o.status === "processing";
    if (orderFilter === "taken") return o.status === "ready" || o.status === "delivering";
    return true;
  });

  const filteredHistory = SAMPLE_HISTORY.filter((o) =>
    historyFilter === "done" ? o.status === "completed" : o.status === "canceled"
  );

  // ====================================================
  useEffect(() => {
    if (!user) navigate("/login", { replace: true });
  }, [user, navigate]);

  useEffect(() => {
    const t = location.state?.tab;
    if (t === "orders" || t === "history" || t === "akun" || t === "logout") {
      setTab(t);
    }
  }, [location.state]);

  const showPopup = (p) => setPopup({ open: true, ...p });
  const closePopup = () => setPopup((s) => ({ ...s, open: false }));

  useEffect(() => {
    if (!statusBanner) return;
    const id = setTimeout(() => setStatusBanner(null), 4000);
    return () => clearTimeout(id);
  }, [statusBanner]);

  const onPickAvatar = () => fileRef.current?.click();
  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      localStorage.setItem("lola_avatar", base64);
      setProfile((p) => ({ ...p, avatar: base64 }));
      setToast({ open: true, message: "Foto profil berhasil diperbarui." });
    };
    reader.readAsDataURL(file);
  };

  const handleVerify = () => {
    showPopup({
      type: "success",
      title: null,
      message: "Tautan verifikasi telah dikirim ke email Anda (dummy).",
      okText: "OK",
      onOk: () => {
        closePopup();
        setProfile((p) => ({ ...p, verified: true }));
      },
    });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!pwd.old || !pwd.next || !pwd.confirm) {
      return showPopup({
        type: "error",
        message: "Lengkapi semua kolom.",
        okText: "OK",
        onOk: closePopup,
      });
    }
    if (pwd.next !== pwd.confirm) {
      return showPopup({
        type: "error",
        message: "Konfirmasi kata sandi tidak cocok.",
        okText: "OK",
        onOk: closePopup,
      });
    }
    // TODO: sambungkan ke backend
    setPwd({ old: "", next: "", confirm: "" });
    setToast({ open: true, message: "Kata sandi berhasil diperbarui." });
  };

  const doLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-changed"));
    navigate("/login", { replace: true });
  };

  const saveSimpleProfile = () => {
    try {
      const newUser = {
        ...user,
        username: profile.fullName,
        phone: profile.phone,
        email: profile.email,
      };
      saveUser(newUser);
      window.dispatchEvent(new Event("auth-changed"));
      setStatusBanner({ type: "success", message: "Profil berhasil diperbarui." });
    } catch (err) {
      console.error(err);
      setStatusBanner({ type: "error", message: "Terjadi kesalahan, coba lagi." });
    }
  };

  const isProfileComplete =
    !!profile.fullName && !!profile.email && !!profile.phone && profile.verified;

  return (
    <div className="container py-4">
      <style>{`
        :root{--brand:#f08b2d;--dark:#3d231d}
        .side{border:1px solid rgba(0,0,0,.08);border-radius:12px;overflow:hidden;background:#fff}
        .side a{display:flex;align-items:center;gap:10px;padding:14px 16px;color:#3d231d;text-decoration:none;border-bottom:1px solid rgba(0,0,0,.06)}
        .side a.active{background:#f7e9cf;font-weight:700}
        .cardx{border:1px solid rgba(0,0,0,.08);border-radius:12px;background:#fff}
        .banner{background:#f3f6fb;border:1px solid #d9e5ff;color:#31476c;border-radius:10px;padding:10px 12px}
        .btn-brand{background:var(--brand);color:#fff}
        .avatar{width:160px;height:160px;border-radius:12px;background:#eee;display:flex;align-items:center;justify-content:center;font-size:54px;color:#bbb}
        .field-row{display:flex;flex-direction:column;margin-bottom:10px}
        .pill{border-radius:22px}
        .status-pill{display:inline-flex;align-items:center;gap:8px;border-radius:999px;padding:8px 14px;font-size:14px;margin-bottom:12px}
        .status-pill.success{background:#e7f7e9;color:#256b36;border:1px solid #c8ebd1}
        .status-pill.error{background:#fdecee;color:#b3261e;border:1px solid #f3b8c2}
        .order-pill-row{display:flex;gap:10px;margin:10px 0 22px}
        .order-pill{border-radius:999px;border:1px solid #222;padding:6px 18px;font-size:14px;background:#fff;cursor:pointer}
        .order-pill.active{background:var(--brand);border-color:var(--brand);color:#fff}
        .order-card{border-radius:16px;border:1px solid rgba(0,0,0,.08);background:#fff;box-shadow:0 4px 12px rgba(0,0,0,.04);margin-bottom:18px;overflow:hidden}
        .order-card-header{display:flex;justify-content:space-between;align-items:center;padding:10px 18px;font-size:12px;border-bottom:1px solid rgba(0,0,0,.04)}
        .order-card-body{display:flex;gap:14px;padding:12px 18px}
        .order-img{width:70px;height:70px;border-radius:10px;object-fit:cover;background:#f5f5f5}
        .badge-soft{border-radius:999px;padding:4px 12px;font-size:11px}
        .badge-soft.warning{background:#fff3cd;color:#a07600}
        .badge-soft.info{background:#eaf4ff;color:#275193}
        .badge-soft.success{background:#e7f7e9;color:#256b36}
        .badge-soft.danger{background:#fdecee;color:#b3261e}
        .order-card-footer{padding:8px 18px 14px;font-size:11px;display:flex;justify-content:space-between;align-items:center}
        .txt-danger{color:#cc3d2f}
        .txt-muted{color:#777}
        .txt-success{color:#2f7a3f}
        .order-actions{display:flex;gap:8px}
        .order-actions .btn{font-size:12px;border-radius:999px;padding:4px 12px}
      `}</style>

      <h5 className="mb-2">Hi, <b>{profile.fullName || "Lola"}</b>!</h5>

      {statusBanner && (
        <div className={`status-pill ${statusBanner.type === "error" ? "error" : "success"}`}>
          <span>{statusBanner.type === "error" ? "✕" : "✓"}</span>
          <span>{statusBanner.message}</span>
        </div>
      )}

      {!isProfileComplete && !statusBanner && (
        <div className="banner mb-3">
          Lengkapi profil Anda dan verifikasi email untuk menyelesaikan pendaftaran.
        </div>
      )}

      <div className="row g-4">
        {/* Sidebar */}
        <div className="col-12 col-lg-3">
          <div className="side">
            <a
              href="#"
              className={tab === "akun" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                setTab("akun");
              }}
            >
              👤 Akun
            </a>
            <a
              href="#"
              className={tab === "orders" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                setTab("orders");
              }}
            >
              🧾 Pesanan saya
            </a>
            <a
              href="#"
              className={tab === "history" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                setTab("history");
              }}
            >
              ❤️ Riwayat pemesanan
            </a>
            <a
              href="#"
              className={tab === "logout" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                setTab("logout");
              }}
            >
              🚪 Keluar
            </a>
          </div>
        </div>

        {/* Konten utama */}
        <div className="col-12 col-lg-9">
          {/* TAB AKUN */}
          {tab === "akun" && (
            <>
              <div className="row g-3">
                <div className="col-12 col-md-4">
                  <div className="cardx p-3 d-flex align-items-center">
                    {profile.avatar ? (
                      <img
                        src={profile.avatar}
                        alt="avatar"
                        className="rounded"
                        style={{ width: 160, height: 160, objectFit: "cover" }}
                      />
                    ) : (
                      <div className="avatar">👤</div>
                    )}
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={onFileChange}
                    />
                    <button
                      className="btn btn-outline-secondary pill mt-3"
                      type="button"
                      onClick={onPickAvatar}
                    >
                      Tambahkan Foto
                    </button>
                  </div>
                </div>

                <div className="col-12 col-md-8">
                  <div className="cardx p-3">
                    <div className="mb-2 small text-muted">Full Name</div>
                    <input
                      className="form-control mb-2"
                      value={profile.fullName}
                      onChange={(e) =>
                        setProfile((p) => ({ ...p, fullName: e.target.value }))
                      }
                    />

                    <div className="mb-1 small text-muted">Email</div>
                    <div className="d-flex align-items-center gap-2">
                      <input
                        className="form-control"
                        value={profile.email}
                        onChange={(e) =>
                          setProfile((p) => ({ ...p, email: e.target.value }))
                        }
                      />
                      {!profile.verified ? (
                        <button
                          className="btn btn-outline-primary"
                          type="button"
                          onClick={handleVerify}
                        >
                          Verifikasi
                        </button>
                      ) : (
                        <span className="badge bg-success">Verified</span>
                      )}
                    </div>

                    <div className="mt-3 mb-1 small text-muted">Mobile Number</div>
                    <input
                      className="form-control mb-3"
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile((p) => ({ ...p, phone: e.target.value }))
                      }
                    />

                    <div className="text-end">
                      <button
                        className="btn btn-brand pill"
                        type="button"
                        onClick={saveSimpleProfile}
                      >
                        Simpan
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ubah kata sandi */}
              <div className="cardx p-3 mt-4">
                <h6 className="mb-3">Ubah Kata Sandi</h6>
                <form onSubmit={handleChangePassword}>
                  <div className="field-row">
                    <label className="small text-muted">Old Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={pwd.old}
                      onChange={(e) =>
                        setPwd((p) => ({ ...p, old: e.target.value }))
                      }
                    />
                  </div>
                  <div className="field-row">
                    <label className="small text-muted">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={pwd.next}
                      onChange={(e) =>
                        setPwd((p) => ({ ...p, next: e.target.value }))
                      }
                    />
                  </div>
                  <div className="field-row">
                    <label className="small text-muted">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={pwd.confirm}
                      onChange={(e) =>
                        setPwd((p) => ({ ...p, confirm: e.target.value }))
                      }
                    />
                  </div>
                  <button className="btn btn-brand pill mt-1" type="submit">
                    Simpan Perubahan
                  </button>
                </form>
              </div>
            </>
          )}

          {/* TAB PESANAN SAYA */}
          {tab === "orders" && (
            <div>
              <h4 className="mb-1">My Orders</h4>
              <div className="order-pill-row">
                <button
                  className={`order-pill ${orderFilter === "all" ? "active" : ""}`}
                  onClick={() => setOrderFilter("all")}
                >
                  Semua
                </button>
                <button
                  className={`order-pill ${
                    orderFilter === "unpaid" ? "active" : ""
                  }`}
                  onClick={() => setOrderFilter("unpaid")}
                >
                  Belum dibayar
                </button>
                <button
                  className={`order-pill ${
                    orderFilter === "processing" ? "active" : ""
                  }`}
                  onClick={() => setOrderFilter("processing")}
                >
                  Diproses
                </button>
                <button
                  className={`order-pill ${
                    orderFilter === "taken" ? "active" : ""
                  }`}
                  onClick={() => setOrderFilter("taken")}
                >
                  Diambil / Dikirim
                </button>
              </div>

              {filteredActiveOrders.map((o) => (
                <div key={o.id} className="order-card">
                  <div className="order-card-header">
                    <div>
                      <div>{o.code}</div>
                      <div className="text-muted"> {o.type}</div>
                    </div>
                    <div className="d-flex flex-column align-items-end gap-1">
                      <span
                        className={`badge-soft ${
                          o.badgeTone === "warning"
                            ? "warning"
                            : o.badgeTone === "info"
                            ? "info"
                            : o.badgeTone === "success"
                            ? "success"
                            : "danger"
                        }`}
                      >
                        {o.badgeText}
                      </span>
                      <span className="text-muted" style={{ fontSize: 11 }}>
                        {o.date}
                      </span>
                    </div>
                  </div>

                  <div className="order-card-body">
                    <div>
                      <div className="order-img">
                        {/* bisa diganti src gambar produk */}
                      </div>
                    </div>
                    <div>
                      {o.items.map((it, idx) => (
                        <div key={idx} style={{ fontSize: 13 }}>
                          {it.name}
                        </div>
                      ))}
                      <div className="mt-2" style={{ fontSize: 13 }}>
                        <span className="text-muted">Total Harga :</span>{" "}
                        <b>Rp {o.total.toLocaleString("id-ID")}</b>
                      </div>
                    </div>
                  </div>

                  <div className="order-card-footer">
                    <div
                      className={
                        o.bottomType === "danger"
                          ? "txt-danger"
                          : o.bottomType === "success"
                          ? "txt-success"
                          : "txt-muted"
                      }
                    >
                      {o.bottomText}
                    </div>
                    <div className="order-actions">
                      {o.actions.map((a) => (
                        <button
                          key={a}
                          type="button"
                          className={
                            a === "Bayar sekarang" || a === "Hubungi Toko"
                              ? "btn btn-warning"
                              : "btn btn-outline-secondary"
                          }
                          onClick={() => console.log(a)}
                        >
                          {a}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {filteredActiveOrders.length === 0 && (
                <div className="text-muted mt-3">Belum ada pesanan.</div>
              )}
            </div>
          )}

          {/* TAB RIWAYAT PEMESANAN */}
          {tab === "history" && (
            <div>
              <h4 className="mb-1">My Orders</h4>
              <div className="order-pill-row">
                <button
                  className={`order-pill ${
                    historyFilter === "done" ? "active" : ""
                  }`}
                  onClick={() => setHistoryFilter("done")}
                >
                  Pesanan Selesai
                </button>
                <button
                  className={`order-pill ${
                    historyFilter === "canceled" ? "active" : ""
                  }`}
                  onClick={() => setHistoryFilter("canceled")}
                >
                  Pesanan Dibatalkan
                </button>
              </div>

              {filteredHistory.map((o) => (
                <div key={o.id} className="order-card">
                  <div className="order-card-header">
                    <div>
                      <div>{o.code}</div>
                      <div className="text-muted">{o.type}</div>
                    </div>
                    <div className="d-flex flex-column align-items-end gap-1">
                      <span
                        className={`badge-soft ${
                          o.statusTone === "success" ? "success" : "danger"
                        }`}
                      >
                        {o.statusText}
                      </span>
                      <span className="text-muted" style={{ fontSize: 11 }}>
                        {o.date}
                      </span>
                    </div>
                  </div>

                  <div className="order-card-body">
                    <div className="order-img"></div>
                    <div>
                      <div style={{ fontSize: 13 }}>{o.itemName}</div>
                      <div className="mt-2" style={{ fontSize: 13 }}>
                        <span className="text-muted">Total Harga :</span>{" "}
                        <b>Rp {o.total.toLocaleString("id-ID")}</b>
                      </div>
                    </div>
                  </div>

                  <div className="order-card-footer">
                    <div
                      className={
                        o.bottomTone === "danger" ? "txt-danger" : "txt-muted"
                      }
                    >
                      {o.bottomText}
                    </div>
                    <div className="order-actions">
                      {o.actions.map((a) => (
                        <button
                          key={a}
                          type="button"
                          className={
                            a === "Tulis Ulasan"
                              ? "btn btn-outline-secondary"
                              : "btn btn-warning"
                          }
                          onClick={() => console.log(a)}
                        >
                          {a}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {filteredHistory.length === 0 && (
                <div className="text-muted mt-3">Belum ada riwayat pesanan.</div>
              )}
            </div>
          )}

          {/* TAB KELUAR */}
          {tab === "logout" && (
            <div className="cardx p-4 text-center">
              <h5 className="mb-3">Keluar</h5>
              <p className="text-muted mb-4">
                Apakah kamu yakin ingin keluar dari akun Lola Cake?
              </p>
              <div className="d-grid gap-2" style={{ maxWidth: 320, margin: "0 auto" }}>
                <button className="btn btn-warning" type="button" onClick={doLogout}>
                  Keluar Akun
                </button>
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setTab("akun")}
                >
                  Tetap Masuk
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <ToastBanner
        open={toast.open}
        message={toast.message}
        onClose={() => setToast({ open: false, message: "" })}
      />
      <Popup {...popup} />
    </div>
  );
}
