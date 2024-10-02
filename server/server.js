import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log(`A client with id "${socket.id}" has connected`);

    // socket.on("get-products", () => {
    //     io.emit("update-products-interface");
    // });

    socket.on("post-product", () => {
        io.emit("update-products-interface");
    });

    socket.on("disconnect", (cause) => {
        console.log(`Client with Id "${socket.id} has disconnected due to: ${cause}."`);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});