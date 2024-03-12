const express = require("express");
const app = express();
const PORT = 8080;
const { sequelize } = require("./models");
const session = require("express-session");
const db = require("./models");
const mailer = require("nodemailer");

require("dotenv").config();

// 미들웨어
app.set("view engine", "ejs");
app.set("views", "./views");
app.use("/static", express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 세션
app.use(
    session({
        secret: "secretKey",
        resave: false,
        saveUnitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 30, // 30분 뒤 세션 종료
            httpOnly: true,
        },
    })
);

const restRouter = require("./routes/restDetail.js");
const userRouter = require("./routes/user.js");
const suggestRouter = require("./routes/suggestion.js");
const mypageRouter = require("./routes/mypage.js");
const adminRouter = require("./routes/admin.js");
const searchRouter = require("./routes/search.js");
const rouletteRouter = require("./routes/roulette.js");

app.use("/restaurantDetail", restRouter);
app.use("/suggestion", suggestRouter);
app.use("/admin", adminRouter);
app.use("/", userRouter);
app.use("/mypage", mypageRouter);
app.use("/search", searchRouter);
app.use("/roulette", rouletteRouter);

sequelize
    .sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}`);
            console.log(`http://115.85.183.171:${PORT}`);
        });
    })
    .catch((err) => console.log(err));
