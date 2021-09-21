import cloudinary from "cloudinary";
import { Validate } from "../../lib/validateStr/validate.js";

export default class ProductsCTRLBase {
    constructor(ProductsModel) {
        this.ProductsModel = ProductsModel;
    }

    async listProductsDefault(params) {
        const data = await this.ProductsModel.listDefault();
        const pattern = Validate(params.keyword).toLowerCase();
        const current_page = params.current_page;
        let start = (current_page - 1) * 8;
        let end = (current_page * 8) - 1;
        const arr = [];
        data.forEach(product => {
            if (Validate(product.name.toLowerCase()).indexOf(pattern) > -1) {
                arr.push(product);
            }
            arr.sort((a, b) => {
                var strA = Validate(a.name.toLowerCase()).indexOf(pattern);
                var strB = Validate(b.name.toLowerCase()).indexOf(pattern);
                if (strA < strB) {
                    return -1;
                }
                if (strA > strB) {
                    return 1;
                }
                return 0;
            })
        })
        const document_number = arr.length;
        return {
            data: arr.splice(start, end),
            document_number: document_number,
        };
    }

    async listProducts(params) {
        const docs = await this.ProductsModel.listProducts(params);
        return docs;
    }

    async getProduct(id) {
        const doc = await this.ProductsModel.getProduct(id);

        if (!doc) {
            return `Product not found`
        }
        return doc;
    }

    async getName(query) {
        const name = await this.ProductsModel.listProductName(query);
        const tag = await this.ProductsModel.getTag();
        return {
            name_list: name,
            tag_list: tag,
        };
    }
}