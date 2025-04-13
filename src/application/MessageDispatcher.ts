import { Message } from "../domain/entities/Message";

export interface MessageDispatcher {
    dispatch(recipientId: string, message: Message): void;
}
