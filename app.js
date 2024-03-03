const express = require("express");
const app = express();
const PORT = 8080;
const session = require("express-session");
const db = require("./models");

// 미들웨어
app.set("view engine", "ejs");
app.set("views", "./views");
app.use("/static", express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 라우터
const userRouter = require("./routes/user.js");
app.use("/", userRouter);


db.sequelize.sync({force: false}).then((result)=>{
    console.log("DB 연결 성공");
});


// 세션
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

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
