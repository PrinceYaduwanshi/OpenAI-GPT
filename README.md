# OpenAI-GPT Project (ChatFusion AI)

ChatFusion AI is a full-stack AI conversational platform inspired by modern GPT-style applications.  
The project supports secure authentication, persistent chat threads, Google OAuth login, and AI-powered conversations using a scalable MERN architecture.

The link for testing this project is given in description

---

## 🚀 Features

- 🔐 Local Authentication using Passport.js
- 🌐 Google OAuth 2.0 Login
- 💬 GPT-style conversational interface
- 🧵 Persistent thread-based chat history
- 👤 User-specific protected conversations
- 🗑️ Secure account deletion
- ⚡ Dynamic loading states and protected routing
- 📦 MongoDB-based persistent storage
- ☁️ Production deployment using Vercel + Render

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Context API
- CSS3
- Vite

### Backend
- Node.js
- Express.js
- Passport.js
- Passport Local
- Passport Google OAuth20
- Express Session
- MongoDB
- Mongoose

### Deployment
- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas

---

## 📂 Project Structure

```bash
ChatFusionAI/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── ...
│
└── backend/
    ├── routes/
    ├── models/
    ├── middlewares/
    ├── config/
    └── ...
```

---

## 📥 Clone and Run the Project Locally

### 1️⃣ Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
```

### 2️⃣ Navigate into Project Folder
```bash
cd OpenAI-GPT
```
### 🔹Frontend Setup

### 3️⃣ Navigate to Frontend
```bash
cd frontend
```

### 4️⃣ Install Dependencies
```bash
npm install
```

### 5️⃣ Create .env File
```bash
VITE_BACKEND_URL=http://localhost:8000
```

### 6️⃣ Start Frontend
```bash
npm run dev
```

#### Frontend will run on http://localhost:5173

### 🔹 Backend Setup

### 7️⃣ Open New Terminal and Navigate to Backend
```bash
cd backend
```

### 8️⃣ Install Dependencies
```bash
npm install
```

### 9️⃣ Create .env File
```bash
MONGO_DB_URI=YOUR_MONGODB_URI

SESSION_SECRET=YOUR_SESSION_SECRET

GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID

GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET

GOOGLE_CALLBACK_URL=http://localhost:8000/auth/google/callback

FRONT_END_URL=http://localhost:5173
```
### 🔟 Start Backend Server
```bash
node server.js
```

#### Backend will run on http://localhost:8000

### Now open http://localhost:5173 on your browser to run the application
