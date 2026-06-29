# Social media platform

A modern social media platform built with the MERN Stack that allows users to share posts, interact through likes and comments, manage profiles, receive notifications, and communicate via real-time messaging.

## ✨ Features

- User Authentication & Authorization
- Create, Like, Comment, and Delete Posts
- Profile Management
- Bookmark Posts
- Suggested Users
- Real-Time Chat
- Real-Time Notifications
- Responsive User Interface
- Secure JWT Authentication

## 🛠️ Tech Stack

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

### Other Technologies
- Socket.IO
- JWT Authentication
- Cloudinary

## 📂 Project Structure

```bash
client/
server/
```

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/chatify.git
cd chatify
```

### 2. Install Dependencies

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the backend folder and add the following variables:

```env
PORT=8000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key

CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

FRONTEND_URL=http://localhost:5173
```

### 4. Start the Backend Server

```bash
cd backend
npm run dev
```

The backend server will run on:

```text
http://localhost:8000
```

### 5. Start the Frontend Application

Open a new terminal:

```bash
cd frontend
npm run dev
```

The frontend application will run on:

```text
http://localhost:5173
```

### 6. Access the Application

Open your browser and visit:

```text
http://localhost:5173
```

### 7. Create an Account

- Register a new account
- Login with your credentials
- Create posts and interact with other users
- Like and comment on posts
- Update your profile
- Chat with other users in real time

## 📌 Prerequisites

Make sure the following tools are installed on your system:

- Node.js (v18 or above)
- npm
- MongoDB Atlas Account
- Cloudinary Account
- Git

## 📷 Screenshots

Add screenshots of the application here after deployment.
