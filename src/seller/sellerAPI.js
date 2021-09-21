import express from "express";
export default function NewAPISeller(SellerCTRL) {
    const app = express();

    app.get("/get", async (req, res) => {
        const id = req.body.id
        if (req.body.type === "seller") {
            const doc = await SellerCTRL.getSeller(id);
            res.json(doc);
        }
    })

    return app;
}