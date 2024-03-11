import { Expose, Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import {AccountDetail} from "./account-detail.dto"
import "reflect-metadata";
export class NewAccountDTO {
    @IsNotEmpty()
    @Expose()
    username: string;

    @IsNotEmpty()
    @Expose()
    password: string;

    @IsNotEmpty()
    @Expose()
    @Type(() => AccountDetail)
    detail:AccountDetail
} 