import express from "express";
import cors from "cors";
import { Server as SocketIOServer } from "socket.io";
import { DispatchMessageController } from "../api/controllers/DispatchMessageController";

export function createExpressApp(io: SocketIOServer) {
    const app = express();

    app.use(cors());
    app.use(express.json());

    const dispatchMessageController = new DispatchMessageController(io);

    app.post("/dispatch", (req, res) => {
        dispatchMessageController.dispatchMessage(req, res);
    });

    return app;
}
