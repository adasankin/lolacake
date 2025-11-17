import express from "express";
import cors from "cors";
import { db } from "./db/connection.js";
import productsRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
console.log("JWT Secret:", process.env.JWT_SECRET);


app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);

// Gunakan route untuk produk
app.use("/products", productsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server API berjalan di http://localhost:${PORT}`);
});
