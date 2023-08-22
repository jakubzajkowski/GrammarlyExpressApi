"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./database"));
const userSchema = new database_1.default.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    prompts: {
        type: Number,
    },
    plan: {
        type: String,
    },
    trashs: [{
            title: String,
            text: String,
            date: {
                type: Date,
                default: Date.now
            },
            status: String,
            language: String,
        }],
    documents: [{
            title: String,
            text: String,
            date: {
                type: Date,
                default: Date.now
            },
            status: String,
            language: String,
        }]
});
const User = database_1.default.model('User', userSchema);
exports.default = User;
