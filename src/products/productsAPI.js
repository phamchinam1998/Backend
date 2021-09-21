import express from "express";
import { Random } from "../../lib/random.js";
const random = new Random;

export default function NewAPIProducts(ProductsCTRL) {
    const app = express();

    app.get("/listdefault", async (req, res) => {
        const params = {
            keyword: req.query.keyword,
            current_page: req.query.current_page,
        }
        const data = await ProductsCTRL.listProductsDefault(params);
        res.json(data);
    })

    app.get("/getname", async (req, res) => {
        let query = {};
        if (req.query.shop_id) {
            query = { shop_id: req.query.shop_id }
        }
        const doc = await ProductsCTRL.getName(query);
        res.json(doc);
    })

    app.post("/list", async (req, res) => {
        const params = {
            current_page: req.query.current_page,
            query: req.body.query,
            sort: req.body.sort,
        }
        const docs = await ProductsCTRL.listProducts(params);
        res.json(docs);

    })

    app.get("/get", async (req, res) => {
        const id = req.query.id;
        const doc = await ProductsCTRL.getProduct(id);
        res.json(doc);
    })
    return app;
}