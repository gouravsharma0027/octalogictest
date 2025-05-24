## Backend (`README.md`)

# Vehicle Booking App - Backend

This is the backend API for the Vehicle Booking App, built with **Node.js**, **Express**, **TypeScript**, and **PostgreSQL** using **Prisma ORM**.

---

## Tech Stack

- Node.js
- Express
- TypeScript
- PostgreSQL
- Prisma ORM
- CORS / dotenv / Express middlewares

---

## Setup Instructions

**Clone the repository**

   git clone <your-backend-repo-url>
   cd vehicle-booking-backend
   npm install
   
**Set up environment variables**
   DATABASE_URL=postgresql://user:password@localhost:5432/vehicle_booking
   PORT=5000


**Run migrations and seed data**

   npx prisma migrate dev --name init
   npx prisma db seed


**Start the server*

   npm run build
   npm run dev


**Folder Structure**
src/
├── controllers/
├── routes/
├── models/
├── middleware/
├── prisma/            # Schema & seed file
├── utils/
├── app.ts

