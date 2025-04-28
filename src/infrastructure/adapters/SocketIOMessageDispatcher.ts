import { IMessageDispatcher } from "../../application/interfaces/MessageDispatcher";
import { Message } from "../../domain/entities/Message";
import { Server } from "socket.io";

export class SocketIOMessageDispatcher implements IMessageDispatcher {
    constructor(private readonly io: Server) {}

    dispatch(recipientId: string, message: Message): void {
        this.io.to(recipientId).emit("message", message);
    }

    broadcast(message: Message): void {
        this.io.emit("message", message);
    }
}
