import { Expose } from "class-transformer";
import {IsNotEmpty} from "class-validator"

export class UpdateResponseDTO{
    @IsNotEmpty()
    @Expose()
    lname: string

    @IsNotEmpty()
    @Expose()
    fname: string

    @IsNotEmpty()
    @Expose()
    age: number
}