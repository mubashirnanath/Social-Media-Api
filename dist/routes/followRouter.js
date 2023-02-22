"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/User/userController"));
const router = express_1.default.Router();
router.post('/', userController_1.default.follow);
router.post('/followers/:id', userController_1.default.getFollowers);
router.post('/followings/:id', userController_1.default.getFollowings);
exports.default = router;
