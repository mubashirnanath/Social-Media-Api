"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/User/userController"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
router.post('/', authMiddleware_1.default, userController_1.default.follow);
router.get('/followers/:id', authMiddleware_1.default, userController_1.default.getFollowers);
router.get('/followings/:id', authMiddleware_1.default, userController_1.default.getFollowings);
exports.default = router;
