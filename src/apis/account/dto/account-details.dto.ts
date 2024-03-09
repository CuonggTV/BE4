import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class AccountDetailsDTO {
    @IsNotEmpty()
    @Expose()
    id: string;

    @IsNotEmpty()
    @Expose()
    username: string;
}