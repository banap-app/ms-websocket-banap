import { Message } from "../../domain/entities/Message";
import { MessageType } from "../../domain/valueObjects/MessageType";
import { UserID } from "../../domain/valueObjects/UserID";
import { IMessageDispatcher } from "../interfaces/MessageDispatcher";

export class DispatchMessageUseCase {
    constructor(private readonly messageDispatcher: IMessageDispatcher) {}

    execute(
        senderId: string,
        recipientId: string,
        type: string,
        content: string,
        timestamp: string,
    ): void {
        const messageType = MessageType.create(type);
        const message = Message.create(
            UserID.from(senderId),
            UserID.from(recipientId),
            messageType,
            content,
            new Date(timestamp),
        );

        this.messageDispatcher.dispatch(recipientId, message);
    }
}
