const express = require("express");
const app = express();
const PORT = 8080;
const session = require("express-session");

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

const suggestRouter = require("./routes/suggestion.js");
app.use("/suggestion", suggestRouter);

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
