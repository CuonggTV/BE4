require('dotenv').config();

export class Env {

    static DB_HOST =  process.env.DB_HOST || "";
    static DB_PORT =  process.env.DB_PORT || "";
    static DB_USERNAME =  process.env.DB_USERNAME || "";
    static DB_PASSWORD =  process.env.DB_PASSWORD || "";
    static DB_NAME =  process.env.DB_NAME || "";

    static GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || ""
    static GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || ""

    static JWT_ISSUER = process.env.TOKEN_ISSUER || "";
    static JWT_EXPIRE = process.env.TOKEN_EXPIRES || "";
    static JWT_SECRET = process.env.SECRET_KEY || "";
}