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
var room_1 = require("./../models/room");
var user_repo_1 = require("./../repositories/user-repo");
var room_repo_1 = require("./../repositories/room-repo");
var typescript_ioc_1 = require("typescript-ioc");
var RoomHandler = (function () {
    function RoomHandler(socket, global) {
        this.socket = socket;
        this.listen();
        this.global = global;
    }
    RoomHandler.prototype.listen = function () {
        var _this = this;
        this.socket.on('room:new', function (data, callback) {
            var creator = _this.userRepo.getUserById(_this.socket.id);
            var room = new room_1.Room(data.name, creator.toDto());
            var previousRoom = _this.roomRepo.getRoomByName(creator.inRoom);
            previousRoom.removeUser(creator);
            console.log('creating room: ', room.name, room.creator.id);
            _this.roomRepo.addRoom(room);
            creator.joinRoom(room.name);
            room.addUser(creator.toDto());
            var users = room.getUsers();
            _this.global.emit('update:rooms', _this.roomRepo.getAllRooms());
            _this.global.to(room.name).emit('update:room-users', room.getUsers());
            _this.global.to(previousRoom.name).emit('update:room-users', room.getUsers());
            console.log(users);
        });
        this.socket.on('user:joined', function (data, callback) {
            var user = _this.userRepo.getUserByName(data.user.name);
            var room = _this.roomRepo.getRoomByName(data.room);
            if (user.inRoom) {
                var previousRoom = _this.roomRepo.getRoomByName(user.inRoom);
                previousRoom.removeUser(user);
                _this.global.to(previousRoom.name).emit('update:room-users', previousRoom.getUsers());
            }
            user.joinRoom(room.name);
            room.addUser(user.toDto());
            _this.global.to(room.name).emit('update:room-users', room.getUsers());
            _this.global.emit('update:rooms', _this.roomRepo.getAllRooms());
            _this.global.emit('update:rooms', _this.roomRepo.getAllRooms());
        });
    };
    return RoomHandler;
}());
__decorate([
    typescript_ioc_1.Inject,
    __metadata("design:type", room_repo_1.RoomRepository)
], RoomHandler.prototype, "roomRepo", void 0);
__decorate([
    typescript_ioc_1.Inject,
    __metadata("design:type", user_repo_1.UserRepository)
], RoomHandler.prototype, "userRepo", void 0);
exports.RoomHandler = RoomHandler;
