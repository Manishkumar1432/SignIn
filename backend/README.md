# Sigin Backend

Requirements:
- Node >= 16
- MongoDB running locally at mongodb://localhost:27017 (or adjust MONGO_URI)

Quick start:

1. cd backend
2. npm install
3. copy .env.example to .env and edit
4. npm run seed  # creates sample user test@example.com / Password123
5. npm run dev   # starts server on port 5000

API:
- POST /api/auth/signup { name, email, password }
- POST /api/auth/signin { email, password } -> returns { token, user }

MongoDB default: mongodb://localhost:27017/signindb
