# Multimedia Upload and Search Web App

This is a full-stack web application that allows authenticated users to upload and preview multimedia files (images, videos, audio, PDFs), and search through uploaded files using keywords, ranked by relevance.

---

## 🌐 Deployment Links

- **Frontend (React)**: [https://multimedia-react-app.onrender.com](https://multimedia-react-app.onrender.com)
- **Backend (Node.js + Express)**: [https://multimedia-app-8l5v.onrender.com](https://multimedia-app-8l5v.onrender.com)

---

## 📁 Project Structure

```
multimedia-app/
├── frontend/         # React + Tailwind CSS
└── backend/          # Node.js + Express + MongoDB + Cloudinary
```

---

## 🚀 Features

- JWT-based secure authentication
- Upload multimedia files: image, video, audio, and PDF
- Live previews before uploading
- Add tags to files for better search
- Responsive UI with Tailwind CSS

---

## 🔧 Getting Started Locally

### Prerequisites

- Node.js and npm installed
- MongoDB URI and Cloudinary credentials

### 1. Backend Setup

```bash
cd backend
npm install

# Create a .env file with the following:
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Start the server
npm run dev
```

Server will run on: `http://localhost:5000`

### 2. Frontend Setup

```bash
cd frontend
npm install

# Create a file at src/config/constants.js
export const API_BASE_URL = "http://localhost:5000";

# Start the app
npm run dev
```

App will run on: `http://localhost:3000`

---

## 📡 API Endpoints

### Auth Routes

- `POST /auth/signup` – User registration
- `POST /auth/login` – User login (returns JWT token)

### Media Routes

- `POST /media/upload` – Upload file (requires JWT)

---

## 📦 Tech Stack

- **Frontend**: React.js (Hooks, Vite), Redux, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, Cloudinary
- **Authentication**: JWT (JSON Web Token)
- **Deployment**: Render (both client and server)

---

## ✨ Future Improvements

- Advanced search filtering (by file type, date range)
- Search uploaded files by name or tags
- Rank search results by relevance: recent uploads, view count, and tag match

---
