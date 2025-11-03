import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ produk }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="border rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition">
      <img
        src={produk.gambar || "https://via.placeholder.com/300"}
        alt={produk.nama}
        className="rounded-lg mb-2 w-full h-48 object-cover"
      />
      <h2 className="text-lg font-bold">{produk.nama}</h2>
      <p className="text-gray-600 mb-2">{produk.deskripsi}</p>
      <p className="text-pink-600 font-semibold mb-3">Rp {produk.harga}</p>
      <button
        onClick={() => addToCart(produk)}
        className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
      >
        Tambah ke Keranjang
      </button>
    </div>
  );
}
