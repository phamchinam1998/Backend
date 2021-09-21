import e, { response } from "express";

export default class SellerProductsModelBase {
    constructor(database) {
        this.database = database;
        this.col_products = this.database.collection("Products");
        this.col_tag = this.database.collection("TagList");
    }

    async createProduct(params) {
        const result = await this.col_products.insertOne(params).then(
            resolve => { return resolve }
        ).catch(err => console.log(err));
        return result;
    }

    async updateProduct(params) {
        const info = {
            name: params.name,
            material: params.material,
            specifications: params.specifications,
            price: params.price,
            origin: params.origin,
            description: params.description,
            tags: params.tags,
        }
        try {
            await this.col_products.updateOne({ _id: params.product_id },
                { $set: info }).then(e => e).catch(e => e);
            await this.col_products.updateOne({ _id: params.product_id },
                { $pull: { img_url: { $in: params.delete_img_url } } }).then(e => e).catch(e => e);
            await this.col_products.updateOne({ _id: params.product_id },
                { $push: { img_url: { $each: params.update_img_url } } }).then(e => e).catch(e => e);
            return "ok"
        }
        catch (err) {
            console.log(err);
            return "no"
        }
    }
    async deleteProduct(id) {
        const result = await this.col_products.deleteOne({ _id: id });
        return result;
    }

    async addTag(arr) {
        const result = await this.col_tag.updateOne({ _id: "tag_list" },
            { $addToSet: { list: { $each: arr } } }).then(e => e).catch(e => console.log(e));
        return result;
    }
}
