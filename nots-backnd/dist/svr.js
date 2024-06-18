"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const nots_routrs_1 = __importDefault(require("./routrs/nots.routrs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use('/api', nots_routrs_1.default);
const port = process.env.PORT || 4001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
