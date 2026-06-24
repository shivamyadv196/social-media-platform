import {Server} from "socket.io";
import express from "express";
import http from "http";
//import dotenv from "dotenv";
//dotenv.config();
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin:"*",
        methods:['GET','POST']
    }
})

const userSocketMap = {} ; // this map stores socket id corresponding the user id; userId -> socketId

export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", (reason) => {
    console.log("Disconnected:", reason);
  });
});



export {app, server, io};