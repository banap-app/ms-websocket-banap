import { DispatchMessageUseCase } from "../../../application/useCases/DispatchMessageUseCase";
import { Server } from "socket.io";
import { SocketIOMessageDispatcher } from "../../adapters/SocketIOMessageDispatcher";
import { Request, Response } from "express";

export class DispatchMessageController {
    private readonly dispatchMessageUseCase: DispatchMessageUseCase;

    constructor(io: Server) {
        const messageDispatcher = new SocketIOMessageDispatcher(io);
        this.dispatchMessageUseCase = new DispatchMessageUseCase(
            messageDispatcher,
        );
    }

    // TODO:
    // public dispatchMessage(req: Request, res: Response): void {

    // }
}
