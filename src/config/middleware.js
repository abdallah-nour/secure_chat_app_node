"use strict";
exports.__esModule = true;
var bodyParser = require("body-parser");
var compression = require("compression");
var cookieParser = require("cookie-parser");
var express = require("express");
var cors = require("cors");
var helmet = require("helmet");
var path = require("path");
/**
 * @export
 * @class Middleware
 */
var Middleware = /** @class */ (function () {
    function Middleware() {
    }
    /**
     * @static
     * @param {IServer} server
     * @memberof Middleware
     */
    Middleware.init = function (server) {
        server.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        server.app.use(bodyParser.json({ limit: '50mb' }));
        server.app.use(cookieParser());
        server.app.use(compression());
        server.app.use(helmet());
        server.app.use(cors());
        server.app.use('/apidoc', express.static(path.join(__dirname, '../../apidoc')));
        server.app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS ');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,' +
                ' Content-Type, Accept,' +
                ' Authorization,' +
                ' Access-Control-Allow-Credentials');
            // res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });
    };
    return Middleware;
}());
exports["default"] = Middleware;
