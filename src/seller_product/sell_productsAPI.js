import express from "express";
import { Random } from "../../lib/random.js";
const random = new Random;

export default function NewAPISellerProducts(SellerProductsCTRL) {
    const app = express();

    app.post("/add", async (req, res) => {
        const data = Object.assign({ _id: random.alphabet(12) }, req.body);
        const doc = await SellerProductsCTRL.addProduct(data);
        res.json(doc);
    })

    app.post("/update", async (req, res) => {
        const data = req.body;
        const doc = await SellerProductsCTRL.updateProduct(data);
        res.json(doc);
    })

    app.post("/delete", async (req, res) => {
        const params = req.body;
        const doc = await SellerProductsCTRL.deleteProduct(params);
        res.json(doc);
    })

    return app;
}