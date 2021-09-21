import { Random } from "../../lib/random.js";
const rand = new Random();

export default class CartModelBase {
    constructor(database) {
        this.database = database;
        this.col_cart = this.database.collection("Cart");
    }

    async getCart(id) {
        const doc = await this.col_cart.findOne({ account_id: id });
        return doc;
    }

    async createCart(id) {
        const result = await this.col_cart.insertOne(
            { _id: rand.alphabet(12), account_id: id, cart: [] }
        );
        return result;
    }

    async updateCart(params) {
        const data = await this.col_cart.updateOne({ account_id: params.id }, { $addToSet: { cart: { $each: params.cart } } }).then(res => res);
        return data;
    }

    async deleteCartItem(id, item_id) {
        await this.col_cart.updateOne({ account_id: id }, { $pull: { cart: item_id } });
    }

    async deleteAll(id) {
        await this.col_cart.updateOne({ account_id: id }, { $set: { cart: [] } });
    }

    async addCartItem(id, item_id) {
        await this.col_cart.updateOne({ account_id: id }, { $addToSet: { cart: item_id } });
    }
}