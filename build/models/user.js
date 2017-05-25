"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = (function () {
    function User(name, socket) {
        this.Name = name;
        this.socket = socket;
        this.id = this.socket.id;
    }
    Object.defineProperty(User.prototype, "Name", {
        get: function () {
            return this.name;
        },
        set: function (value) {
            if (value.length > 0) {
                this.name = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    User.prototype.joinRoom = function (roomName) {
        this.leaveRoom(this.inRoom);
        this.inRoom = roomName;
        this.socket.join(roomName);
        this.socket.to(roomName).emit('user:joined', this.toDto());
        console.log("user: " + this.name + " joined room: " + roomName);
    };
    User.prototype.leaveRoom = function (roomName) {
        this.socket.leave(this.inRoom);
        this.socket.to(roomName).emit('user:left', this.toDto());
    };
    User.prototype.toDto = function () {
        var dto = new UserDTO(this);
        return dto;
    };
    return User;
}());
exports.User = User;
var UserDTO = (function () {
    function UserDTO(user) {
        this.name = user.Name;
        this.id = user.id;
        this.inRoom = user.inRoom;
    }
    return UserDTO;
}());
exports.UserDTO = UserDTO;
