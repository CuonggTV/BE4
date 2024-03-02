import { json } from "body-parser";
import { AccountService } from "../account/account.service"
import { TokenUtils } from "../utils/token.utils";
import { LoginDTO } from "./dto/login.dto"

import jwt = require("jsonwebtoken");
import { Account } from "../account/account.entity";
import { EncryptionUtils } from "../utils/encryption.utils";
import { Request } from "express";

export class AuthService {
    static async login(dto: LoginDTO) {
        const account: Account = await AccountService.findAccountByUsername(dto.username);

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
        let token = TokenUtils.generateToken(dto.username);
        return { accessToken: token }
    }

    static async profileFunction(req: Request) {
        // 1. Get token
        let token: string = "";
        const authorization = req.headers.authorization;
        // Neu co authorization va authorization bat dau voi Bearer
        if (authorization && authorization.startsWith("Bearer ")) {
            token = authorization.split(" ")[1];
        }
        // 2. Verify token
        let result: any;
        TokenUtils.verifyToken(token, async (decoded: any) => {
            if (decoded.message) {
                result = { message: decoded.message }
            }
            else {
                let account = await AccountService.findAccountByUsername(decoded.sub);
                if (account) {
                    result = {
                        id: account._id.toString(),
                        username: account.username
                    };
                }
            }
            console.log(result)
            return result;
        });
    }
}