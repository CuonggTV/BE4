import express = require("express")
import { NewAccountDTO } from "./dto/new.account.dto";
import { AccountDAO } from "./account.dao";
import { EncryptionUtils } from "../utils/encryption.utils";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { ProfileDTO } from "./dto/profile.dto";
import { UpdateAccountDTO } from "./dto/account-update.dto"
import { TokenUtils } from "../utils/token.utils";
import { AccountService } from "./account.service";
import { error } from "console";
import { GetAllAccountsDTO } from "./dto/all-accounts.dto";
import { GetAllAccountsResDTO } from "./dto/all-accounts.response";

const accountRouter = express();

accountRouter.get('/', async (req, res) => {
    let dto = plainToClass(GetAllAccountsDTO, req.body, { excludeExtraneousValues: true });
    let resposneJson: GetAllAccountsResDTO;
    resposneJson = await AccountService.getAllAccount(dto, TokenUtils.getToken(req))

    res.json(resposneJson)

});

accountRouter.post('/', async (req, res) => {
    let newAccountDto = plainToClass(NewAccountDTO, req.body, { excludeExtraneousValues: true });
    let jsonResponse = {};
    let createAccount;

    await validate(newAccountDto).then(async errors => {
        if (errors.length > 0) {
            jsonResponse = errors;
        }
        else if (await AccountDAO.findAccountByUsername(newAccountDto.username)) {
            jsonResponse = { message: "This username has existed!" }
        }
        else {
            let encryptedPwd = EncryptionUtils.encryptPassword(newAccountDto.password);
            createAccount = await AccountDAO.createAccount(newAccountDto.username, encryptedPwd, newAccountDto.detail);
        }
    })

    // If have error
    if (Object.keys(jsonResponse).length === 0) {

        const profileDTO = plainToClass(ProfileDTO, createAccount, { excludeExtraneousValues: true });
        console.log(createAccount)
        res.json(profileDTO)
    }
    else {
        console.log(jsonResponse)
        res.json(jsonResponse);
    }

});

accountRouter.post("/detail", async (req, res) => {
    const accountUpdateDTO = plainToClass(UpdateAccountDTO, req.body);

    await AccountService.updateAccount(accountUpdateDTO, TokenUtils.getToken(req)).then(async result => {
        const resposneJson = await plainToClass(ProfileDTO, result, { excludeExtraneousValues: true });
        console.log(result);
        res.json(resposneJson)
    }).catch(error => {
        res.json(error)
    })

})
module.exports = accountRouter