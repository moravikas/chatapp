import { Server } from "socket.io";

let io;

const onlineUsers = new Map();

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(
      `User Connected: ${socket.id}`
    );

    socket.on("join", (userId) => {
      onlineUsers.set(
        userId,
        socket.id
      );

      console.log(
        `User ${userId} joined`
      );
    });

    socket.on(
      "send-message",
      (data) => {
        const {
          receiverId,
        } = data;

        const receiverSocket =
          onlineUsers.get(
            receiverId
          );

        if (receiverSocket) {
          io.to(
            receiverSocket
          ).emit(
            "receive-message",
            data
          );
        }
      }
    );

    socket.on(
      "disconnect",
      () => {
        console.log(
          `Disconnected: ${socket.id}`
        );

        for (const [
          userId,
          socketId,
        ] of onlineUsers) {
          if (
            socketId === socket.id
          ) {
            onlineUsers.delete(
              userId
            );
            break;
          }
        }
      }
    );
  });
};

export { io };