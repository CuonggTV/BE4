import { ObjectId } from "mongodb";
import { Schema } from "mongoose";

import mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
    _id: ObjectId,
    username: String,
    password: String
});

module.exports = AccountSchema;