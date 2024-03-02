require('dotenv').config();


export class Env {
    static JWT_ISSUER = process.env.TOKEN_ISSUER || "";
    static JWT_EXPIRE = process.env.TOKEN_EXPIRES || "";
    static JWT_SECRET = process.env.SECRET_KEY || "";
}