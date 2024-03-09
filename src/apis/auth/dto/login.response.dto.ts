import { ValidationError } from "class-validator";
import { Expose } from 'class-transformer';

export class LoginResponseDTO {
    @Expose()
    accessToken: string;

    @Expose()
    constraints: ValidationError[];
} 