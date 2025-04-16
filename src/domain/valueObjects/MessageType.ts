import { MessageType as MessageTypeEnum } from "../enums/MessageType";

export class MessageType {
    private constructor(private readonly value: MessageTypeEnum) {}

    public static create(value: string): MessageType {
        if (
            !Object.values(MessageTypeEnum).includes(value as MessageTypeEnum)
        ) {
            throw new Error(`Invalid message type: ${value}`);
        }
        return new MessageType(value as MessageTypeEnum);
    }

    public getValue(): MessageTypeEnum {
        return this.value;
    }

    public toString(): string {
        return this.value;
    }
}
