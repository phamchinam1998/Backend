import { Random } from "../../lib/random.js";
const rand = new Random();
export class Controller {
    constructor(CustomerModel) {
        this.CustomerModel = CustomerModel;
    }

    async listCustomer(current_page) {
        const docs = await this.CustomerModel.listCustomer(current_page);
        return docs;
    }

    async getCustomer(params) {
        const doc = await this.CustomerModel.getCustomer(params);
        if (!doc) {
            return `Customer with ${Object.keys(params)} : ${Object.values(params)} not found`
        }
        return doc;
    }

    async createCustomer(params) {
        const customer = {
            id: rand.uppercase(8),
            full_name: params.full_name,
            gender: params.gender,
            birthday: params.birthday,
            code: rand.number(10)
        }
        await this.CustomerModel.createCustomer(customer);
        return customer;
    }

    async updateCustomer(id, data) {
        const customer = await this.CustomerModel.getCustomer({ id });
        if (data.full_name) {
            customer.full_name = data.full_name;
        }
        if (data.gender) {
            customer.gender = data.gender;
        }
        if (data.birthday) {
            customer.birthday = data.birthday;
        }
        const doc = await this.CustomerModel.updateCustomer(customer);
        return doc;
    }

    async deleteCustomer(params) {
        const doc = await this.CustomerModel.getCustomer(params);
        await this.CustomerModel.deleteCustomer(params);
        return doc;
    }
}


