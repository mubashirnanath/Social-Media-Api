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
exports.userBlock = void 0;
const userModel_1 = __importDefault(require("../../models/userModel"));
const userBlock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    const user = yield userModel_1.default.find({ _id: userId });
    try {
        if (user[0].active) {
            yield userModel_1.default.updateOne({ _id: userId }, {
                active: false,
            });
            res.status(201).json({ status: true, message: "Blocked" });
        }
        else {
            yield userModel_1.default.updateOne({ _id: userId }, {
                active: true,
            });
            res.status(201).json({ status: true, message: "unblocked" });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.userBlock = userBlock;
