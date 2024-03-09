import express = require("express")
import { NewAccountDTO } from "./dto/new.account.dto";
import { ValidationError } from "../errors/validation.error";
import { AccountService } from "./account.service";
import { EncryptionUtils } from "../utils/encryption.utils";
import { json } from "body-parser";
import { create } from "domain";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { error } from "console";

const accountRouter = express();

accountRouter.use(express.json())

accountRouter.post('/accounts', async (req, res) => {
<<<<<<< HEAD
    let newAccountDto = plainToClass(NewAccountDTO,req.body);
    let jsonResponse = {};

    validate(newAccountDto).then(async errors => {
        if (errors.length > 0) {
            jsonResponse = errors;
        }
        else if(await AccountService.findAccountByUsername(newAccountDto.username)){
            jsonResponse = {message: "This username has existed!"}
        }
         else {
            let encryptedPwd = EncryptionUtils.encryptPassword(newAccountDto.password);
            await AccountService.createAccount(newAccountDto.username,encryptedPwd);
        }
    })

    //Nen tao them resposne dto
    res.json(jsonResponse);
=======
    let dto: NewAccountDTO = new NewAccountDTO(req.body.username, req.body.password);
    let errors: ValidationError[] = await dto.validate();
    let result: any = {}
    for (let  i =0;i < errors.length; i++) {
        let name = "error" + i.toString();
        result[name] = errors[i].message;

    }
    if (errors.length == 0) {
        let encryptedPwd = EncryptionUtils.encryptPassword(dto.password);
        await AccountService.createAccount(dto.username,encryptedPwd)
    }
    else {
        res.json(result);
    }
>>>>>>> 4ae078f45f6da1cc341c024ec9f616fa290f8984

});
module.exports = accountRouter