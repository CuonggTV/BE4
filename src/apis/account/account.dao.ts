import mongoose from "mongoose";
import { AccountDetail } from "./dto/account-detail.dto"

const AccountSchema = require("./schema/account.schema");

const AccountModel = mongoose.model('account', AccountSchema);
export class AccountDAO {
    static async findAccountByUsername(username: string) {
        let result = await AccountModel.findOne({ username: username })
        return result;
    }
    static async findAccountByGoogleId(googleId: string) {
        let result = await AccountModel.findOne({ googleId: googleId })
        return result;
    }
    static async findAccountById(id: string) {
        let result = await AccountModel.findOne({ _id: id })
        return result;
    }
    static async findAccountByEmail(email: string) {
        let result = await AccountModel.findOne({ email: email })
        return result;
    }

    static async find_updateAccount(id: string, fname: string, lname: string, age: number) {
        return await AccountModel.findOneAndUpdate({ _id: id }, {
            detail: {
                lname: lname,
                fname: fname,
                age: age
            }
        }, { new: true })
    }

    static async findAllAccount(page: number, take: number) {
        return await AccountModel.find({}).skip((page-1)*take).limit(take);
    }
    static async countTotalRecord() {
        return await AccountModel.find({}).countDocuments();
    }

    static async createAccount(username: string, password: string, detail: AccountDetail) {
        return await AccountModel.insertMany({
            username: username,
            password: password,
            detail: detail
        })
    }
    static async createGoogleAccount(googleId: string, detail: AccountDetail) {
        return await AccountModel.insertMany({
            googleId: googleId,
            detail: detail
        })
    }




}