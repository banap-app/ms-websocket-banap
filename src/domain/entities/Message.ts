import { MessageID } from "../valueObjects/MessageID";
import { MessageType } from "../valueObjects/MessageType";
import { UserID } from "../valueObjects/UserID";

export class Message {
    constructor(
        public readonly id: MessageID,
        public readonly senderId: UserID | null, // null for system messages
        public readonly recipientId: UserID,
        public readonly type: MessageType, // e.g., 'notification', 'chat', 'system'
        public readonly content: string,
        public readonly timestamp: Date,
    ) {}

    static create(
        senderId: UserID,
        recipientId: UserID,
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
