import { MessageID } from "../valueObjects/MessageID";
import { MessageType } from "../valueObjects/MessageType";
import { UserID } from "../valueObjects/UserID";

export class Message {
    constructor(
        public readonly id: MessageID,
        public readonly senderId: UserID | null,
        public readonly recipientId: UserID | null,
        public readonly type: MessageType, // e.g., 'notification', 'chat', 'system'
        public readonly content: string,
        public readonly timestamp: Date,
    ) {}

    static create(
        senderId: UserID | null,
        recipientId: UserID | null,
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

    public toJSON() {
        return {
            id: this.id.toString(),
            senderId: this.senderId?.toString() || null,
            recipientId: this.recipientId?.toString() || null,
            type: this.type.toString(),
            content: this.content,
            timestamp: this.timestamp.toISOString(),
        };
    }
}
