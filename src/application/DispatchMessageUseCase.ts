import { Message } from "../domain/entities/Message";
import { MessageType } from "../domain/MessageType";
import { UserID } from "../domain/UserID";
import { MessageDispatcher } from "./MessageDispatcher";

export class DispatchMessageUseCase {
    constructor(private readonly messageDispatcher: MessageDispatcher) {}

    execute(
        senderId: string,
        recipientId: string,
        type: string,
        content: string,
        timestamp: string,
    ): void {
        const message = Message.create(
            UserID.from(senderId),
            UserID.from(recipientId),
            type as MessageType,
            content,
            new Date(timestamp),
        );

        this.messageDispatcher.dispatch(recipientId, message);
    }
}
