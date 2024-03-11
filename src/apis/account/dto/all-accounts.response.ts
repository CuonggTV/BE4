
import { ProfileDTO } from "./profile.dto";
export class GetAllAccountsResDTO {
    page: number
    take: number
    data: any[]
    totalRecord: number
    totalPage: number
    nextPage: number 
}