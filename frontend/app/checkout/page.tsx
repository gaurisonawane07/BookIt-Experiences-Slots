import { Suspense } from "react";
import CheckoutPageContent from "./CheckoutPageContent";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading checkout...</div>}>
      <CheckoutPageContent />
    </Suspense>
  );
}
