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
const SearchDocumentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.body;
        const { document } = req.params;
        if (document) {
            const user = yield schema_1.default.findOne({ '_id': _id }).select('documents');
            const filteredDocument = user === null || user === void 0 ? void 0 : user.documents.filter((doc) => doc.title.toLowerCase().includes(document.toLowerCase()));
            return res.json({ status: 'searched', filteredDocument });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
});
exports.default = SearchDocumentController;
