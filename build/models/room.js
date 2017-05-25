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
    Room.prototype.addUser = function (user) {
        this.users.push(user);
    };
    Room.prototype.removeUser = function (user) {
        var a = this.users.filter(function (u) {
            return u.name == user.Name && u.id == user.id;
        })[0];
        this.users.splice(this.users.indexOf(a), 1);
        console.log("removing user " + a.name + " from room " + this.name);
    };
    Room.prototype.getUsers = function () {
        return this.users;
    };
    return Room;
}());
exports.Room = Room;
