# OpenAI-GPT Project (ChatFusion AI)

ChatFusion AI is a full-stack AI conversational platform inspired by modern GPT-style applications.  
The project supports secure authentication, persistent chat threads, Google OAuth login, and AI-powered conversations using a scalable MERN architecture.

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
