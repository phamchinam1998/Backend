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
        await CartCTRL.deleteCart(req.body.id);
    })

    app.post("/deleteitem", async (req, res) => {
        const params = {
            id: req.body.id,
            item_id: req.body.item_id,
        }
        await CartCTRL.deleteCartItem(params);
    })
    app.post("/additem", async (req, res) => {
        const params = {
            id: req.body.id,
            item_id: req.body.item_id,
        }
        await CartCTRL.addCartItem(params);
    })
    return app;
}