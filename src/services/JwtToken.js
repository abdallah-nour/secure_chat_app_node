"use strict";
exports.__esModule = true;
var jwt = require('jsonwebtoken');
var jwt_1 = require("../config/jwt");
var options = jwt_1["default"];
var verifyRequestAuth = function (req, res, next) {
    var token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token) {
        try {
            jwt.verify(token, jwt_1["default"].secret.secretKey, function (err, decoded) {
                if (err) {
                    return res.json({
                        success: false,
                        message: 'Token is not valid'
                    });
                }
                else {
                    next();
                }
            });
        }
        catch (err) {
        }
    }
    else {
        return res.json({
            success: false,
            message: 'Token not found'
        });
    }
};
var Auth = { verifyRequestAuth: verifyRequestAuth };
exports["default"] = Auth;
