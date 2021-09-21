export default class SellerModelBase {
    constructor(database) {
        this.database = database;
        this.col_Seller = this.database.collection("Seller");
    }

    async getSeller(id) {
        const doc = await this.col_Seller.findOne({ account_id: id });
        return doc;
    }

    async createSeller(seller) {
        try {
            await this.col_Seller.insertOne(seller);
        }
        catch (err) {
            if (err) throw err;
        }
    }

}