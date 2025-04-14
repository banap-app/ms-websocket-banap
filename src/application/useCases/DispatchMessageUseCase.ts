import { Message } from "../../domain/entities/Message";
import { MessageType } from "../../domain/enums/MessageType";
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
