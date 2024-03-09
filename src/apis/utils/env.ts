require('dotenv').config();


export class Env {

    static DB_HOST =  process.env.DB_HOST || "";
    static DB_PORT =  process.env.DB_PORT || "";
    static DB_USERNAME =  process.env.DB_USERNAME || "";
    static DB_PASSWORD =  process.env.DB_PASSWORD || "";
    static DB_NAME =  process.env.DB_NAME || "";


    // 
    static JWT_ISSUER = process.env.TOKEN_ISSUER || "";
    static JWT_EXPIRE = process.env.TOKEN_EXPIRES || "";
    static JWT_SECRET = process.env.SECRET_KEY || "";
}