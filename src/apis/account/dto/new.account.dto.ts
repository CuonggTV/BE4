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
            errors.push(new ValidationError("error","Empty username!"));
        }
        else if(await AccountService.findAccountByUsername(this.username)){
            errors.push(new ValidationError("error","Username exists!"));
        }
        if(!this.password){
            errors.push(new ValidationError("error","Empty password!"));
        }
        return errors
    }
} 