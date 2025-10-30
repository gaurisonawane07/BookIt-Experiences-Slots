# BookIt: Experiences & Slots 🎟️

A fullstack web application to explore, book, and confirm exciting travel experiences — built as part of Fullstack Intern Assignment.

## 🚀 Tech Stack
**Frontend:** Next.js + TypeScript + TailwindCSS  
**Backend:** Node.js + Express + MongoDB  
**Database:** MongoDB Atlas  
**Deployment:** Frontend (Vercel) | Backend (Render)



## ⚙️ Folder Structure
```bash
BookIt/
│
├── frontend/ # Next.js app (UI)
│ ├── app/
│ ├── components/
│ └── ...
│
├── backend/ # Express server (API)
│ ├── models/
│ ├── controllers/
│ ├── routes/
│ ├── config/
│ └── ...
│
└── README.md 
```
## 🧩 Features
- Browse curated experiences (fetched from backend)
- Responsive, Figma-accurate UI
- Book slots with available dates & times
- Apply promo codes for discounts
- View booking confirmation
- Toast notifications & validations

```yaml


## 🧠 API Endpoints
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/experiences` | Fetch all experiences |
| GET | `/api/experiences/:id` | Fetch experience details |
| POST | `/api/bookings` | Create booking |
| POST | `/api/promo/validate` | Validate promo code |


```
## 🧰 Installation

### 1️ Backend
```bash
cd backend
npm install
npm run dev
```

### 2 Frontend
```bash
cd frontend
npm install
npm run dev
```
## ⚙️ Setup Instructions
1. Clone repo
2. Install dependencies (`npm install`)
3. Set up MongoDB URI in `.env`
4. Run backend: `npm run dev`
5. Run frontend: `npm run dev`
6. Open [http://localhost:3000](http://localhost:3000)


## 🚀 Deployment
- Frontend: [[Vercel link](https://book-it-experiences-slots-x7x7.vercel.app/)]
- Backend: [[Render link](https://bookit-experiences-slots-1.onrender.com/api)]
