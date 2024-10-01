import { connectToDatabase } from "@/lib/dbConnection";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const collection = await connectToDatabase();

        if (!collection) {
            return NextResponse.json({
                message: "Database connection failed",
            }, { status: 500 });
        }

        const product = await req.json();
        console.log(product);
        const result = await collection.insertOne(product);

        return NextResponse.json({
            message: `Product ${product.name} added with success`,
            producId: result.insertedId
        }, { status: 201 });
    } catch (excp) {
        return NextResponse.json({
            message: "Error while adding a new product",
            error: excp!.toString()
        }, { status: 500 });
    }
}
