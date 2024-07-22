"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    neewdsPasswordChange: {
        type: Boolean,
        default: true,
    },
    role: {
        type: String,
        enum: ["student", "admin", "faculty"],
    },
    status: {
        type: String,
        enum: ["in-progress", "blocked",],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
});
exports.User = (0, mongoose_1.model)('User', userSchema);
