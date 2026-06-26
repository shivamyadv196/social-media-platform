import { setMessages } from "@/redux/chatSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetRTM = () => {
  const dispatch = useDispatch();
  const { socket } = useSelector(store => store.socketio);
  const { messages } = useSelector(store => store.chat);

  useEffect(() => {
     //console.log("Socket from RTM:", socket);
    if (!socket) return;

    const handleMessage = (newMessage) => {
    //  console.log("NEW MESSAGE:", newMessage);

      dispatch(setMessages([...messages, newMessage]));
    };

    socket.on("newMessage", handleMessage);

    return () => {
      socket.off("newMessage", handleMessage);
    };
  }, [socket, messages, dispatch]);
};

export default useGetRTM;