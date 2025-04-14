import { Message } from "../../domain/entities/Message";

export interface IMessageDispatcher {
    dispatch(recipientId: string, message: Message): void;
}
