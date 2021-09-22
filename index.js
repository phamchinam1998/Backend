import express from "express";
import DotENV from "dotenv/config";
import cors from "cors";
const { dotenv } = DotENV;
import Connect from "./lib/mongodb.js";
import Authorization from "./src/middleware/authorization.js";
//Customer
import { NewAPICustomer } from "./src/customers/customer.api.js";
import { Controller } from "./src/customers/customer.controller.js";
import { Model } from "./src/customers/customer.model.js";
// //Account
import NewAPILogin from "./src/account/accountAPI.js";
import AccountCTRLBase from "./src/account/accountCTRL.js";
import AccountModelBase from "./src/account/accountModel.js";
//Products
import NewAPIProducts from "./src/products/productsAPI.js";
import ProductsCTRLBase from "./src/products/productsCTRL.js";
import ProductsModelBase from "./src/products/productsModel.js";
//Cart
import NewAPICart from "./src/cart/cartAPI.js";
import CartCTRLBase from "./src/cart/cartCTRL.js";
import CartModelBase from "./src/cart/cartModel.js";
//Seller
import NewAPISeller from "./src/seller/sellerAPI.js";
import SellerCTRLBase from "./src/seller/sellerCTRL.js";
import SellerModelBase from "./src/seller/sellerModel.js";
//SellerProduct
import NewAPISellerProducts from "./src/seller_product/sell_productsAPI.js";
import SellerProductsCTRLBase from "./src/seller_product/seller_productsCTRL.js";
import SellerProductsModelBase from "./src/seller_product/seller_productsModel.js";

async function main() {
    const database = await (await Connect(process.env.DB_URL)).db(process.env.DB_NAME);
    console.log(`${new Date().toLocaleString()} - Connect MongoDB with DB Name : ${process.env.DB_NAME}`)
    //************************************************************************************ */
    const CustomerModel = new Model(database);
    const CustomerCTRL = new Controller(CustomerModel);
    //************************************************************************************ */
    const ProductsModel = new ProductsModelBase(database);
    const ProductsCTRL = new ProductsCTRLBase(ProductsModel);
    //************************************************************************************ */
    const SellerProductsModel = new SellerProductsModelBase(database);
    const SellerProductsCTRL = new SellerProductsCTRLBase(SellerProductsModel);
    //************************************************************************************ */
    const CartModel = new CartModelBase(database);
    const CartCTRL = new CartCTRLBase(CartModel);
    //************************************************************************************ */
    const SellerModel = new SellerModelBase(database);
    const SellerCTRL = new SellerCTRLBase(SellerModel);
    //************************************************************************************ */
    const AccountModel = new AccountModelBase(database);
    const AccountCTrL = new AccountCTRLBase(AccountModel, SellerModel, CustomerModel, CartModel);
    //************************************************************************************ */
    const app = express();
    app.use(express.json());
    const corsconfig = {
        origin: "https://demo-ecomerce-react.herokuapp.com",
        optionsSuccessStatus: 200,
    }
    app.use(cors(corsconfig));
    app.disable("x-powered-by");
    app.use('/testserver', (req, res, next) => {
        res.json("Success")
    })
    app.use("/authorization", Authorization);
    app.use("/account", NewAPILogin(AccountCTrL));
    app.use("/products", NewAPIProducts(ProductsCTRL));
    app.use("/authorization/customer", NewAPICustomer(CustomerCTRL));
    app.use("/authorization/products", NewAPISellerProducts(SellerProductsCTRL));
    app.use("/authorization/cart", NewAPICart(CartCTRL));
    app.use("/authorization/seller", NewAPISeller(SellerCTRL))
    /****************************************************************************/
    //server listen
    console.log(`${new Date().toLocaleString()} - Server listen on ${process.env.PORT}`);
    app.listen(process.env.PORT, (err) => {
        if (err) {
            console.log(err);
        }
    });
}

main().catch(err => console.log(err));
