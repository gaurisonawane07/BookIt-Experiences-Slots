"use client";

import { Suspense } from "react";
import ConfirmationContent from "./ConfirmationContent";

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10 text-gray-600">Loading confirmation...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
