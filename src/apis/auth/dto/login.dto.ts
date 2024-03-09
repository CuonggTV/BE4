import { IsNotEmpty, Length } from "class-validator";
import { ValidationError } from "../../errors/validation.error";
import { Expose } from 'class-transformer';

export class LoginDTO {
    @IsNotEmpty()
    @Expose()
    username: string;

<<<<<<< HEAD
    @IsNotEmpty()
    @Expose()
    password: string;
=======
    constructor( username:string, password:string){
        this.username = username;
        this.password = password;
    }
    validate(){
        let errors: ValidationError[] = [];
        if(this.username.length == 0){
            errors.push(new ValidationError("error","Empty username!"));
        }
        if(this.password.length == 0){
            errors.push(new ValidationError("error","Empty password!"));
        }
        return errors;
    }
>>>>>>> 4ae078f45f6da1cc341c024ec9f616fa290f8984
} 