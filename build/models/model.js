"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Room = (function () {
    function Room(name, creator) {
        this.name = name;
        this.creator = creator;
        this.users = [];
    }
    return Room;
}());
exports.Room = Room;
