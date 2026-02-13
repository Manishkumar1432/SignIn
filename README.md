# Sigin (MERN Sign-in Demo)

A small demo showing a Sign In page built with React (MUI) and a Node/Express backend with MongoDB.

MongoDB local URL: mongodb://localhost:27017

## Quick start

1. Ensure MongoDB is running locally (mongod)

Backend:

2. cd backend
3. npm install
4. copy `.env.example` to `.env` and optionally change values
5. npm run seed   # creates demo user test@example.com / Password123
6. npm run dev

Frontend:

7. cd frontend
8. npm install
9. npm start

Open http://localhost:3000 to see the sign-in page.

API:
- POST /api/auth/signup
- POST /api/auth/signin

Notes:
- Default MongoDB connection is mongodb://localhost:27017/signindb (adjust via .env)
