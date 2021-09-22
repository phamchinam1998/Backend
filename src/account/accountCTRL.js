import { Random } from "../../lib/random.js";
import jwt from 'jsonwebtoken';
import Dotenv from "dotenv/config";
const { dotenv } = Dotenv;
import nodemailer from "nodemailer";

const rand = new Random();

export default class AccountCTRLBase {
    constructor(AccountModel, SellerModel, CustomerModel, CartModel) {
        this.AccountModel = AccountModel;
        this.SellerModel = SellerModel;
        this.CustomerModel = CustomerModel;
        this.CartModel = CartModel;
    }

    async forgotPW(params) {
        let authen = false;
        const customer = await this.AccountModel.getUsername(params);
        if (customer) {
            let mail;
            switch (customer.type) {
                case "customer":
                    mail = await this.CustomerModel.getCustomer({ id: customer.id })
                    if (mail.email == params.email) {
                        authen = true;
                    }
                    break;
                case "seller":
                    mail = await this.SellerModel.getSeller(customer.id)
                    if (mail.email == params.email) {
                        authen = true;
                    }
                    break;
                default:
                    break;
            }
        }
        if (authen) {
            const newpw = rand.alphabet(8);
            const formMail = {
                email: params.email,
                subject: "Mail thiếp lập lại mật khẩu",
                text: "Mail thiết lập lại mật khẩu",
                html: `<h1>Mail thiết lập lại mật khẩu</h1><h4>Mật khẩu mới của bạn là :</h4>
                <h5>${newpw}</h5>`,
            }
            const result = await this.SendMail(formMail);
            if (result.response) {
                const changepw = await this.AccountModel.updateCustomer({
                    id: customer.id,
                    query: { password: newpw },
                })
                return changepw;
            }
            else return false;
        }
    }

    async changePW(params) {
        const account = {
            username: params.username,
            password: params.password,
            type: params.type,
        }
        const doc = await this.AccountModel.getAccount(account);
        if (doc) {
            const query = { password: params.new_password }
            return await this.AccountModel.updateCustomer({
                id: doc._id,
                query: query,
            })
        }
        else return false;
    }

    async activeAccount(account_id) {
        const result = this.AccountModel.activeAccount(account_id);
        return result;
    }

    async validateUserName(username) {
        const result = this.AccountModel.validateUserName(username);
        return result;
    }

    async verifyAccount(params) {
        const username = params.username;
        const doc = await this.AccountModel.getAccount(params);
        if (doc === "verify") {
            return doc;
        }
        else {
            if (doc) {
                const token = jwt.sign({
                    user_id: doc._id,
                    user: username,
                    type: params.type,
                    iat: Math.floor(Date.now() / 1000),
                    exp: Math.floor(Date.now() / 1000) + (60 * 60)
                }, process.env.SECRET_KEY)
                return {
                    token: token,
                    username: username,
                    authentication: true,
                };
            }
        }
    }

    async SendMail(params) {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "phamchinam1998@gmail.com",
                pass: "process.env.MAILPW",
            },
        });
        let info = await transporter.sendMail({
            from: "phamchinam1998@gmail.com",
            to: params.email,
            subject: params.subject,
            text: params.text,
            html: params.html,
        }).then(res => { return res });
        return info;
    }

    async createAccount(params) {
        const account_id = rand.alphabet(12);
        const account = {
            _id: account_id,
            user_name: params.username,
            password: params.password,
            type: params.type,
            status: "verify",
        }
        const user_info = {
            _id: rand.uppercase(12),
            account_id: account_id,
            phone_number: params.phone,
            email: params.email,
            gender: params.gender,
        }
        return "success";
        // const mail = await this.SendMail({
        //     account_id: account_id,
        //     email: params.email,
        //     subject: "Mail xác nhận đăng ký",
        //     html: `<h1>Mail xác thực đăng ký</h1><h4>Để hoàn tất xác thực vui lòng ấn vào link :</h4><a href="https://demo-ecomerce-react.herokuapp.com/account/verify/${account_id}">Link</a>`,
        // });
        // if (mail.response)
        // if (mail.response) {
        //     await this.AccountModel.createAccount(account);
        //     switch (params.type) {
        //         case "customer":
        //             user_info.customer_name = params.fullname;
        //             const customer = await this.CustomerModel.createCustomer(user_info);
        //             const cart = await this.CartModel.createCart(account_id)
        //             break;
        //         case "seller":
        //             user_info.seller_name = params.fullname;
        //             const seller = await this.SellerModel.createSeller(user_info);
        //             break;
        //         default:
        //             break;
        //     }
        //     return "success";
        // }
        // else return "failed";
    }

    // async createAccount(params) {
    //     const account_id = rand.alphabet(12);
    //     const account = {
    //         _id: account_id,
    //         user_name: params.username,
    //         password: params.password,
    //         type: params.type,
    //         status: "verify",
    //     }
    //     const user_info = {
    //         _id: rand.uppercase(12),
    //         account_id: account_id,
    //         phone_number: params.phone,
    //         email: params.email,
    //         gender: params.gender,
    //     }
    //     const mail = await this.SendMail({
    //         account_id: account_id,
    //         email: params.email,
    //         subject: "Mail xác nhận đăng ký",
    //         html: `<h1>Mail xác thực đăng ký</h1><h4>Để hoàn tất xác thực vui lòng ấn vào link :</h4><a href="https://demo-ecomerce-react.herokuapp.com/account/verify/${account_id}">Link</a>`,
    //     });
    //     if (mail.response) {
    //         await this.AccountModel.createAccount(account);
    //         switch (params.type) {
    //             case "customer":
    //                 user_info.customer_name = params.fullname;
    //                 const customer = await this.CustomerModel.createCustomer(user_info);
    //                 const cart = await this.CartModel.createCart(account_id)
    //                 break;
    //             case "seller":
    //                 user_info.seller_name = params.fullname;
    //                 const seller = await this.SellerModel.createSeller(user_info);
    //                 break;
    //             default:
    //                 break;
    //         }
    //         return "success";
    //     }
    //     else return "failed";
    // }
}
