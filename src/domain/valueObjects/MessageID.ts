import { v4 as uuidv4, validate as uuidValidate } from "uuid";

export class MessageID {
    private constructor(private readonly value: string) {
        if (!uuidValidate(value)) {
            throw new Error("Invalid UUID for MessageID");
        }
    }

    public static create(value?: string): MessageID {
        return new MessageID(value ?? uuidv4());
    }

    public toString(): string {
        return this.value;
    }
}
