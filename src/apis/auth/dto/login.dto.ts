import { IsNotEmpty, Length } from "class-validator";
import { ValidationError } from "../../errors/validation.error";
import { Expose } from 'class-transformer';

export class LoginDTO {
    @IsNotEmpty()
    @Expose()
    username: string;

    @IsNotEmpty()
    @Expose()
    password: string;
} 