import { Type, Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import {AccountDetail} from "./account-detail.dto"
import "reflect-metadata";
export class ProfileDTO {
    @Expose()
    id: string;

    @IsNotEmpty()
    @Expose()
    username: string;

    @Expose()
    @Type(() => AccountDetail)
    detail:AccountDetail
}