"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const config = {
    port: process.env.PORT,
    db_url: process.env.DB_URL
};
exports.default = config;
