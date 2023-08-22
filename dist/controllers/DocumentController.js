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
const DocumentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const params = req.params;
        if (params._id && params.document_id) {
            const user = yield schema_1.default.find({ '_id': params._id, 'documents._id': params.document_id }, { 'documents.$': 1 });
            if ((_a = user[0]) === null || _a === void 0 ? void 0 : _a.documents[0]) {
                return res.json(user[0].documents[0]);
            }
            else {
                return res.status(404).json({ error: 'Document not found' });
            }
        }
        else {
            return res.json({ error: 'Not logged' });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
});
exports.default = DocumentController;
