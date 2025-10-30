"use client";


import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function CheckoutContent() {
  const router = useRouter();
  const params = useSearchParams();

  const expId = params.get("exp");
  const date = params.get("date");
  const time = params.get("time");
  const qty = Number(params.get("qty")) || 1;

  const [exp, setExp] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", promo: "", agreed: false });
  const [total, setTotal] = useState<number>(0);
  const [discountApplied, setDiscountApplied] = useState(false);

  useEffect(() => {
    const fetchExp = async () => {
      try {
        const res = await fetch(
          `https://bookit-experiences-slots-1.onrender.com/api/experiences/${expId}`
        );
        const data = await res.json();
        setExp(data);

        const subtotal = data.price * qty;
        const tax = Math.round(subtotal * 0.06);
        setTotal(subtotal + tax);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load experience details ❌");
      } finally {
        setLoading(false);
      }
    };
    if (expId) fetchExp();
  }, [expId, qty]);

  const subtotal = exp ? exp.price * qty : 0;
  const tax = Math.round(subtotal * 0.06);

  // ✅ Handle Promo with DB
  const handleApplyPromo = async () => {
    if (!form.promo.trim()) {
      toast.info("Enter a promo code first ⚠️");
      return;
    }

    try {
      const res = await fetch(
        "https://bookit-experiences-slots-1.onrender.com/api/promo/validate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: form.promo }),
        }
      );

      const data = await res.json();
      if (!res.ok || !data.valid) {
        toast.error(data.message || "Invalid promo code ❌");
        return;
      }

      let newTotal = total;

      if (data.discountType === "percentage") {
        newTotal = total - total * (data.amount / 100);
      } else if (data.discountType === "flat") {
        newTotal = total - data.amount;
      }

      setTotal(newTotal < 0 ? 0 : Math.round(newTotal));
      setDiscountApplied(true);
      toast.success(`Promo "${form.promo.toUpperCase()}" applied 🎉`);
    } catch (error) {
      console.error("Promo error:", error);
      toast.error("Server error while validating promo ❌");
    }
  };

  // ✅ Handle Payment
  const handlePay = async () => {
    if (!form.name || !form.email || !form.agreed) {
      toast.error("Please fill all fields and agree to terms ⚠️");
      return;
    }

    try {
      const res = await fetch(
        "https://bookit-experiences-slots-1.onrender.com/api/bookings",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            experienceId: expId,
            name: form.name,
            email: form.email,
            slotDate: date,
            slotTime: time,
            totalPrice: total,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Booking failed ❌");
        return;
      }

      toast.success("Booking Confirmed ✅");
      router.push(`/confirmation?id=${data.booking._id}`);
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("Internal Server Error 🚫");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* LEFT: Form */}
      <div>
        <h3
          onClick={() => router.back()}
          className="text-sm text-gray-600 mb-4 cursor-pointer hover:underline flex items-center gap-1"
        >
          ← Checkout
        </h3>

        <div className="space-y-4 bg-gray-50 p-6 rounded-xl border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="flex-1 bg-gray-100 rounded-md px-4 py-2 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="flex-1 bg-gray-100 rounded-md px-4 py-2 focus:outline-none"
            />
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Promo code"
              value={form.promo}
              onChange={(e) => setForm({ ...form, promo: e.target.value })}
              className="flex-1 bg-gray-100 rounded-md px-4 py-2 focus:outline-none"
              disabled={discountApplied}
            />
            <button
              onClick={handleApplyPromo}
              type="button"
              className={`px-5 py-2 rounded-md text-white ${
                discountApplied
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800"
              }`}
              disabled={discountApplied}
            >
              {discountApplied ? "Applied" : "Apply"}
            </button>
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={form.agreed}
              onChange={(e) => setForm({ ...form, agreed: e.target.checked })}
              className="w-4 h-4"
            />
            I agree to the terms and safety policy
          </label>
        </div>
      </div>

      {/* RIGHT: Summary */}
      <div className="bg-gray-50 rounded-xl shadow-sm border border-gray-200 p-6 w-full max-w-sm ml-auto">
        <div className="space-y-2 text-gray-700 text-sm">
          <div className="flex justify-between">
            <span>Experience</span>
            <span>{exp?.title}</span>
          </div>
          <div className="flex justify-between">
            <span>Date</span>
            <span>{date}</span>
          </div>
          <div className="flex justify-between">
            <span>Time</span>
            <span>{time}</span>
          </div>
          <div className="flex justify-between">
            <span>Qty</span>
            <span>{qty}</span>
          </div>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Taxes</span>
            <span>₹{tax}</span>
          </div>
        </div>

        <hr className="my-4" />
        <div className="flex justify-between font-semibold text-lg mb-4">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <button
          onClick={handlePay}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-md font-semibold"
        >
          Pay and Confirm
        </button>
      </div>
    </div>
  );
}
