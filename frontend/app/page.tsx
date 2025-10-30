"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ExperienceCard from "@/components/ExperienceCard";
import SkeletonCard from "@/components/SkeletonCard";

export default function Home() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || ""; 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        
        const url = q
          ? `http://localhost:5000/api/experiences?q=${encodeURIComponent(q)}`
          : "http://localhost:5000/api/experiences";

        const res = await fetch(url);
        const data = await res.json();
        setExperiences(data);
      } catch (err) {
        console.error("Error fetching experiences:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [q]); 

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold mb-6">
        {q ? `Search results for “${q}”` : "Explore Experiences"}
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : experiences.length === 0 ? (
        <p className="text-gray-500 text-center mt-20">
          No experiences found matching “{q}”
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((exp: any) => (
            <ExperienceCard key={exp._id} experience={exp} />
          ))}
        </div>
      )}
    </div>
  );
}
