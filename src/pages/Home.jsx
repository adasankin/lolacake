import { useEffect, useState } from "react";
import { API } from "../api";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [produk, setProduk] = useState([]);

  useEffect(() => {
    API.get("/produk")
      .then((res) => setProduk(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">🍰 Menu Lola Cake</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {produk.map((p) => (
          <ProductCard key={p._id} produk={p} />
        ))}
      </div>
    </div>
  );
}
