import express from "express";

export default function NewAPICart(CartCTRL) {
    const app = express();

    app.post("/cartsync", async (req, res) => {
        const cart = req.body.cart ? req.body.cart.split('&') : [];
        const params = {
            cart: cart,
            id: req.body.id,
        }
        const response = await CartCTRL.cartSync(params);
        res.json(response);
    });

    app.post("/deleteall", async (req, res) => {
        const result = await CartCTRL.deleteCart(req.body.id);
        if (result) {
            res.json("Success");
            res.status(200);
        }
    })

    app.post("/deleteitem", async (req, res) => {
        const params = {
            id: req.body.id,
            item_id: req.body.item_id,
        }
        const result = await CartCTRL.deleteCartItem(params);
        if (result) {
            res.json("Success");
            res.status(200);
        }
    })
    app.post("/additem", async (req, res) => {
        const params = {
            id: req.body.id,
            item_id: req.body.item_id,
        }
        const result = await CartCTRL.addCartItem(params);
        if (result) {
            res.json("Success");
            res.status(200);
        }
    })
    return app;
}