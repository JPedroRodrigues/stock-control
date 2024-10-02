import { z } from "zod";
// import { v4 as uuidv4 } from 'uuid';
import { socket } from "@/lib/socket";
import { useForm } from "react-hook-form";
import { PlusCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"

const createProductShema = z.object({
    name: z.string(),
    quantity: z.coerce.number(),
    price: z.coerce.number()
})

type CreateProductSchema = z.infer<typeof createProductShema>

export function CreateProduct() {
    const { register, handleSubmit } = useForm<CreateProductSchema>({
        resolver: zodResolver(createProductShema),
    });

    async function handleCreateProduct(data: CreateProductSchema) {
            socket.emit("post-product", data);
    }

    return (
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

                <form onSubmit={handleSubmit(handleCreateProduct)} className="space-y-6">
                    <div className="grid grid-cols-4 items-center text-right gap-3">
                        <Label htmlFor="name">Produto</Label>
                        <Input className="col-span-3" placeholder="Nome do produto" id="name" {...register("name")}/>
                    </div>

                    <div className="grid grid-cols-4 items-center text-right gap-3">
                        <Label htmlFor="quantity">Quantidade</Label>
                        <Input className="col-span-3" type="number" placeholder="Quantidade em estoque" id="quantity" {...register("quantity")}/>
                    </div>

                    <div className="grid grid-cols-4 items-center text-right gap-3">
                        <Label htmlFor="price">Preço</Label>
                        <Input className="col-span-3" type="number" step={"0.01"} placeholder="Preço" id="price" {...register("price")}/>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant={"outline"}>Cancelar</Button>
                        </DialogClose>
                        <DialogClose>
                            <Button type="submit">Salvar</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}