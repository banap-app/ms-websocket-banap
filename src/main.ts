import { createServer } from "node:http";
import { createWebSocketServer } from "./infrastructure/websocket/WebSocketServer";
import { createExpressApp } from "./infrastructure/http/ExpressApp";

const httpServer = createServer();
const io = createWebSocketServer(httpServer);
const app = createExpressApp(io);

httpServer.on("request", app);

httpServer.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});
