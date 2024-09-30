import { Button } from "../components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "../components/ui/input";
import { DataTable } from "./DataTable";
import { Product, columns } from "@/app/products/columns";
import { Search, PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "../components/ui/dialog"

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

                <form className="flex items-center gap-2">
                <Input name="id" placeholder="Id do pedido" className="w-auto"></Input>
                <Input name="id" placeholder="Nome do produto" className="w-auto"></Input>
                <Button type="submit" variant="secondary">
                    <Search className="w-4 h-4 mr-2"/>
                    Filtrar resultados
                </Button>
                </form>

                <Dialog>
                <DialogTrigger asChild>
                    <Button className="flex items-center">
                        <PlusCircle className="w-4 h-4 mr-2"/>
                        Novo Produto
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Novo Produto</DialogTitle>
                    <DialogDescription>Adicionar informações do produto</DialogDescription>
                    </DialogHeader>

                    <form action="" className="space-y-6">
                        <div className="grid grid-cols-4 items-center text-right gap-3">
                            <Label htmlFor="name">Produto</Label>
                            <Input className="col-span-3" placeholder="Nome do produto" id="name"/>
                        </div>

                        <div className="grid grid-cols-4 items-center text-right gap-3">
                            <Label htmlFor="quantity">Quantidade</Label>
                            <Input className="col-span-3" type="number" placeholder="Quantidade em estoque" id="quantity"/>
                        </div>

                        <div className="grid grid-cols-4 items-center text-right gap-3">
                            <Label htmlFor="price">Preço</Label>
                            <Input className="col-span-3" type="number" placeholder="Preço" id="price"/>
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                            <Button type="button" variant={"outline"}>Cancelar</Button>
                            </DialogClose>
                            <Button type="submit">Salvar</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
                </Dialog>
                
            </div>

            <DataTable columns={columns} data={data} />
        </div>
    );
}