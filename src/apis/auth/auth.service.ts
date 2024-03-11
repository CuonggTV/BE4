import { AccountDAO } from "../account/account.dao"
import { TokenUtils } from "../utils/token.utils";
import { LoginDTO } from "./dto/login.dto"

import { EncryptionUtils } from "../utils/encryption.utils";
import { Request } from "express";

export class AuthService {
    static async login(dto: LoginDTO) {
        const account = await AccountDAO.findAccountByUsername(dto.username);

        if (!account) {
            return {
                message: "Cannot find account!"
            }
        }
        //Check password from DB with password form DTO
        if (!EncryptionUtils.verifyPassword(dto.password, account.password)) {
            return {
                message: "Password is uncorrected!"
            }
        }
        let token = TokenUtils.generateToken(account._id.toString());
        return { accessToken: token }
    }

    static async profileFunction(req: Request) {
        return new Promise((resolve, reject) => {
            let token: string = "";
            const authorization = req.headers.authorization;
            // Neu co authorization va authorization bat dau voi Bearer
            if (authorization && authorization.startsWith("Bearer ")) {
                token = authorization.split(" ")[1];
            }

            // 2. Verify token
            TokenUtils.verifyToken(token, async (decoded: any) => {
                if (decoded.message) {
                    reject({ message: decoded.message });
                }
                else {
                    let account = await AccountDAO.findAccountById(decoded.sub);
                    if (account) {
                        resolve({
                            id: account._id.toString(),
                            username: account.username,
                            detail: account.detail
                        });
                    }
                }
            });
            ;
        });

    }
}