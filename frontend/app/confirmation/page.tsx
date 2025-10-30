"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function ConfirmationPage() {
  const router = useRouter();
  const params = useSearchParams();
  const refId = params.get("ref") || "HUF56&SO"; 

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
      
      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="white"
          className="w-8 h-8"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2 className="text-2xl font-semibold mb-2">Booking Confirmed</h2>
      <p className="text-gray-500 mb-6">Ref ID: {refId}</p>

      <button
        onClick={() => router.push("/")}
        className="px-5 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
      >
        Back to Home
      </button>
    </div>
  );
}
