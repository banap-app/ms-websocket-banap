import { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { UserID } from "../../domain/valueObjects/UserID";

export function createWebSocketServer(httpServer: HttpServer): SocketIOServer {
    const io = new SocketIOServer(httpServer, {
        cors: {
            origin: "*",
        },
    });

    io.on("connection", (socket) => {
        try {
            const userId = UserID.from(socket.handshake.query.UserID as string);

            socket.join(userId.getValue());

            console.log("A user connected:", userId);

            socket.on("disconnect", () => {
                console.log("A user disconnected:", userId);
            });
        } catch (error) {
            console.error(
                "Failed to connect user:",
                error instanceof Error
                    ? error.message
                    : "An unknown error ocurred",
            );

            if (socket.connected) {
                socket.disconnect(true);
            }
        }
    });

    return io;
}
