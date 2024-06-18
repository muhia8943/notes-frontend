"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../srvics/user.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    constructor() {
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body;
                const existingUser = yield this.userService.getUserByUsername(user.username);
                if (existingUser) {
                    res.status(400).send('Username already exists');
                    return;
                }
                yield this.userService.registerUser(user);
                res.status(201).send('User registered successfully');
            }
            catch (error) {
                res.status(500).send(error.message);
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const user = yield this.userService.getUserByUsername(username);
                if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
                    res.status(401).send('Invalid username or password');
                    return;
                }
                const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
                    expiresIn: '1h'
                });
                res.json({ token });
            }
            catch (error) {
                res.status(500).send(error.message);
            }
        });
        this.userService = new user_service_1.UserService();
    }
}
exports.UserController = UserController;
