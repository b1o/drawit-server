"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var roomHandler_1 = require("./socket/roomHandler");
var userHandler_1 = require("./socket/userHandler");
var bodyParser = require("body-parser");
var express = require("express");
var logger = require("morgan");
var path = require("path");
var errorHandler = require("errorhandler");
var methodOverride = require("method-override");
/**
 * The server.
 *
 * @class Server
 */
var Server = (function () {
    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    function Server() {
        //create expressjs application
        this.app = express();
        this.app;
        //configure application
        this.config();
        //add routes
        this.routes();
        //add api
        this.api();
        console.log('init app');
    }
    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    Server.bootstrap = function () {
        return new Server();
    };
    /**
     * Create REST API routes
     *
     * @class Server
     * @method api
     */
    Server.prototype.api = function () {
        //empty for now
    };
    /**
     * Configure application
     *
     * @class Server
     * @method config
     */
    Server.prototype.config = function () {
        this.app.use(express.static(path.join(__dirname, "public")));
        //configure pug
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "pug");
        //use logger middlware
        this.app.use(logger("dev"));
        //use json form parser middlware
        this.app.use(bodyParser.json());
        //use query string parser middlware
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        //use override middlware
        this.app.use(methodOverride());
        //catch 404 and forward to error handler
        this.app.use(function (err, req, res, next) {
            err.status = 404;
            next(err);
        });
        //error handling
        this.app.use(errorHandler());
    };
    /**
     * Create router
     *
     * @class Server
     * @method api
     */
    Server.prototype.routes = function () {
        //empty for now
    };
    Server.prototype.initSocket = function (socket) {
        this.io = socket;
        this.io.on('connection', function (socket) {
            var userHandler = new userHandler_1.UserHandler(socket);
            var roomHandler = new roomHandler_1.RoomHandler(socket);
            console.log('connected', socket.id);
        });
    };
    return Server;
}());
exports.Server = Server;
