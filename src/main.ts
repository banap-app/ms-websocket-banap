import { createServer } from "node:http";
import { createWebSocketServer } from "./infrastructure/websocket/WebSocketServer";
import { createExpressApp } from "./infrastructure/http/ExpressApp";
import { DispatchMessageController } from "./infrastructure/api/controllers/DispatchMessageController";

const app = createExpressApp();
const httpServer = createServer(app);
const io = createWebSocketServer(httpServer);

const dispatchMessageController = new DispatchMessageController(io);

app.post("/dispatch", (req, res) =>
    dispatchMessageController.dispatchMessage(req, res),
);

httpServer.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});
