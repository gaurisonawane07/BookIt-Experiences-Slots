"use client";

import Link from "next/link";

export default function ExperienceCard({ experience }: { experience: any }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-200 border border-gray-100">
      <img
        src={experience.imageUrl}
        alt={experience.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg text-gray-900">{experience.title}</h3>
          <span className="bg-gray-100 text-sm text-gray-600 px-2 py-1 rounded">
            {experience.location}
          </span>
        </div>
        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
          {experience.description}
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="font-semibold text-lg text-gray-800">
            ₹{experience.price}
          </span>
          <Link
            href={`/experiences/${experience._id}`}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-md text-sm font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
