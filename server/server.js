// server/server.js
import express from "express";
import cors from "cors";
import { products } from "./data/products.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/products", (req, res) => {
  res.json(products);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ API berjalan di http://localhost:${PORT}`));
