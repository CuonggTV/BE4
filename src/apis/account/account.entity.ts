import { ObjectId } from "mongodb"
import { Entity, Column, ObjectIdColumn } from "typeorm"

@Entity()
export class Account {
    @ObjectIdColumn()
    _id: ObjectId

    @Column()
    username: string

    @Column()
    password: string

}