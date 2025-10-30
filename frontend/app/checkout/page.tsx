"use client";

import { Suspense } from "react";
import CheckoutContent from "./CheckoutContent";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10 text-gray-600">Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
