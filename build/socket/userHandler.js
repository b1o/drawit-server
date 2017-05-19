"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("./../models/user");
var user_repo_1 = require("./../repositories/user-repo");
var typescript_ioc_1 = require("typescript-ioc");
var UserHandler = (function () {
    function UserHandler(socket) {
        this.socket = socket;
        this.registerUser();
    }
    UserHandler.prototype.registerUser = function () {
        var _this = this;
        this.socket.on('user:new', function (data) {
            var user = new user_1.User(data.name, _this.socket);
            console.log(user.Name, _this.socket.id);
            _this.userRepo.addUser(user);
        });
        this.socket.on('disconnect', function () {
            _this.userRepo.removeUser(_this.socket.id);
        });
    };
    return UserHandler;
}());
__decorate([
    typescript_ioc_1.Inject,
    __metadata("design:type", user_repo_1.UserRepository)
], UserHandler.prototype, "userRepo", void 0);
exports.UserHandler = UserHandler;
