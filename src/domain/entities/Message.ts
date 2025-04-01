export class Message {
    constructor(
        public readonly id: string,
        public readonly senderId: string | null, // null for system messages
        public readonly recipientId: string,
        public readonly type: string, // e.g., 'notification', 'chat', 'system'
        public readonly content: string,
        public readonly timestamp: Date,
    ) {}
}
