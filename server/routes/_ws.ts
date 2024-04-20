function generateSessionId(): string {
    return Math.random().toString(36).substring(2, 10);
}
const clients = new Map<string, WebSocket>();

export default defineWebSocketHandler({
    open(peer) {
        const id = generateSessionId();
        clients.set(id, peer);
        console.log("[ws] open", peer, "Session ID:", id);
    },
    message(peer, message) {
        console.log("[ws] message", peer, message);
        for(const client of clients.values()) {
            client.send(message.text());
        }
    },
    close(peer, event) {
        let id = "";
        for (const [key, value] of clients.entries()) {
            if (value === peer) {
                id = key;
                break;
            }
        }
        clients.delete(id);
        console.log("[ws] close", peer, "Session ID:", id, event);
    },
    error(peer, error) {
        console.log("[ws] error", peer, error);
    },
});