const express = require("express");
const app = express();
const PORT = 8080;
const session = require("express-session");
const db = require("./models");
const router = require("./routes/RestDetail");

app.set("view engine", "ejs");
app.set("views", "./views");
app.use("/static", express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    session({
        secret: "secretKey",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 10, // 10분 뒤 세션 종료
            httpOnly: true,
        },
    })
);

app.get("/", (req, res) => {
    res.render("index", {});
});

// 식당 상세페이지 라우터
app.use("/restaurantDetail", router);

db.sequelize.sync({ force: false }).then((result) => {
    // console.log(result);
    console.log("DB연결 성공");
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
