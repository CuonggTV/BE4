import express = require("express")
import { LoginDTO } from "./dto/login.dto"
import { AuthService } from "./auth.service";
import { TokenUtils } from "../utils/token.utils";
import { AccountService } from "../account/account.service";
import { classToClassFromExist, plainToClass } from "class-transformer";

import { validate } from "class-validator";
import { LoginResponseDTO } from "./dto/login.response.dto";
import { AccountDetailsDTO } from "../account/dto/account-details.dto";

const authRouter = express();
let bodyParser = require('body-parser')

authRouter.use(express.json())

authRouter.post('/login-with-username-and-password', async (req, res) => {
    const loginDto = plainToClass(LoginDTO, req.body, { excludeExtraneousValues: true });

    let jsonResponse = {};

    //validate error 
    await validate(loginDto).then(async errors => {
        if (errors.length > 0) {
            jsonResponse = errors;
        } else {
            jsonResponse = await AuthService.login(loginDto);
        }
    })

    const loginResponseDTO = plainToClass(LoginResponseDTO, jsonResponse);
    res.json(loginResponseDTO);
})

authRouter.get('/profile', async (req, res) => {
    await AuthService.profileFunction(req)
        .then(async result => {
            const accountResponse = plainToClass(AccountDetailsDTO, result);
            if (accountResponse) {
                res.json(accountResponse);
            }
        res.json(result);
    });
})

module.exports = authRouter