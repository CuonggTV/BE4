import { AppDataSource } from "./data-source"
import express = require("express")

const AuthController = require("./apis/auth/auth.controller");
const AccountRouter = require("./apis/account/account.controller");

var cors = require('cors')
const app = express();
const port = 3000

app.use(cors())

app.use('/auth', AuthController)
app.use('/', AccountRouter)

AppDataSource.initialize().then(async () => {
    app.listen(port, () => {
        console.log("Express server has started on http://localhost:" + port)
    })
}).catch(error => console.log(error))
