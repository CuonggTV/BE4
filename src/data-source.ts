import "reflect-metadata"
import { DataSource } from "typeorm"
import { Account } from "./apis/account/account.entity"

export const AppDataSource = new DataSource({
    type: "mongodb",
    // CONFIG DATABASE
    host: "localhost",
    port: 27017,
    username: "cuong",
    password: "123",
    database: "fakebook",

    synchronize: true,
    logging: false,
    entities: [Account],
    migrations: [],
    subscribers: [],
})
