import jwt = require('jsonwebtoken')
import { Env } from './env'

export class TokenUtils {
    
    static token: string;

    static getToken(req){
        if(!this.token){
            const authorization = req.headers.authorization;
            // Neu co authorization va authorization bat dau voi Bearer
            if (authorization && authorization.startsWith("Bearer ")) {
                this.token = authorization.split(" ")[1];
            }
        }
        return this.token;
    }


    static generateToken(sub: string) {
        return jwt.sign({}, Env.JWT_SECRET, {
            subject: sub,
            issuer: Env.JWT_ISSUER,
            expiresIn: Env.JWT_EXPIRE
        })
    }
    static verifyToken(token: string, done) {
        jwt.verify(token, Env.JWT_SECRET, { issuer: Env.JWT_ISSUER }, (err, decoded) => {
            if (err) {
                const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
                return done(Error (message));
            } else {
                return done(decoded);
            }
        });
    };

}