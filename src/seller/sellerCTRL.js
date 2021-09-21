import { Random } from "../../lib/random.js";
const rand = new Random();
export default class SellerCTRLBase {
    constructor(SellerModel) {
        this.SellerModel = SellerModel;
    }

    async getSeller(id) {
        const doc = await this.SellerModel.getSeller(id);
        if (doc) {
            return doc;
        }
    }
}


