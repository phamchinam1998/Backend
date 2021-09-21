export default class ProductsModelBase {
    constructor(database) {
        this.database = database;
        this.col_products = this.database.collection("Products");
        this.col_tag = this.database.collection("TagList");
    }

    async listDefault() {
        const data = await this.col_products.find().toArray()
            .then(resolve => {
                return resolve
            }).catch(reject => {
                console.log(reject);
                return 0;
            });
        return data;
    }

    async listProducts(params) {
        const data = await this.col_products.find(params.query).sort(params.sort).skip(8 * (params.current_page - 1)).limit(8).toArray()
            .then(resolve => {
                return resolve
            })
        const document_number = await this.col_products.countDocuments(params.query)
            .then(resolve => {
                return resolve
            })
            .catch(reject => {
                console.log(reject);
                return 0;
            })
        return {
            data, document_number
        }
    }

    async listProductName(query) {
        const data = await this.col_products.find(query).project({ name: 1, _id: 0 }).map(p => Object.values(p)).toArray()
            .then(resolve => {
                return resolve
            })
        return data.flat();
    }

    async getProduct(id) {
        const doc = await this.col_products.findOne({ _id: id }).then(resolve => {
            return resolve
        });
        return doc;
    }

    async getTag() {
        const result = await this.col_tag.findOne({ _id: "tag_list" }).then(result => result);
        return result;
    }

}
