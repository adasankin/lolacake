//! BELUM
import { useContext } from "react";
import { motion } from "framer-motion";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ produk }) {
  const { addToCart } = useContext(CartContext);

  return (
    <motion.div
      className="border rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.25 }}
    >
      <motion.img
        src={produk.gambar || "https://via.placeholder.com/300"}
        alt={produk.nama}
        className="rounded-lg mb-2 w-full h-48 object-cover"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.2 }}
      />
      <h2 className="text-lg font-bold">{produk.nama}</h2>
      <p className="text-gray-600 mb-2">{produk.deskripsi}</p>
      <p className="text-pink-600 font-semibold mb-3">Rp {produk.harga}</p>
      <motion.button
        onClick={() => addToCart(produk)}
        className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.05 }}
      >
        Tambah ke Keranjang
      </motion.button>
    </motion.div>
  );
}
