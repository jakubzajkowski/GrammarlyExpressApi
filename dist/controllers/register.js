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
const bcrypt_1 = __importDefault(require("bcrypt"));
const schema_1 = __importDefault(require("../db/schema"));
const RegisterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, name, email } = req.body;
    try {
        const checkEmailDb = yield schema_1.default.findOne({ email: email });
        if (checkEmailDb) {
            return res.status(400).json({ error: 'Your Email is used' });
        }
        else {
            const hash = bcrypt_1.default.hashSync(password, 10);
            const user = new schema_1.default({ password: hash, name: name, email: email, plan: 'free', prompts: 0 });
            yield user.save();
            return res.status(201).json({ status: 'success' });
        }
    }
    catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.default = RegisterController;
