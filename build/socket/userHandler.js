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
    function UserHandler(socket, global) {
        this.socket = socket;
        this.registerUser();
        this.global = global;
    }
    UserHandler.prototype.registerUser = function () {
        var _this = this;
        this.socket.on('user:new', function (data, callback) {
            console.log('adding new user - ', data.name);
            var user = new user_1.User(data.name, _this.socket);
            var a = _this.userRepo.addUser(user);
            var room = _this.roomRepo.getRoomByName('Lobby');
            a.joinRoom('Lobby');
            room.addUser(user.toDto());
            _this.global.in('Lobby').emit('update:room-users', room.getUsers());
            _this.global.in('Lobby').emit('update:rooms', _this.roomRepo.getAllRooms());
            if (callback) {
                callback({ users: _this.userRepo.getAllUsers(), me: a.toDto(), rooms: _this.roomRepo.getAllRooms() });
                console.log(_this.userRepo.getAllUsers());
            }
        });
        this.socket.on('get:users', function (data, callback) {
            var user = _this.userRepo.getUserById(_this.socket.id);
            var room = _this.roomRepo.getRoomByName(user.inRoom);
            callback(room.getUsers());
        });
        this.socket.on('get:rooms', function (data, callback) {
            callback(_this.roomRepo.getAllRooms());
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
        this.socket.on('drawing', function (data) {
            _this.global.to('Lobby').emit('drawing', data);
            console.log(data);
        });
        this.socket.on('disconnect', function () {
            console.log('disconnected', _this.socket.id);
            var user = _this.userRepo.getUserById(_this.socket.id);
            if (user) {
                var room = _this.roomRepo.getRoomByName(user.inRoom);
                room.removeUser(user);
                if (user.inRoom) {
                    user.leaveRoom(user.inRoom);
                }
                _this.userRepo.removeUser(_this.socket.id);
            }
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
