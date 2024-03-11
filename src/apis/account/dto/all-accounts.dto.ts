import { Expose } from "class-transformer";
import {IsNotEmpty} from "class-validator"

export class GetAllAccountsDTO{
    @IsNotEmpty()
    @Expose()
    page: number

    @IsNotEmpty()
    @Expose()
    take: number

  
}