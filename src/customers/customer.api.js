import express from "express";
import { checkGender } from "../../lib/err.js";
import { CustomerNS } from "./customer.js";
export function NewAPICustomer(CustomerCTL) {
    const app = express();

    app.get("/list", async (req, res) => {
        const current_page = req.query.current_page;
        const docs = await CustomerCTL.listCustomer(current_page);
        res.json(docs);
    })

    app.get("/get", async (req, res) => {
        if (req.body.type === "customer") {
            const params = CustomerNS.QuerryCustomerParams = {};
            if (req.body.id) {
                params.id = req.body.id;
            }
            const doc = await CustomerCTL.getCustomer(params);
            res.json(doc);
        }
    })

    app.post("/create", async (req, res) => {
        const params = CustomerNS.CreateCustomerParams = {
            full_name: req.body.full_name,
            gender: checkGender(req.body.gender),
            birthday: req.body.birthday
        }
        const doc = await CustomerCTL.createCustomer(params);
        res.json(doc);
    })

    app.post("/update", async (req, res) => {
        const id = req.query.id;
        const params = CustomerNS.UpdateCustomerParams = {};
        if (req.body.full_name) {
            params.full_name = req.body.full_name;
        }
        if (req.body.gender) {
            params.gender = checkGender(req.body.gender);
        }
        if (req.body.birthday) {
            params.birthday = req.body.birthday;
        }
        const doc = await CustomerCTL.updateCustomer(id, params);
        res.json(doc);
    })

    app.get("/delete", async (req, res) => {
        const params = CustomerNS.QuerryCustomerParams = {};
        if (req.query.id) {
            params.id = req.query.id;
        }
        if (req.query.code) {
            params.code = req.query.code;
        }
        const doc = await CustomerCTL.deleteCustomer(params);
        res.json(doc);
    })
    return app;
}

//netstat -ano | findstr :8080
//taskkill /PID <PID> /F