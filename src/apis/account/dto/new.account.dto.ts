import { ValidationError } from "../../errors/validation.error";
import { AccountService } from "../account.service";

export class NewAccountDTO {
    username: string;
    password: string;

    constructor( username:string, password:string){
        this.username = username;
        this.password = password;
    }
    async validate(){
        let errors: ValidationError[] = [];
        if(!this.username){
            errors.push(new ValidationError("username","Empty username!"));
        }
        else if(await AccountService.findAccountByUsername(this.username)){
            errors.push(new ValidationError("username","Username exists!"));
        }
        if(!this.password){
            errors.push(new ValidationError("password","Empty password!"));
        }
        return errors
    }
} 