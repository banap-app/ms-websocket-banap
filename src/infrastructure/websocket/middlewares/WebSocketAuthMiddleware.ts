import { Socket } from "socket.io";

export async function VerifyTokenMiddleware(
    socket: Socket,
    next: (err?: Error) => void,
): Promise<void> {
    const token = socket.handshake.auth.token;

    if (!token) {
        return next(new Error("Authentication token required"));
    }

    try {
        const response = await fetch("http://localhost:8192/api/auth/verify", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (!response.ok) {
            const errorMessage = data.errors?.[0]?.message;
            throw new Error(errorMessage);
        }

        next();
    } catch (error) {
        return next(
            new Error(
                error instanceof Error
                    ? error.message
                    : "An unknown error ocurred",
            ),
        );
    }
}
