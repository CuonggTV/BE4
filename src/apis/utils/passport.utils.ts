import { AccountDAO } from "../account/account.dao";
import { Env } from "./env";
import { AccountDetail } from "../account/dto/account-detail.dto";

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.use(
    new GoogleStrategy({
        clientID: Env.GOOGLE_CLIENT_ID,
        clientSecret: Env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/login-with-google/callback'
    }, async (profile, done) => {

        console.log(profile.emails[0].value)

        // Check if google profile exist.
        if (profile.id) {

            let account = await AccountDAO.findAccountByGoogleId(profile.id);
            if (account) {
                done(null, account);
            }
            else {
                let accountDetail: AccountDetail = {
                    "lname": profile.name.givenName,
                    "fname": profile.name.familyName,
                    "age": 0,
                    "email": profile.emails[0].value
                }

                account = await AccountDAO.createGoogleAccount(profile.id, accountDetail);
                done(null, account);
            }
        }
    })
);
passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
passport.deserializeUser((id, done) => {
    AccountDAO.findAccountByGoogleId(id)
      .then(account => {
        done(null, account);
      })
  });