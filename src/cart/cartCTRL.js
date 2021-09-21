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
        await this.CartModel.deleteAll(id);
    }
    async deleteCartItem(params) {
        await this.CartModel.deleteCartItem(params.id, params.item_id);
    }
    async addCartItem(params) {
        await this.CartModel.addCartItem(params.id, params.item_id);
    }
}