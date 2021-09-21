import cloudinary from "cloudinary";
import { Validate } from "../../lib/validateStr/validate.js";

export default class SellerProductsCTRLBase {
    constructor(SellerProductsModel) {
        this.SellerProductsModel = SellerProductsModel;
    }

    async addProduct(params) {
        const result = await this.SellerProductsModel.createProduct(params);
        const addTag = await this.SellerProductsModel.addTag(params.tags);
        return "ok";
    }

    async updateProduct(params) {
        this.deleteImg(params.delete_img_url);
        const result = await this.SellerProductsModel.updateProduct(params);
        const addTag = await this.SellerProductsModel.addTag(params.tags);
        return "ok";
    }

    async deleteProduct(params) {
        this.deleteImg(params.img_url);
        const result = await this.SellerProductsModel.deleteProduct(params._id);
        return result;
    }

    deleteImg(params) {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_API_KEY,
            api_secret: process.env.CLOUD_API_SECRET,
        })
        const public_ids = params.map(url => url.split("/")[7].split('.')[0]);
        public_ids.map(public_id => {
            cloudinary.v2.uploader.destroy(public_id, function (error, result) {
                console.log(result, error)
            });
        })
    }
}