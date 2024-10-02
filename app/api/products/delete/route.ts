import { connectToDatabase } from "@/lib/dbConnection";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function DELETE(req: Request) {
    try {
        const collection = await connectToDatabase();

        if (!collection) {
            return NextResponse.json({
                message: "Database connection failed",
            }, { status: 500 });
        }

        const productId = await req.json();
        console.log(productId);
        const result = await collection.deleteOne({ _id: productId });

        return NextResponse.json({
            message: `Product with id "${productId}" deleted with success`,
            acknowledged: result.acknowledged
        }, { status: 202 });
    } catch (excp) {
        return NextResponse.json({
            message: "Error while adding a new product",
            error: excp!.toString()
        }, { status: 500 });
    }
}
