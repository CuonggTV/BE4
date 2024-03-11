import { ObjectId } from "mongodb";
import mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
    _id: ObjectId,
    username: String,
    password: String,
    googleId: String,

    detail: {
        lname: String,
        fname: String,
        age: Number,
        email: String
    }
});

module.exports = AccountSchema;