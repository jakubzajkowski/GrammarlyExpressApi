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
const TrashDeleteDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, documentId } = req.body;
        yield schema_1.default.findOneAndUpdate({ _id }, { $pull: { trashs: { _id: documentId } } });
        return res.json({ status: 'deleted' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
});
exports.default = TrashDeleteDocument;
