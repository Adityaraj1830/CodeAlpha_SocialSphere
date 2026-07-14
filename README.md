# 🌐 SocialSphere - Mini Social Media Platform

A full-stack social media application built using the MERN Stack where users can create accounts, share posts, like posts, comment on posts, and follow other users.

---

## 🚀 Features

### 🔐 Authentication
- User Registration
- User Login
- Protected Routes
- Logout

### 👤 User Profile
- View User Profile
- Followers & Following Count
- Follow / Unfollow Users

### 📝 Posts
- Create Post
- View All Posts
- View Single Post
- Delete Own Post

### ❤️ Social Features
- Like / Unlike Posts
- Comment on Posts

### 🎨 Frontend
- Responsive UI
- React Router
- Context API
- Toast Notifications

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- React Router DOM
- Axios
- React Hot Toast
- CSS

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

---

# 📁 Project Structure

```
SocialSphere
│
├── backend
│   ├── src
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   └── server.js
│
├── frontend
│   ├── src
│   ├── components
│   ├── pages
│   ├── services
│   ├── context
│   ├── styles
│   └── App.jsx
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/SocialSphere.git
```

Go inside project

```bash
cd SocialSphere
```

---

# Backend Setup

```bash
cd backend
```

Install dependencies

```bash
npm install
```

Create `.env`

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY

CLIENT_URL=http://localhost:5173
```

Run backend

```bash
npm run dev
```

---

# Frontend Setup

Open another terminal

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run frontend

```bash
npm run dev
```

---

# 🌟 API Endpoints

## Authentication

- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

## Users

- GET /api/users
- GET /api/users/:id
- PUT /api/users/:id/follow

## Posts

- POST /api/posts
- GET /api/posts
- GET /api/posts/:id
- DELETE /api/posts/:id

## Likes

- PUT /api/posts/:id/like

## Comments

- POST /api/posts/:id/comment
- DELETE /api/posts/:postId/comment/:commentId

---

# 📷 Screenshots

Add screenshots here.

Example:

- Login Page
- Register Page
- Home Feed
- Profile Page
- Create Post
- Post Details

---

# 👨‍💻 Author

**Aditya Raj**

# 📜 License

This project is developed for educational purposes.
