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
var room_repo_1 = require("./../repositories/room-repo");
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
        this.socket.on('user:new', function (data, callback) {
            var user = new user_1.User(data.name, _this.socket);
            console.log(user.Name, _this.socket.id);
            var a = _this.userRepo.addUser(user);
            a.socket.join('Lobby');
            a.inRoom = 'Lobby';
            a.socket.emit('update:users', a.toDto());
            a.socket.in('Lobby').emit('update:users', a.toDto());
            if (callback) {
                callback({ users: _this.userRepo.getAllUsers(), me: a.toDto() });
                console.log(_this.userRepo.getAllUsers());
            }
        });
        this.socket.on('message:new', function (data, callback) {
            var user = _this.userRepo.getUserByName(data.from);
            if (user) {
                var room = user.inRoom;
                _this.socket.in(room).emit('message', { from: data.from, text: data.message });
                if (callback) {
                    callback({ from: data.from, text: data.message });
                }
            }
        });
        this.socket.on('disconnect', function () {
            console.log('disconnected', _this.socket.id);
            _this.userRepo.removeUser(_this.socket.id);
        });
    };
    return UserHandler;
}());
__decorate([
    typescript_ioc_1.Inject,
    __metadata("design:type", user_repo_1.UserRepository)
], UserHandler.prototype, "userRepo", void 0);
__decorate([
    typescript_ioc_1.Inject,
    __metadata("design:type", room_repo_1.RoomRepository)
], UserHandler.prototype, "roomRepo", void 0);
exports.UserHandler = UserHandler;
