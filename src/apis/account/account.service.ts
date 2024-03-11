import { UpdateAccountDTO } from "./dto/account-update.dto";
import { TokenUtils } from "../utils/token.utils";
import { AccountDAO } from "./account.dao";
import { GetAllAccountsDTO } from "./dto/all-accounts.dto";
import { GetAllAccountsResDTO } from "./dto/all-accounts.response";

export class AccountService {
    static updateAccount(dto: UpdateAccountDTO, token: string) {
        return new Promise((resolve, reject) => {
            TokenUtils.verifyToken(token, async (decoded: any) => {
                if (decoded.message) {
                    reject({ message: decoded.message });
                } else {
                    try {
                        let account = await AccountDAO.find_updateAccount(decoded.sub, dto.fname, dto.lname, dto.age);
                        if (account) {
                            resolve(account);
                        }
                    } catch (error) {
                        reject(error);
                    }
                }
            });
        });
    }

    static async getAllAccount(dto: GetAllAccountsDTO, token: string) {
        try {
            let accounts = await AccountDAO.findAllAccount(dto.page, dto.take);
            let totalRecord = await AccountDAO.countTotalRecord();
            
            let totalPage = Math.ceil (totalRecord / dto.take)
            let nextPage = totalPage > dto.page ? dto.page + 1 : dto.page;

            let responseJson: GetAllAccountsResDTO = {
                page: dto.page,
                take: dto.take,
                data: accounts,
                totalPage: totalPage,
                nextPage: nextPage,
                totalRecord: totalRecord
            };
            // responseJson.page = dto.page;
            // responseJson.take = dto.take;
            // responseJson.totalPage = totalPage;
            // responseJson.nextPage = nextPage
            // responseJson.totalRecord = totalRecord;

            return responseJson;

        } catch (error) {
            console.log(error);
        }
    }
}
