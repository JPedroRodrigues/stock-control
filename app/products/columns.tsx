"use client"

import { socket } from "@/lib/socket";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table"
import { UUID } from "crypto";
import { DeleteItem } from "@/components/DeleteItem";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogDescription,
    DialogTitle,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog";

export type Product = {
    _id: UUID
    name: string
    quantity: number
    price: number
}

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "_id",
        header: () => <div className="text-left">ID</div>,
        cell: ({ row }) => {     
          return <div className="text-left font-medium">{row.getValue("_id")}</div>
        },
    },
    {
        accessorKey: "name",
        header: () => <div className="text-left">Nome do Produto</div>,
        cell: ({ row }) => {     
          return <div className="text-left font-medium">{row.getValue("name")}</div>
        },
    },
    {
        accessorKey: "quantity",
        header: () => <div className="text-center">Quantidade</div>,
        cell: ({ row }) => {     
          return <div className="text-center font-medium">{row.getValue("quantity")}</div>
        },
    },
    {
        accessorKey: "price",
        header: () => <div className="text-center">Preço</div>,
        cell: ({ row }) => {
          const price = parseFloat(row.getValue("price"))
          const formatted = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(price)
     
          return <div className="text-center font-medium">{formatted}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            function onDeleteProduct() {
                const productId = row.getValue("_id");

                socket.emit("delete-product", productId);
            }

            return (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button type="button" variant={"ghost"}>
                            <DeleteItem />
                        </Button>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle >Tem certeza que deseja excluir esse produto?</DialogTitle>
                            <DialogDescription>Os dados, uma vez excluídos, não serão recuperados</DialogDescription>
                        </DialogHeader>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button">Não</Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button type="button" variant={"secondary"} onClick={onDeleteProduct}>Sim</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )
        },
    },
]

