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
    function RoomHandler(socket) {
        this.socket = socket;
        this.listen();
    }
    RoomHandler.prototype.listen = function () {
        var _this = this;
        this.socket.on('room:new', function (data) {
            var creator = _this.userRepo.getUserById(_this.socket.id);
            var room = new room_1.Room(data.name, creator);
            console.log('creating room: ', room.name, room.creator.id);
            _this.roomRepo.addRoom(room);
            _this.socket.emit('room:created', { name: room.name, users: room.users, creator: room.creator.Name });
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
