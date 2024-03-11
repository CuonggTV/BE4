import express = require("express")
import { LoginDTO } from "./dto/login.dto"
import { AuthService } from "./auth.service";
import { plainToClass } from "class-transformer";

import { validate } from "class-validator";
import { LoginResponseDTO } from "./dto/login.response.dto";
import { ProfileDTO } from "../account/dto/profile.dto";
import { Env } from "../utils/env";
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const authRouter = express();

authRouter.post('/login-with-username-and-password', async (req, res) => {
    const loginDto = plainToClass(LoginDTO, req.body, { excludeExtraneousValues: true });

    let jsonResponse = {};

    //validate error 
    await validate(loginDto).then(async errors => {
        if (errors.length > 0) {
            jsonResponse = errors;
        } else {
            jsonResponse = await AuthService.login(loginDto);
        }
    })

    const loginResponseDTO = plainToClass(LoginResponseDTO, jsonResponse);
    res.json(loginResponseDTO);
})

authRouter.get('/profile', async (req, res) => {
    await AuthService.profileFunction(req)
        .then(async result => {
            const accountResponse = plainToClass(ProfileDTO, result);
            if (accountResponse) {
                res.json(accountResponse);
            }
            else res.json(result);

        })
        .catch(err => {
            console.log(err)
        });
})

authRouter.get('/login-with-google', passport.authenticate('google', {
    scope: ['profile', 'email']
}), (req, res) => {
    console.log("hello")
}
);

authRouter.get('/login-with-google/callback', passport.authenticate('google'), (req, res) => {

});



module.exports = authRouter