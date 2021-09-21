export class Model {
    constructor(database) {
        this.database = database;
        this.col_customer = this.database.collection("Customer_Info");
    }

    async listCustomer(current_page) {
        const data = await this.col_customer.find().skip(30 * (current_page - 1)).limit(30).toArray();
        const document_number = await this.col_customer.count();
        const docs = {
            data, document_number
        }
        return docs;
    }

    async getCustomer(params) {
        const doc = await this.col_customer.findOne({ account_id: params.id });
        return doc;
    }

    async createCustomer(customer) {
        try {
            await this.col_customer.insertOne(customer);
        }
        catch (err) {
            if (err) throw err;
        }
    }

    async updateCustomer(customer) {
        try {
            await this.col_customer.updateOne({ _id: customer.id }, { $set: customer });
        } catch (error) {
            if (err) throw err;
        }
        return customer;
    }

    async deleteCustomer(params) {
        try {
            await this.col_customer.deleteOne({ $or: [{ _id: params.id }, { code: params.code }] });
        }
        catch (err) {
            if (err) throw err;
        }
    }
}