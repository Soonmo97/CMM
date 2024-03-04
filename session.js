const express = require("express");
const session = require("express-session");
const app = express();

const sessionConfig = {
    secret: "secretKey",
    resave: false,
    saveUnitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 10, // 10분 뒤 세션 종료
        httpOnly: true,
    },
};

app.use(session(sessionConfig));

module.exports = session;