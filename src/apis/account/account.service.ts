import mongoose from "mongoose";

const AccountSchema = require("./account.entity");

const AccountModel = mongoose.model('account', AccountSchema);
export class AccountService {
    static async findAccountByUsername(username: string) {
        let result = await AccountModel.findOne({ username: username })
        return result;
    }

    static async createAccount(username: string, password: string) {
        return AccountModel.insertMany({
            username: username,
            password: password
        })
    }

}