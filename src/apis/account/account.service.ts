import { ObjectId } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Account } from "./account.entity";

let accountRepo = AppDataSource.getMongoRepository(Account);

export class AccountService {
    static async findAccount() {
        return await accountRepo.find({})
    }

    static async findAccountByUsername(username: string) {
        let result =  await accountRepo.findOneBy({username: username})
        return result;
    }

    static async createAccount(username: string, password: string) {
        return accountRepo.insertOne({
            username: username,
            password: password
        })
    }

}