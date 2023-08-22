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
const schema_1 = __importDefault(require("../db/schema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const EditEmailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, email, newEmail } = req.body;
        const user = yield schema_1.default.findOne({ email });
        if (!user) {
            return res.json({ error: 'User not found' });
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.json({ error: 'Invalid password' });
        }
        const emailCheck = yield schema_1.default.findOne({ email: newEmail });
        if (emailCheck) {
            return res.json({ error: 'This email is used' });
        }
        yield schema_1.default.findOneAndUpdate({ email }, { email: newEmail });
        return res.json({ status: 'Email changed' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
});
exports.default = EditEmailController;
