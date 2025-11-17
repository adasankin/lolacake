import mysql from "mysql2/promise";

export const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "lolacake_db",
});

try {
  console.log("✅ Terhubung ke MySQL database!");
} catch (error) {
  console.error("❌ Gagal konek ke MySQL:", error);
}
