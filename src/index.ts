import express = require("express")
import { Env } from "./apis/utils/env"
import mongoose from "mongoose";

const AuthController = require("./apis/auth/auth.controller");
const AccountRouter = require("./apis/account/account.controller");
let passport = require('passport');
require("./apis/utils/passport.utils");

const cors = require('cors')
const app = express();
const port = 3000;
const connectionString = `mongodb://${Env.DB_HOST}:${Env.DB_PORT}/${Env.DB_NAME}`

app.use(cors(
    // {origin: ["http://localhost:5173", "null"]}
))
app.use(express.static('public'))

app.use(express.json());
app.use(passport.initialize());

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(connectionString).then(() => {
        app.listen(port, () => {
            console.log("Connect MongoDB success on " + connectionString)
            console.log("Express server has started on http://localhost:" + port)
        })
        app.use('/auth', AuthController)
        app.use('/accounts', AccountRouter)

        app.get('/testgg', (req, res) => {
            console.log(Env.GOOGLE_CLIENT_ID);
            console.log(Env.GOOGLE_CLIENT_SECRET)
        })
    })

}


