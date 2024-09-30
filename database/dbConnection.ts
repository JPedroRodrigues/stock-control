import { MongoClient } from "mongodb";

async function connectToDatabase() {
    const uri = process.env.MONGODB_URI
    const client = new MongoClient(uri!.toString());
    
    try {
        await client.connect();
    
        const db = client.db("projects");
        const collection = db.collection("stock-db");
    
        console.log(`Connected with database successfully: ${collection.namespace}`)
    } catch (error) {
        const errorMessage = {
            message: "Error while connecting to database",
            error: error,
        }
        console.log(JSON.stringify(errorMessage));
    }
}

connectToDatabase();