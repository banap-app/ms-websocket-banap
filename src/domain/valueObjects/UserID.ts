import { validate as uuidValidate } from "uuid";

export class UserID {
    private constructor(private readonly value: string) {
        if (!uuidValidate(value)) {
            throw new Error("Invalid UUID for UserID");
        }
    }

    public static from(value: string): UserID {
        return new UserID(value);
    }

    public getValue(): string {
        return this.value;
    }

    public toString(): string {
        return this.value;
    }
}
