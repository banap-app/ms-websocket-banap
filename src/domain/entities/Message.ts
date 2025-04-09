import { MessageID } from "../MessageID";
import { MessageType } from "../MessageType";

export class Message {
    constructor(
        public readonly id: MessageID,
        public readonly senderId: string | null, // null for system messages
        public readonly recipientId: string,
        public readonly type: MessageType, // e.g., 'notification', 'chat', 'system'
        public readonly content: string,
        public readonly timestamp: Date,
    ) {}

    static create(
        senderId: string,
        recipientId: string,
        type: MessageType,
        content: string,
        timestamp: Date,
        id?: MessageID,
    ): Message {
        return new Message(
            id ?? MessageID.create(),
            senderId,
            recipientId,
            type,
            content,
            timestamp,
        );
    }
}
