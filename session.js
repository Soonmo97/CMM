const express = require("express");
const session = require("express-session");
const app = express();

app.use(session ({
    secret: "secretKey",
    resave: false,
    saveUnitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 10, // 10분 뒤 세션 종료
        httpOnly: true,
    },
}));