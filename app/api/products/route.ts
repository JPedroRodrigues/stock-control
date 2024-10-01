import { connectToDatabase } from "@/lib/dbConnection";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const collection = await connectToDatabase();

            if (!collection) {
                return res.status(500).json({
                    message: "Database connection failed",
                });
            }

            const product = req.body
            const result = await collection.insertOne(product);

            res.status(201).json({
                message: `Product ${product.name} added with success`,
                producId: result.insertedId
            });
        } catch (excp) {
            res.status(500).json({
                message: "Error while adding a new product",
                error: excp!.toString()
            });
        }
    } else {
        res.status(405).json({
            message: "Method not allowed"
        })
    }
}