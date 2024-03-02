import express = require("express")
import { NewAccountDTO } from "./dto/new.account.dto";
import { ValidationError } from "../errors/validation.error";
import { AccountService } from "./account.service";
import { EncryptionUtils } from "../utils/encryption.utils";
import { json } from "body-parser";
import { create } from "domain";

const accountRouter = express();

accountRouter.use(express.json())

accountRouter.post('/accounts', async (req, res) => {
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

});
module.exports = accountRouter