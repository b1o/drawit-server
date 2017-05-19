"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_repo_1 = require("./repositories/user-repo");
var inversify_1 = require("inversify");
var container = new inversify_1.Container();
container.bind("UserRepo").to(user_repo_1.UserRepository);
