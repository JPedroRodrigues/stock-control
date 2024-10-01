import { z } from "zod";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

const filterProductsSchema = z.object({
    id: z.string(),
    name: z.string()
});

type FilterProductsSchema = z.infer<typeof filterProductsSchema>;

export function FilterProducts() {
    const { register, handleSubmit } = useForm<FilterProductsSchema>({
        resolver: zodResolver(filterProductsSchema),
    })

    function handleFilterProducts(data: FilterProductsSchema) {
        console.log(data);
    }

    return (
        <form className="flex items-center gap-2" onSubmit={handleSubmit(handleFilterProducts)}>
                <Input placeholder="Id do pedido" className="w-auto" {...register("id")}/>
                <Input placeholder="Nome do produto" className="w-auto" {...register("name")}/>

                <Button type="submit" variant="secondary">
                    <Search className="w-4 h-4 mr-2"/>
                    Filtrar resultados
                </Button>
        </form>
    );
}