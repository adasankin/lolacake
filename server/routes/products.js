import express from "express";
import { db } from "../db/connection.js";
import { verifyToken, checkRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// =====================
// GET: Semua produk (umum / customer)
// =====================
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =====================
// POST: Tambah produk (hanya admin)
// =====================
router.post("/add", verifyToken, checkRole("admin"), async (req, res) => {
  try {
    const { name, description, price, image } = req.body;

    if (!name || !description || !price || !image) {
      return res.status(400).json({ error: "Semua field wajib diisi" });
    }

    await db.query(
      "INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)",
      [name, description, price, image]
    );

    res.status(201).json({ message: "Produk berhasil ditambahkan" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =====================
// PUT: Update produk (hanya admin)
// =====================
router.put("/update/:id", verifyToken, checkRole("admin"), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, image } = req.body;

    if (!name || !description || !price || !image) {
      return res.status(400).json({ error: "Semua field wajib diisi" });
    }

    await db.query(
      "UPDATE products SET name=?, description=?, price=?, image=? WHERE id=?",
      [name, description, price, image, id]
    );

    res.json({ message: "Produk berhasil diupdate" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =====================
// DELETE: Hapus produk (hanya admin)
// =====================
router.delete("/delete/:id", verifyToken, checkRole("admin"), async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM products WHERE id = ?", [id]);
    res.json({ message: "Produk berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
