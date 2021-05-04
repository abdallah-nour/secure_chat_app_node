"use strict";
exports.__esModule = true;
var connections = require("../config/connection");
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    role: { type: String, required: true } // doctor or patient
}, {
    collection: 'User',
    versionKey: false,
    timestamps: true
});
exports["default"] = connections.db.model('UserModel', UserSchema);
