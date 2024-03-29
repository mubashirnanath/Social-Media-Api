"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        ref: "user",
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
    },
    place: {
        type: String,
    },
    likes: {
        type: [],
        required: true,
    },
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)("post", postSchema);
