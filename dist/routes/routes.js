"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RegisterController_1 = __importDefault(require("../controllers/RegisterController"));
const LoginController_1 = __importDefault(require("../controllers/LoginController"));
const Auth_1 = require("../middleware/Auth");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const AddDocumentController_1 = __importDefault(require("../controllers/AddDocumentController"));
const DeleteDocumentController_1 = __importDefault(require("../controllers/DeleteDocumentController"));
const DocumentController_1 = __importDefault(require("../controllers/DocumentController"));
const EditEmailController_1 = __importDefault(require("../controllers/EditEmailController"));
const router = express_1.default.Router();
router.get('/', function (req, res) {
    res.json({ status: 'xd' });
});
router.post('/register', RegisterController_1.default);
router.post('/login', LoginController_1.default);
router.get('/user', Auth_1.Auth, UserController_1.default);
router.post('/add-document', AddDocumentController_1.default);
router.post('/delete-document', DeleteDocumentController_1.default);
router.get('/document/:_id/:document_id', DocumentController_1.default);
router.post('/edit-email', EditEmailController_1.default);
exports.default = router;
