const BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "";
const AUTH_PREFIX = "/auth";

async function request(path, { method = "GET", body, token } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  // Coba parse JSON aman
  let data;
  try { data = await res.json(); } catch { data = {}; }

  if (!res.ok) {
    // backend kirim { error: "..." }
    const msg = data?.error || data?.message || `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data;
}

export const api = {
  post: (p, b, t) => request(`${p.startsWith("/auth") ? p : AUTH_PREFIX + p}`, { method: "POST", body: b, token: t }),
  get:  (p, t)   => request(`${p.startsWith("/auth") ? p : AUTH_PREFIX + p}`, { method: "GET", token: t }),
};

export function saveAuth({ token, user }) {
  localStorage.setItem("token", token);
  if (user !== undefined && user !== null) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    localStorage.removeItem("user");
  }
  try { window.dispatchEvent(new Event("auth-changed")); } catch {}
}
export function getToken() {
  return localStorage.getItem("token");
}
export function clearAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}
