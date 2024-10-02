import next from "next";
import * as dotenv from 'dotenv';
import { Server } from "socket.io";
import { createServer } from "http";
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(async () => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log(`A client with id "${socket.id}" has connected`);

    // socket.on("get-products", () => {
    //     io.emit("update-products-interface");
    // });

    socket.on("post-product", async (data) => {
        const product = {_id: uuidv4(), ...data};
        try {
            const products_api = process.env.PRODUCTS_API;

            const response = await fetch(`${products_api}/api/products`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });

            if (!response.ok) {
                throw new Error("Failed to add a new product");
            }

            const result = await response.json();
            console.log(`New product added: ${JSON.stringify(result)}`);

            io.emit("update-products-interface");
        } catch (error) {
            console.log(`Error while creating product ${product.name}: ${error}`);
        }
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