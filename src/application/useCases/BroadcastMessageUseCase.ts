import { Message } from "../../domain/entities/Message";
import { MessageType } from "../../domain/valueObjects/MessageType";
import { IMessageDispatcher } from "../interfaces/MessageDispatcher";

export class BroadcastMessageUseCase {
    constructor(private readonly messageDispatcher: IMessageDispatcher) {}

    execute(type: string, content: string, timestamp: string): void {
        const messageType = MessageType.create(type);
        const message = Message.create(
            null,
            null,
            messageType,
            content,
            new Date(timestamp),
        );

        this.messageDispatcher.broadcast(message);
    }
}
