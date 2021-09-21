export default class AccountModelBase {
    constructor(database) {
        this.database = database;
        this.col_account = this.database.collection("Account");
    }

    async validateUserName(username) {
        const doc = await this.col_account.findOne({ user_name: username })
            .then(res => {
                if (!res) return true;
                else return false;
            })
        return doc;
    }

    async activeAccount(account_id) {
        const doc = await this.col_account.updateOne({ _id: account_id }, { $set: { status: "actived" } });
        return doc;
    }

    async getAccount(params) {
        const doc = await this.col_account.findOne({ $and: [{ user_name: params.username }, { password: params.password }, { type: params.type }] })
            .then(res => {
                if (res) {
                    if (res.status === "verify") {
                        return res.status;
                    }
                    if (res.status === "actived") {
                        return res
                    }
                }
                else return false;
            })
        return doc;
    }

    async createAccount(account) {
        try {
            await this.col_account.insertOne(account);
        }
        catch (err) {
            if (err) throw err;
        }
    }

    async updateCustomer(params) {
        const result = await this.col_account.updateOne({ _id: params.id }, { $set: params.query })
            .then(res => {
                return true;
            })
            .catch(e => {
                return false;
            });
        return result;
    }

    async getUsername(params) {
        const doc = await this.col_account.findOne({ user_name: params.username })
            .then(res => {
                if (res) {
                    if (res.status === "verify") {
                        return false;
                    }
                    if (res.status === "actived") {
                        return {
                            id: res._id,
                            type: res.type,
                        }
                    }
                }
                else return false;
            })
        return doc;
    }

}