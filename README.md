# Sosiafy

A modern social media platform built with the MERN Stack featuring real-time messaging, notifications, post sharing, likes, comments, bookmarks, and profile management.

## Live Demo

**Live URL:** https://your-live-demo-link.com

---

## Screenshots

### Home Feed

![Home Feed](./screenshots/home-feed.png)

### User Profile

![User Profile](./screenshots/profile.png)

### Real-Time Chat

![Chat](./screenshots/chat.png)

---

## Features

- User Authentication & Authorization
- Create, Like & Comment on Posts
- Real-Time Messaging
- Real-Time Notifications
- Profile Management
- Bookmark Posts
- Suggested Users
- Cloudinary Image Upload
- Responsive User Interface

---

## Tech Stack

### Frontend

- React.js
- Redux Toolkit
- Tailwind CSS
- Shadcn UI
- Axios
- React Router DOM

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Services & Tools

- Socket.IO
- JWT Authentication
- Cloudinary
- Git & GitHub

---

## Project Structure

```bash
Sosiafy
│
├── frontend
│   ├── public
│   └── src
│       ├── components
│       ├── hooks
│       ├── redux
│       ├── lib
│       └── utils
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── socket
│   └── utils
│
└── README.md
```

---

## Environment Variables

Create a `.env` file inside the backend directory and configure the following variables:

```env
PORT=

DATABASE_URL=

JWT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

CLIENT_URL=
```

---

## Getting Started

### Clone Repository

```bash
git clone https://github.com/your-username/sosiafy.git
cd sosiafy
```

### Install Dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### Run Application

```bash
# Backend
npm run dev

# Frontend
npm run dev
```

---

## Developed By

**Shivam Yadav**

Full Stack Developer (MERN Stack)

Email: shivamyadv196@gmail.com

GitHub: https://github.com/shivamyadv196

LinkedIn: https://linkedin.com/in/your-linkedin-profile
