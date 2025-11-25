import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Props:
 * - placeholder: string
 * - description: string (opsional, tampil di bawah input)
 * - initialValue: string (opsional)
 * - onSearch: function(query) (opsional). Jika tidak diberikan, komponen akan navigate ke /pencarian?q=...
 * - from: string (opsional, dipass ke state saat navigate)
 */
export default function SearchBar({
  placeholder = "Search...",
  description = "",
  initialValue = "",
  onSearch,
  from,
}) {
  const navigate = useNavigate();
  const [q, setQ] = useState(initialValue || "");
  const [loading, setLoading] = useState(false);

  const doSearch = (query) => {
    if (!query || query.trim() === "") return;
    if (onSearch) {
      onSearch(query.trim());
      return;
    }
    // default behavior: navigate to /pencarian with query param + state
    setLoading(true);
    // small delay to show loading state if needed (optional)
    try {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`, {
        state: { from: from || null, description },
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    doSearch(q);
  };

  return (
    <form onSubmit={onSubmit} className="w-full max-w-3xl mx-auto">
      <div className="flex gap-3 items-center">
        <label htmlFor="site-search" className="sr-only">
          Search
        </label>

        <input
          id="site-search"
          name="search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          className="flex-1 h-14 rounded-full border border-white/60 bg-white/95 px-5 text-slate-800 placeholder-slate-400 shadow-md focus:outline-none focus:ring-2 focus:ring-[#F29B3D]"
          aria-label="Search products"
          autoComplete="off"
        />

        <button
          type="submit"
          disabled={loading}
          className="h-12 px-5 rounded-full bg-[#f08b2d] text-white font-medium hover:brightness-105 transition disabled:opacity-70 disabled:cursor-not-allowed"
          aria-label="Search"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {description ? (
        <p className="mt-3 text-center text-sm text-slate-200/90">{description}</p>
      ) : null}
    </form>
  );
}