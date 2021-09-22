import express from "express";

export default function NewAPILogin(AccountCTRL) {
    const app = express();

    app.post("/login", async (req, res) => {
        const params = {
            username: req.body.username,
            password: req.body.password,
            type: req.body.type,
        }
        const result = await AccountCTRL.verifyAccount(params);
        res.json(result);
    })

    app.get("/active", async (req, res) => {
        const account_id = req.query.account_id;
        const result = await AccountCTRL.activeAccount(account_id);
        res.json(result);
    })

    app.post("/changepassword", async (req, res) => {
        const params = req.body;
        const result = await AccountCTRL.changePW(params);
        res.json(result);
    })

    app.post("/forgotpw", async (req, res) => {
        const params = req.body;
        const result = await AccountCTRL.forgotPW(params);
        res.json(result);
    })

    app.get("/validateUserName", async (req, res) => {
        const user_name = req.query.username;
        const result = await AccountCTRL.validateUserName(user_name);
        res.json(result);
    })

    app.post("/register", async (req, res) => {
        res.json("success");
        // const data = req.body;
        // const result = await AccountCTRL.createAccount(data);
        // if (result === "success") {
        //     res.json(result);
        // }
        // if (result === "failed") {
        //     res.status(500);
        // }
    })

    return app;
}