import { DispatchMessageUseCase } from "../../../application/useCases/DispatchMessageUseCase";
import { Server } from "socket.io";
import { SocketIOMessageDispatcher } from "../../adapters/SocketIOMessageDispatcher";
import { Request, Response } from "express";
import { BroadcastMessageUseCase } from "../../../application/useCases/BroadcastMessageUseCase";

export class DispatchMessageController {
    private readonly dispatchMessageUseCase: DispatchMessageUseCase;
    private readonly broadcastMessageUseCase: BroadcastMessageUseCase;

    constructor(io: Server) {
        const messageDispatcher = new SocketIOMessageDispatcher(io);
        this.dispatchMessageUseCase = new DispatchMessageUseCase(
            messageDispatcher,
        );
        this.broadcastMessageUseCase = new BroadcastMessageUseCase(
            messageDispatcher,
        );
    }

    public dispatchMessage(req: Request, res: Response): void {
        try {
            const { senderId, recipientId, type, content, timestamp } =
                req.body;

            if (!senderId || !recipientId || !type || !content || !timestamp) {
                res.status(400).json({ error: "Invalid input" });
                return;
            }

            if (recipientId === "*") {
                this.broadcastMessageUseCase.execute(type, content, timestamp);
                res.status(200).json({ delivered: true });
            } else {
                this.dispatchMessageUseCase.execute(
                    senderId,
                    recipientId,
                    type,
                    content,
                    timestamp,
                );
                res.status(200).json({ delivered: true });
            }
        } catch (error) {
            res.status(500).json({
                error:
                    error instanceof Error
                        ? error.message
                        : "An unknown error occurred",
            });
        }
    }
}
