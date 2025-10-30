const BASE_URL = "http://localhost:5000/api";

export async function getExperiences() {
  const res = await fetch(`${BASE_URL}/experiences`);
  if (!res.ok) throw new Error("Failed to fetch experiences");
  return res.json();
}

export async function getExperienceById(id: string) {
  const res = await fetch(`${BASE_URL}/experiences/${id}`);
  if (!res.ok) throw new Error("Failed to fetch experience");
  return res.json();
}

export async function validatePromo(code: string) {
  const res = await fetch(`${BASE_URL}/promo/validate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });
  return res.json();
}

export async function createBooking(data: {
  experienceId: string;
  name: string;
  email: string;
  slotDate: string;
  slotTime: string;
}) {
  const res = await fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
