import express from "express";
import bcrypt from "bcrypt";
import { db } from "../db/connection.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// =====================
// REGISTER USER
// =====================
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Semua field wajib diisi" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const query =
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, 'customer')";
    await db.query(query, [username, email, hashedPassword]);

    res.status(201).json({ message: "User berhasil didaftarkan" });
  } catch (err) {
    console.error("Error register:", err);
    res.status(500).json({ error: err.message });
  }
});

// =====================
// LOGIN USER
// =====================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email dan password wajib diisi" });
    }

    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "User tidak ditemukan" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Password salah" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    res.status(200).json({
      message: "Login berhasil",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Error login:", err);
    res.status(500).json({ error: err.message });
  }
});

// =====================
// CREATE ADMIN
// =====================
router.post("/create-admin", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Semua field wajib diisi" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const query =
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, 'admin')";
    await db.query(query, [username, email, hashedPassword]);

    res.status(201).json({ message: "Admin berhasil dibuat" });
  } catch (err) {
    console.error("Error create-admin:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
