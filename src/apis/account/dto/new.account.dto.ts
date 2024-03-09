import { Expose } from "class-transformer";

import { IsNotEmpty } from "class-validator";

export class NewAccountDTO {
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
>>>>>>> 4ae078f45f6da1cc341c024ec9f616fa290f8984
} 