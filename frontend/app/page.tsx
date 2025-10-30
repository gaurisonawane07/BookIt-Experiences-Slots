"use client";

import { Suspense } from "react";
import HomeContent from "./HomeContent";

export default function HomePage() {
  return (
    <Suspense fallback={<div className="text-center mt-10 text-gray-600">Loading experiences...</div>}>
      <HomeContent />
    </Suspense>
  );
}
