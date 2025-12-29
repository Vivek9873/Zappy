# Zappy Vendor Event Day Tracker

A full-stack application for tracking vendor event workflows with check-in, OTP verification, setup progress, and completion management.

## 🚀 Tech Stack

### Frontend

- React 19 with Vite
- Tailwind CSS v4
- Redux Toolkit (State Management)
- Axios (API calls)
- Lucide React (Icons)

### Backend

- Node.js with Express
- MongoDB with Mongoose
- JWT Authentication
- Multer (File uploads)
- BCrypt (Password hashing)

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (cloud)

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
MONGODB_URI=
JWT_SECRET=your_secret_key_here
```

Start backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:3000`

## 🎯 Features

1. **Vendor Login** - Mock authentication with event ID
2. **Check-In** - Photo upload + geolocation capture
3. **Customer OTP (Start)** - Trigger and verify OTP to start event
4. **Setup Progress** - Upload pre/post setup photos with notes
5. **Closing OTP** - Final OTP verification to complete event
6. **Success Screen** - Event completion summary

## 📁 Project Structure

```
zappy-vendor-tracker/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── redux/
│   │   ├── api/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   └── package.json
└── README.md
```

## 🔌 API Endpoints

### Vendor Routes

- `POST /api/vendor/login` - Vendor login
- `GET /api/vendor/profile` - Get vendor profile

### Event Routes

- `POST /api/event/checkin` - Vendor check-in
- `POST /api/event/send-otp` - Send OTP to customer
- `POST /api/event/verify-otp` - Verify OTP
- `POST /api/event/setup` - Upload setup photos
- `POST /api/event/complete` - Complete event
- `GET /api/event/:eventId` - Get event details

## 🎨 UI Features

- Clean, modern gradient design
- Responsive layout
- Smooth transitions and animations
- File upload with preview
- Geolocation integration
- Step-by-step workflow

## 🔒 Security

- JWT authentication
- File upload validation
- Input sanitization
- CORS enabled
- Error handling middleware

## 👨‍💻 Development

```bash
# Run frontend
cd frontend && npm run dev

# Run backend
cd backend && npm run dev
```

## 📝 Notes

- OTPs are mocked for demo purposes
- In production, integrate SMS/Email service
- MongoDB should be running locally or use MongoDB Atlas
- File uploads stored in `backend/uploads/`

## 🎯 Assignment Completion

✅ Vendor Check-In with photo & geolocation  
✅ Customer OTP trigger & verification  
✅ Event setup progress with photos  
✅ Closing confirmation with OTP  
✅ Redux state management  
✅ Clean UI with Tailwind CSS v4  
✅ RESTful API with Express  
✅ MongoDB database integration  
✅ JWT authentication  
✅ File upload handling  
✅ Error handling & validation

---

Made with ❤️ for Zappy Full Stack Internship Assessment
