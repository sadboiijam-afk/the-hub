import { WebSocketServer } from "ws";

export interface RealtimeServerOptions {
  readonly port: number;
}

export interface RealtimeHello {
  readonly type: "hello";
  readonly service: "realtime";
  readonly version: string;
}

export function createHelloMessage(): RealtimeHello {
  return {
    type: "hello",
    service: "realtime",
    version: "0.0.0"
  };
}

export function startRealtimeServer(options: RealtimeServerOptions): WebSocketServer {
  const server = new WebSocketServer({
    port: options.port
  });

  server.on("connection", (socket) => {
    socket.send(JSON.stringify(createHelloMessage()));
  });

  return server;
}

if (process.env.NODE_ENV !== "test") {
  const port = Number(process.env.PORT ?? 4010);
  startRealtimeServer({ port });
  console.log(`Realtime service listening on ${port}`);
}
