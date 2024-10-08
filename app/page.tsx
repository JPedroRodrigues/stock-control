"use client"

import { useState } from "react";
import { socket } from "@/lib/socket";
import { DataTable } from "@/components/DataTable";
import { columns } from "@/app/products/columns";
import { CreateProduct } from "@/app/products/CreateProduct";
import { FilterProducts } from "@/app/products/FilterProducts";

// const data: Product[] = [
//     {
//         _id: "ce32cc24-8eba-42b0-a71f-b97accb8a817",
//         name: "🥬 Alface",
//         quantity: 10,
//         price: 12.90,
//     },
//     {
//         _id: "3bb85864-3acf-44be-8514-dec01cc15b3b",
//         name: "🍅 Tomate",
//         quantity: 5,
//         price: 18.00,
//     },
//     {
//         _id: "2c83599c-cd7d-4d40-8626-426800ca9922",
//         name: "🍌 Banana",
//         quantity: 20,
//         price: 11.30,
//     },
//     {
//         _id: "cd57421d-6c37-4466-8240-14801d490b90",
//         name: "🫘 Feijão",
//         quantity: 12,
//         price: 23.90,
//     },
//     {
//         _id: "e700a026-95e1-45e9-9694-706522dd03e5",
//         name: "🍏 Maçã",
//         quantity: 23,
//         price: 19.90,
//     },
// ]

export const dynamic = 'force-dynamic';

export default function Home() {
  const [connection, setConnection] = useState(socket.connected);
  const [products, setProducts] = useState([]);

  function onConnect() {
    if (!connection) {
      setConnection(true);
      socket.emit("get-products");
    }
  }

  function onDisconnect() {
    if (connection) setConnection(false);
  }

  socket.on("connect", onConnect);
  socket.on("disconnect", onDisconnect);

  socket.on("products-data", (data) => {
    setProducts(data);
  });

  socket.on("update-products-interface", async () => {
      const response = await fetch("/api/products/all", {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
          throw new Error("Failed to add a new product");
      }

      const result = await response.json();
      setProducts(result.products);
  });

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold">Estoque</h1>

        <div className="flex items-center justify-between">
            <FilterProducts />
            <CreateProduct />
        </div>

        <DataTable columns={columns} data={products} />
    </div>
  );
}
