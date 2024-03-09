import { Expose } from "class-transformer";

import { IsNotEmpty } from "class-validator";

export class NewAccountDTO {
    @IsNotEmpty()
    @Expose()
    username: string;

    @IsNotEmpty()
    @Expose()
    password: string;
} 