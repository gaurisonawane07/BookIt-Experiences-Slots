"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";

export default function ExperienceDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [experience, setExperience] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await fetch(`https://bookit-experiences-slots-1.onrender.com/api/experiences/${id}`);
        const data = await res.json();
        setExperience(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, [id]);

  if (loading) return <Loader />;
  if (!experience) return <p className="text-center mt-10">Experience not found.</p>;

  const tax = Math.round(experience.price * 0.06);
  const subtotal = experience.price * quantity;
  const total = subtotal + tax;

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      toast.info("Please select a date and time before proceeding 🕒");
      return;
    }
    router.push(
      `/checkout?exp=${experience._id}&date=${selectedDate}&time=${selectedTime}&qty=${quantity}`
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT SECTION */}
        <div>
          <h3
            className="text-sm text-gray-500 mb-3 cursor-pointer flex items-center gap-2"
            onClick={() => router.back()}
          >
            ← Details
          </h3>

          <img
            src={experience.imageUrl}
            alt={experience.title}
            className="w-full h-72 object-cover rounded-xl"
          />

          <h1 className="text-2xl font-semibold mt-6">{experience.title}</h1>
          <p className="text-gray-500 mt-2">{experience.description}</p>

          
          <div className="mt-8">
            <h3 className="font-medium mb-2">Choose date</h3>
            <div className="flex flex-wrap gap-2">
              {experience.slots.slice(0, 5).map((slot: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setSelectedDate(slot.date)}
                  className={`px-4 py-2 rounded-md text-sm border transition-all ${
                    selectedDate === slot.date
                      ? "bg-yellow-400 text-black font-semibold"
                      : "bg-white hover:bg-yellow-100 text-gray-700"
                  }`}
                >
                  {slot.date}
                </button>
              ))}
            </div>
          </div>

          {/* Choose Time */}
          <div className="mt-8">
            <h3 className="font-medium mb-2">Choose time</h3>
            <div className="flex flex-wrap gap-2">
              {experience.slots.slice(0, 4).map((slot: any, i: number) => {
                

                const left = slot.left ?? Math.floor(Math.random() * 5) + 1;
                const soldOut = left === 0 || slot.isBooked;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedTime(slot.time)}
                    disabled={soldOut}
                    className={`px-4 py-2 rounded-md text-sm border flex items-center gap-2 transition-all ${
                      soldOut
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : selectedTime === slot.time
                        ? "bg-yellow-400 text-black font-semibold"
                        : "bg-white hover:bg-yellow-100 text-gray-700"
                    }`}
                  >
                    <span>{slot.time}</span>
                    {!soldOut && (
                      <span className="text-red-500 text-xs font-medium">{left} left</span>
                    )}
                    {soldOut && (
                      <span className="text-xs text-gray-400 font-medium">Sold out</span>
                    )}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              All times are in IST (GMT +5:30)
            </p>
          </div>

      
          <div className="mt-10">
            <h3 className="font-medium mb-2">About</h3>
            <div className="bg-gray-50 border border-gray-200 p-3 rounded-md text-gray-600 text-sm">
              Scenic routes, trained guides, and safety briefing. Minimum age 10.
            </div>
          </div>
        </div>

       
        <div>
          <div className="bg-gray-50 rounded-xl shadow-sm border border-gray-200 p-6 w-full max-w-sm ml-auto">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-600">Starts at</span>
              <span className="font-medium text-gray-900">₹{experience.price}</span>
            </div>

          
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-600">Quantity</span>
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                >
                  −
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center mb-2 text-gray-600">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between items-center mb-2 text-gray-600">
              <span>Taxes</span>
              <span>₹{tax}</span>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between items-center font-semibold text-lg">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              onClick={handleConfirm}
              className="w-full mt-5 bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
