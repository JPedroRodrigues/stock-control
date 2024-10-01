import { DataTable } from "./DataTable";
import { CreateProduct } from "@/app/products/CreateProduct";
import { FilterProducts } from "@/app/products/FilterProducts";
import { Product, columns } from "@/app/products/columns";


export const data: Product[] = [
    {
      id: "ce32cc24-8eba-42b0-a71f-b97accb8a817",
      name: "🥬 Alface",
      quantity: 10,
      price: 12.90,
    },
    {
        id: "3bb85864-3acf-44be-8514-dec01cc15b3b",
        name: "🍅 Tomate",
        quantity: 5,
        price: 18.00,
    },
    {
        id: "2c83599c-cd7d-4d40-8626-426800ca9922",
        name: "🍌 Banana",
        quantity: 20,
        price: 11.30,
    },
    {
        id: "cd57421d-6c37-4466-8240-14801d490b90",
        name: "🫘 Feijão",
        quantity: 12,
        price: 23.90,
    },
    {
        id: "e700a026-95e1-45e9-9694-706522dd03e5",
        name: "🍏 Maçã",
        quantity: 23,
        price: 19.90,
    },
]

export default function Main() {
    return (
        <div className="p-6 max-w-4xl mx-auto space-y-4">
            <h1 className="text-3xl font-bold">Estoque</h1>

            <div className="flex items-center justify-between">
                <FilterProducts />

                <CreateProduct />
            </div>

            <DataTable columns={columns} data={data} />
        </div>
    );
}