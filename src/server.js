"use strict";
exports.__esModule = true;
exports.Server = void 0;
var express = require("express");
var router_1 = require("./router");
var middleware_1 = require("./config/middleware");
var cron_1 = require("./config/cron");
/**
 * @export
 * @class Server
 */
var Server = /** @class */ (function () {
    function Server() {
        this.app = express();
        this.app.use(function (req, res, next) {
            var allowedOrigins = ['http://localhost:3001'];
            var origin = req.headers.origin;
            if (allowedOrigins.indexOf(origin) > -1) {
                res.setHeader('Access-Control-Allow-Origin', origin);
            }
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, Origin, X-Requested-With, Cache-Control');
            // res.header('Access-Control-Allow-Credentials', true);
            return next();
        });
        cron_1["default"].init(); // Initialise the corn job here.
        middleware_1["default"].init(this);
        router_1["default"].init(this);
    }
    return Server;
}());
exports.Server = Server;
// export
exports["default"] = new Server().app;
