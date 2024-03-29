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
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../utils/jwt");
exports.default = {
    postRegister: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(req.body);
        try {
            const userVerify = yield userModel_1.default.findOne({
                $or: [{ email: req.body.email }, { mobile: req.body.mobile }],
            });
            if (userVerify) {
                console.log(userVerify);
                res.status(401).json({
                    status: false,
                });
            }
            else {
                const userData = req.body;
                const salt = yield bcrypt_1.default.genSalt(10);
                userData.password = yield bcrypt_1.default.hash(userData.password, salt);
                userData.active = true;
                const newUser = new userModel_1.default(userData);
                yield newUser.save();
                res.status(201).json({
                    status: true,
                });
            }
        }
        catch (error) {
            console.log(error, "Signup Error");
        }
    }),
    postLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const user = yield userModel_1.default.findOne({ email });
            if (user) {
                if (user.active) {
                    const passwordCheck = yield bcrypt_1.default.compare(password, user.password);
                    if (passwordCheck) {
                        const jwtVerificationToken = (0, jwt_1.generateToken)({ id: user._id.toString() }, "30m");
                        console.log(jwtVerificationToken);
                        res
                            .status(201)
                            .json({
                            email: user.email,
                            name: user.username,
                            dob: user.dob,
                            place: user.place,
                            bio: user.bio,
                            relatinship: user.relationship,
                            profie_img: user.profie_img,
                            verified: user.verified,
                            cover_img: user.cover_img,
                            active: user.active,
                            followers: user.followers,
                            following: user.following,
                        });
                    }
                    else {
                        res.status(401).json({ status: "invalid password" });
                    }
                }
                else {
                    res.status(401).json({ status: "user have been blocked" });
                }
            }
            else {
                res.status(401).json({ status: "invalid email" });
            }
        }
        catch (error) { }
    }),
};
