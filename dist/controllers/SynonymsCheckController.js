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
const openai_1 = __importDefault(require("openai"));
const schema_1 = __importDefault(require("../db/schema"));
const SynonymsCheckController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { word, language, _id } = req.body;
        const openai = new openai_1.default({
            apiKey: process.env.OPENAI_SECRET_KEY
        });
        const promptGrammar = `You will be provided with a word in ${language}, and you will write synonyms of this word or words that can replace this word`;
        const user = yield schema_1.default.findOne({ _id });
        if (user) {
            if ((user === null || user === void 0 ? void 0 : user.plan) == 'free') {
                if (user.prompts <= 1000) {
                    if (word) {
                        yield schema_1.default.findByIdAndUpdate({ _id: _id }, { prompts: user.prompts + 1 });
                        const responseGrammar = yield openai.chat.completions.create({
                            model: "gpt-3.5-turbo",
                            messages: [
                                {
                                    "role": "system",
                                    "content": promptGrammar
                                },
                                {
                                    "role": "user",
                                    "content": `${word}`
                                },
                            ],
                            temperature: 0,
                            max_tokens: 256,
                            top_p: 1,
                            frequency_penalty: 0,
                            presence_penalty: 0,
                        });
                        return res.json({ success: { words: (_a = responseGrammar.choices[0].message) === null || _a === void 0 ? void 0 : _a.content } });
                    }
                    else {
                        return res.json({ error: 'No content' });
                    }
                }
                else {
                    return res.json({ error: 'You used your free plan ai prompts' });
                }
            }
            if ((user === null || user === void 0 ? void 0 : user.plan) == 'premium') {
                if (user.prompts <= 10000) {
                    if (word) {
                        yield schema_1.default.findByIdAndUpdate({ _id: _id }, { prompts: user.prompts + 1 });
                        const responseGrammar = yield openai.chat.completions.create({
                            model: "gpt-3.5-turbo",
                            messages: [
                                {
                                    "role": "system",
                                    "content": promptGrammar
                                },
                                {
                                    "role": "user",
                                    "content": `${word}`
                                },
                            ],
                            temperature: 0,
                            max_tokens: 256,
                            top_p: 1,
                            frequency_penalty: 0,
                            presence_penalty: 0,
                        });
                        return res.json({ success: { words: (_b = responseGrammar.choices[0].message) === null || _b === void 0 ? void 0 : _b.content } });
                    }
                    else {
                        return res.json({ error: 'No content' });
                    }
                }
                else {
                    return res.json({ error: 'You used your premium plan ai prompts' });
                }
            }
            if ((user === null || user === void 0 ? void 0 : user.plan) == 'buisness') {
                if (user.prompts <= 20000) {
                    if (word) {
                        yield schema_1.default.findByIdAndUpdate({ _id: _id }, { prompts: user.prompts + 1 });
                        const responseGrammar = yield openai.chat.completions.create({
                            model: "gpt-3.5-turbo",
                            messages: [
                                {
                                    "role": "system",
                                    "content": promptGrammar
                                },
                                {
                                    "role": "user",
                                    "content": `${word}`
                                },
                            ],
                            temperature: 0,
                            max_tokens: 256,
                            top_p: 1,
                            frequency_penalty: 0,
                            presence_penalty: 0,
                        });
                        return res.json({ success: { words: (_c = responseGrammar.choices[0].message) === null || _c === void 0 ? void 0 : _c.content } });
                    }
                    else {
                        return res.json({ error: 'No content' });
                    }
                }
                else {
                    return res.json({ error: 'You used your buisness plan ai prompts' });
                }
            }
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
});
exports.default = SynonymsCheckController;
