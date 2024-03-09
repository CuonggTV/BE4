let bcrypt = require("bcrypt")

export class EncryptionUtils {
    static encryptPassword(password: string) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    }

    static async verifyPassword(password: string, DBpassword: string) {

        bcrypt.compare(password, DBpassword).then((result: any) => {
            return result;
        });
    }
}