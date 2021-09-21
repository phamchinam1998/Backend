import mongoclient from "mongodb"
const { MongoClient } = mongoclient;

export default async function Connect(url) {
    const client = new MongoClient(url, { useUnifiedTopology: true, useNewUrlParser: true });
    await client.connect();
    return client;
}
