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
var typescript_ioc_1 = require("typescript-ioc");
var UserRepository = (function () {
    function UserRepository() {
        this.users = [];
    }
    UserRepository.prototype.addUser = function (user) {
        this.users.push(user);
        console.log(this.users.length);
        return this.getUserById(user.id);
    };
    UserRepository.prototype.getUserById = function (id) {
        return this.users.filter(function (user) {
            return user.id == id;
        })[0];
    };
    UserRepository.prototype.getUserByName = function (name) {
        return this.users.filter(function (user) {
            return user.Name == name;
        })[0];
    };
    UserRepository.prototype.removeUser = function (id) {
        var user = this.users.filter(function (user) {
            return user.id == id;
        })[0];
        if (user) {
            console.log('removed ', user.id);
            this.users.splice(this.users.indexOf(user), 1);
        }
    };
    UserRepository.prototype.getAllUsers = function () {
        var users = this.users.map(function (user) {
            return user.toDto();
        });
        return users;
    };
    UserRepository.prototype.getUsersByRoomName = function (room) {
        var users = this.users.filter(function (user) {
            return user.inRoom == room;
        });
        return users;
    };
    return UserRepository;
}());
UserRepository = __decorate([
    typescript_ioc_1.Singleton,
    __metadata("design:paramtypes", [])
], UserRepository);
exports.UserRepository = UserRepository;
