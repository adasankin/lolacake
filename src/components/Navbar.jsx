import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";

function readUser() {
  try { return JSON.parse(localStorage.getItem("user")) || null; }
  catch { return null; }
}

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(readUser());
  const [open, setOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const menuRef = useRef(null);

  useEffect(() => {
    setUser(readUser());
    try {
      const raw = localStorage.getItem("lola_cart");
      const list = raw ? JSON.parse(raw) : [];
      const total = list.reduce((s, i) => s + (i.qty || 1), 0);
      setCartCount(total);
    } catch {
      setCartCount(0);
    }
  }, [location.pathname]);

  useEffect(() => {
    const onStorage = () => {
      setUser(readUser());
      try {
        const raw = localStorage.getItem("lola_cart");
        const list = raw ? JSON.parse(raw) : [];
        const total = list.reduce((s, i) => s + (i.qty || 1), 0);
        setCartCount(total);
      } catch { setCartCount(0); }
    };
    const onAuthChanged = () => setUser(readUser());
    const onCartChanged = () => {
      try {
        const raw = localStorage.getItem("lola_cart");
        const list = raw ? JSON.parse(raw) : [];
        const total = list.reduce((s, i) => s + (i.qty || 1), 0);
        setCartCount(total);
      } catch { setCartCount(0); }
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("auth-changed", onAuthChanged);
    window.addEventListener("cart-changed", onCartChanged);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("auth-changed", onAuthChanged);
      window.removeEventListener("cart-changed", onCartChanged);
    };
  }, []);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!menuRef.current) return;
      if (userMenu && !menuRef.current.contains(e.target)) setUserMenu(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [userMenu]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-changed"));
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <motion.img
              src="/assets/navbar-brand.png"
              alt="logo"
              width="120"
              height="50"
              style={{ borderRadius: 8 }}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link className="text-slate-800 hover:text-brand" to="/">Home</Link>
            <Link className="text-slate-800 hover:text-brand" to="/product">Product</Link>
            <Link className="text-slate-800 hover:text-brand" to="/about-us">About Us</Link>
            <Link className="text-slate-800 hover:text-brand" to="/contact">Contact</Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/keranjang"
              className="hidden sm:inline-flex items-center rounded-full border border-slate-300 px-3 py-1 text-sm text-slate-800 hover:bg-slate-50"
            >
              Cart
              {cartCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center bg-red-500 text-white rounded-full text-xs" style={{minWidth:18,height:18,padding:"0 6px"}}>{cartCount}</span>
              )}
            </Link>

            {!user ? (
              <Link
                to="/login"
                className="inline-flex items-center rounded-full bg-brand text-white px-4 py-2 text-sm hover:brightness-105"
              >
                Login / Sign Up
              </Link>
            ) : (
              <div className="relative">
                <button
                  className="inline-flex items-center rounded-full bg-slate-100 text-slate-800 px-3 py-2 text-sm hover:bg-slate-200"
                  onClick={() => setUserMenu((v) => !v)}
                >
                  Hello, {(user.username || "User").split(" ")[0]}
                  <svg className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z"/></svg>
                </button>
                <AnimatePresence>
                  {userMenu && (
                    <motion.div
                      className="absolute right-0 mt-2 w-40 rounded-md border border-slate-200 bg-white shadow-soft"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      ref={menuRef}
                    >
                      <Link className="block px-3 py-2 text-sm hover:bg-slate-50" to="/profile" onClick={() => setUserMenu(false)}>
                        Profil
                      </Link>
                      <Link className="block px-3 py-2 text-sm hover:bg-slate-50" to="/profile" state={{ tab: "orders" }} onClick={() => setUserMenu(false)}>
                        Pesanan Saya
                      </Link>
                      <Link className="block px-3 py-2 text-sm hover:bg-slate-50" to="/profile" state={{ tab: "history" }} onClick={() => setUserMenu(false)}>
                        Riwayat Pemesanan
                      </Link>
                      <button
                        className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-slate-50"
                        onClick={handleLogout}
                      >
                        Keluar
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <button
              className="inline-flex md:hidden items-center rounded-md border border-slate-300 p-2"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle navigation"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              className="md:hidden pb-4 space-y-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
            >
              <Link className="block px-2 py-1 text-slate-800 hover:text-brand" to="/" onClick={() => setOpen(false)}>Home</Link>
              <Link className="block px-2 py-1 text-slate-800 hover:text-brand" to="/product" onClick={() => setOpen(false)}>Product</Link>
              <Link className="block px-2 py-1 text-slate-800 hover:text-brand" to="/about-us" onClick={() => setOpen(false)}>About Us</Link>
              <Link className="block px-2 py-1 text-slate-800 hover:text-brand" to="/contact" onClick={() => setOpen(false)}>Contact</Link>
              <Link className="block px-2 py-1 text-slate-800 hover:text-brand" to="/keranjang" onClick={() => setOpen(false)}>Cart</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
