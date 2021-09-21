export default class CartCTRLBase {

    constructor(CartModel) {
        this.CartModel = CartModel;
    }

    async cartSync(params) {
        await this.CartModel.updateCart(params);
        const data = await this.CartModel.getCart(params.id);
        return data;
    }

    async updateCart(params) {
        await this.CartModel.updateCart(params);
    }

    async deleteCart(id) {
        const result = await this.CartModel.deleteAll(id);
        return result;
    }
    async deleteCartItem(params) {
        const result = await this.CartModel.deleteCartItem(params.id, params.item_id);
        return result;
    }
    async addCartItem(params) {
        const result = await this.CartModel.addCartItem(params.id, params.item_id);
        return result;
    }
}