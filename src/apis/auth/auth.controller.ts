import express = require("express")
import { LoginDTO } from "./dto/login.dto"
import { AuthService } from "./auth.service";
import { ValidationError } from "../errors/validation.error";
import { TokenUtils } from "../utils/token.utils";
import { AccountService } from "../account/account.service";

const authRouter = express();
let bodyParser = require('body-parser')

authRouter.use(express.json())

authRouter.post('/login-with-username-and-password', async (req, res) => {
    const dto = new LoginDTO(req.body.username, req.body.password);
    const errors: ValidationError[] = dto.validate();
    let result: any = {}
    for (let err of errors) {
        result[err.name] = err.message;
    }

    //Call service
    if (errors.length == 0) {
        let jsonToken = await AuthService.login(dto);
        res.json(jsonToken);
    }
    else res.json(result);
})

authRouter.get('/profile', async (req, res) => {

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
        res.json(result);
    });

})

module.exports = authRouter