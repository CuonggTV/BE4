import { ValidationError } from "../../errors/validation.error";

export class LoginDTO {
    username: string;
    password: string;

    constructor( username:string, password:string){
        this.username = username;
        this.password = password;
    }
    validate(){
        let errors: ValidationError[] = [];
        if(this.username.length == 0){
            errors.push(new ValidationError("username","Empty username!"));
        }
        if(this.password.length == 0){
            errors.push(new ValidationError("password","Empty password!"));
        }
        return errors;
    }
} 