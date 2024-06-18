"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllrs/user.controller");
const router = (0, express_1.Router)();
const userController = new user_controller_1.UserController();
router.post('/register', userController.register);
router.post('/login', userController.login);
exports.default = router;
