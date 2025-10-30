"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef<any>(null);

  // Fetch suggestions when typing
  useEffect(() => {
    if (q.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    // Debounce: wait for 300ms after typing stops
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`https://bookit-experiences-slots-1.onrender.com/api/experiences?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        setSuggestions(data);
        setShowDropdown(true);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      }
    }, 300);

    return () => clearTimeout(timeoutRef.current);
  }, [q]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDropdown(false);
    router.push(`/?q=${encodeURIComponent(q)}`);
  };

  const handleSelect = (id: string) => {
    setShowDropdown(false);
    setQ("");
    router.push(`/experiences/${id}`);
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-6 py-4 relative">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-md bg-black text-white flex items-center justify-center font-bold">
            B
          </div>
          <span className="font-semibold text-lg tracking-wide text-black">BookIt</span>
        </Link>

        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center bg-gray-100 rounded-lg overflow-hidden mt-3 sm:mt-0 w-full sm:w-[360px] md:w-[420px] lg:w-[480px] relative"
        >
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search experiences"
            className="flex-1 px-3 py-2 text-neutral-800 outline-none bg-gray-100 placeholder-gray-500"
          />
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 text-black font-medium text-sm"
          >
            Search
          </button>

          {/* 🔽 Suggestions Dropdown */}
          {showDropdown && suggestions.length > 0 && (
            <div className="absolute top-full mt-1 left-0 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-60 overflow-auto z-50">
              {suggestions.map((exp) => (
                <div
                  key={exp._id}
                  onClick={() => handleSelect(exp._id)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                >
                  <p className="font-medium text-gray-800">{exp.title}</p>
                  <p className="text-xs text-gray-500">{exp.location}</p>
                </div>
              ))}
            </div>
          )}
        </form>
      </div>
    </header>
  );
}
