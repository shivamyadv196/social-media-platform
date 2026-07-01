import { useEffect } from 'react'
import ChatPage from './components/ChatPage'
import EditProfile from './components/EditProfile'
import Home from './components/Home'
import Login from './components/Login'
import MainLayout from './components/MainLayout'
import Profile from './components/Profile'
import Signup from './components/Signup'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { io } from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux'
import { setSocket } from './redux/socketSlice'
import { setOnlineUsers } from './redux/chatSlice'
import { setLikeNotification } from './redux/rtnSlice'
import ProtectedRoutes from './components/ProtectedRoutes'
import { addPost, updatePost, deletePost } from './redux/postSlice';

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes><MainLayout /></ProtectedRoutes>,
    children: [
      {
        path: '/',
        element: <ProtectedRoutes><Home /></ProtectedRoutes>
      },
      {
        path: '/profile/:id',
        element: <ProtectedRoutes> <Profile /></ProtectedRoutes>
      },
      {
        path: '/account/edit',
        element: <ProtectedRoutes><EditProfile /></ProtectedRoutes>
      },
      {
        path: '/chat',
        element: <ProtectedRoutes><ChatPage /></ProtectedRoutes>
      },
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
])

function App() {
  const { user } = useSelector(store => store.auth); 
  const dispatch = useDispatch();

  useEffect(() => {
  let socketio;

  if (user) {
  socketio = io(import.meta.env.VITE_API_URL, {
    query: {
      userId: user._id,
    },
  });

  dispatch(setSocket(socketio));

  // socketio.on("connect", () => {
  //   console.log("Connected:", socketio.id);
  // });

      socketio.on("getOnlineUsers", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    });

    socketio.on("notification", (notification) => {
      dispatch(setLikeNotification(notification));
    });

    socketio.on("newPost", (newPost) => {
      dispatch(addPost(newPost));
    });

    socketio.on("postUpdated", (updatedPost) => {
      dispatch(updatePost(updatedPost));
    });

    socketio.on("postDeleted", (postId) => {
      dispatch(deletePost(postId));
    });
return () => {
  if (socketio) {
    socketio.close();
    dispatch(setSocket(null));
  }
};
}},[user, dispatch]);

  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  )
}

export default App
