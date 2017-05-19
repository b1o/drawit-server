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
var user_repo_1 = require("./../repositories/user-repo");
var inject_1 = require("inversify/dts/annotation/inject");
var UserHandler = (function () {
    function UserHandler(socket) {
        this.socket = socket;
        this.registerUser();
        console.log(this.userRepo);
    }
    UserHandler.prototype.registerUser = function () {
        this.socket.on('user:new', function (data) {
            console.log(data);
        });
    };
    return UserHandler;
}());
__decorate([
    inject_1.inject(user_repo_1.UserRepository),
    __metadata("design:type", user_repo_1.UserRepository)
], UserHandler.prototype, "userRepo", void 0);
exports.UserHandler = UserHandler;
