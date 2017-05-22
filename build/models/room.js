"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Room = (function () {
    function Room(name, creator) {
        this.name = name;
        if (creator) {
            this.creator = creator;
        }
        this.users = [];
    }
    Room.prototype.join = function (user) {
        user.inRoom = this.name;
        this.users.push(user);
        user.socket.join(this.name);
        user.socket.emit('user:joined', user.toDto());
        user.socket.to(this.name).emit('user:joined', user.toDto());
    };
    return Room;
}());
exports.Room = Room;
