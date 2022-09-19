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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const events_1 = __importDefault(require("events"));
const promises_1 = require("fs/promises");
const dotenv_1 = __importDefault(require("dotenv"));
const func_1 = require("./func");
const Users_1 = require("./models/Users");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
mongoose_1.default.connect('mongodb+srv://tcloma:pjgtv42mgWJN5GGJ@cluster0.eutou2f.mongodb.net/mern-server-test?retryWrites=true&w=majority');
const app = (0, express_1.default)();
const eventEmitter = new events_1.default();
const port = process.env.PORT;
eventEmitter.on('load', () => {
    console.log('Page loaded 😎');
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Express + TS Servers' });
    eventEmitter.emit('load');
});
app.get('/text', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield (0, promises_1.readFile)('./hello.txt', 'utf-8'));
    (0, func_1.greet)('George');
    eventEmitter.emit('load');
}));
app.get('/users', (req, res) => {
    // Get ALL users in the database
    Users_1.UserModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json(result);
        }
    });
});
app.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const newUser = new Users_1.UserModel(user);
    yield newUser.save();
    res.json(user);
}));
// Server startup
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
