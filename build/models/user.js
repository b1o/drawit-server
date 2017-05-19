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
    return User;
}());
exports.User = User;
