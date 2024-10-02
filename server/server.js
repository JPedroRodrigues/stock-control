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
    const products_api = process.env.PRODUCTS_API;

    socket.on("get-products", async () => {
        const response = await fetch(`${products_api}/api/products/all`, {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          },
          cache: 'no-store', // Disable caching
        });
        
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const result = await response.json();
        socket.emit("products-data", result.products);
    });

    socket.on("post-product", async (data) => {
        const product = {_id: uuidv4(), ...data};
        try {
            const response = await fetch(`${products_api}/api/products`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                },
                body: JSON.stringify(product),
                cache: "no-store"
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

    socket.on("delete-product", async (productId) => {
        try {
            const response = await fetch(`${products_api}/api/products/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "text/plain",
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                },
                body: JSON.stringify(productId),
                cache: "no-store"
            });

            if (!response.ok) {
                throw new Error("Failed to delete a product");
            }

            console.log(`Product "${JSON.stringify(productId)}" deleted with success`);

            io.emit("update-products-interface");
        } catch (error) {
            console.log(`Error while deleting product with id "${productId}": ${error}`);
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