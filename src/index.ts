import express = require("express")
import {Env} from "./apis/utils/env"
import mongoose from "mongoose";

const AuthController = require("./apis/auth/auth.controller");
const AccountRouter = require("./apis/account/account.controller");

var cors = require('cors')
const app = express();
const port = 3000;
const connectionString = `mongodb://${Env.DB_HOST}:${Env.DB_PORT}/${Env.DB_NAME}`


app.use(cors())
app.use(express.json());

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(connectionString).then(() => {
        app.listen(port, () => {
            console.log("Connect MongoDB success on " +connectionString)
            console.log("Express server has started on http://localhost:" + port)
        })
        app.use('/auth', AuthController)
        app.use('/', AccountRouter)
    })

}


