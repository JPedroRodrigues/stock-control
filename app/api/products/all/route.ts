import { connectToDatabase } from "@/lib/dbConnection";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const collection = await connectToDatabase();

        if (!collection) {
            return NextResponse.json({
                message: "Database connection failed",
            }, { status: 500 });
        }

        const result = await collection.find().toArray();

        return NextResponse.json({
            message: `Products requested with success`,
            products: result
        }, { status: 200 });
    } catch (excp) {
        return NextResponse.json({
            message: "Error while requesting all products",
            error: excp!.toString()
        }, { status: 500 });
    }
}
