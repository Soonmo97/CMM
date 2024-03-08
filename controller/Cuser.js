const { Op } = require("sequelize");
// const { session }  = require("../session");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const { render } = require("ejs");
const nodemailer = require("nodemailer");
const { smtpTransport } = require("../config/email");
const { response } = require("express");

// GET /index
exports.getMain = (req, res) => {
    const user = req.session.user;
    console.log("유저 세션 정보>> ", user);
    if (user) {
        res.render("index", { isLogin: true, user: user });
    } else {
        res.render("index", { isLogin: false });
    }
};

// POST /index
// exports.postMain = (req, res) => {
//     const user = req.session.sess;
//     console.log("유저 세션 정보>> ",user);
//     if(user) {
//         res.render("index", { isLogin:true, user:user });
//     }
//     else { res.render("index", { isLogin:false }); }
// };

// POST /include/header/modal_login
exports.loginHeader = async (req, res) => {
    console.log("세션 정보 >> ", req.session);

    const { id, pw } = req.body;

    try {
        const user = await User.findOne({ where: { id } });
        if (user && (await bcrypt.compare(pw, user.pw))) {
            req.session.user = user.id; // 세션에 유저 정보 저장
            req.session.index = user.user_index; // 세션 인덱스 저장 값

            console.log("세션 연결 완료>>  ", req.session.index);

            res.render("index", { isLogin: true, user: id });
        } else {
            res.status(401).send("아이디 혹은 비밀번호가 잘못되었습니다.");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("로그인 오류");
    }
};

// POST /include/header/modal_register
exports.registerHeader = async (req, res) => {
    const { id, pw, nickname, email } = req.body;
    console.log("id 전달이 됐나요", id);
    try {
        const hashedPassword = await bcrypt.hash(pw, 10);
        const user = await User.findOne({ where: { id } });

        console.log("회원 정보 >> ", user);
        // 기존 아이디와 가입 아이디를 비교해서 찾는 user가 null 값인 경우,
        // 중복되지 않는다는 뜻이기 때문에 가입 허용
        if (user === null) {
            await User.create({
                id: req.body.id,
                pw: hashedPassword,
                nickname: req.body.nickname,
                email: req.body.email,
            }).then((result) => {
                // console.log("회원가입 완료!!", result.id);
                console.log("회원가입 완료 >>", result.id); //result.id = id
                res.render("index", { isLogin: true, user: id });
            });
        } else {
            console.log("중복된 아이디 입니다.");
            res.render("index", { isLogin: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("회원가입 실패");
    }
};

// POST /include/header/form_logout
exports.logoutHeader = async (req, res) => {
    if (req.session.user) {
        req.session.destroy((err) => {
            if (err) {
                console.error("로그아웃 중 오류 발생: ", err);
                res.status(500).send("로그아웃 중 오류 발생");
            } else {
                res.redirect("/");
            }
        });
    } else {
        // 세션에 사용자 정보가 없는 경우
        console.log("이미 세션 만료된 회원입니다.");
        res.redirect("/");
    }
};

// POST /user/idCheckFrom/checkForm
exports.checkId = async (req, res) => {
    const { id } = req.body;

    try {
        const user = await User.findOne({ where: { id: id } });

        if (user) {
            console.log("아이디 사용 불가능 입니다.");
            res.send({ available: false }); // 아이디 사용 불가능을 클라이언트에게 전달합니다.
        } else {
            console.log("아이디 사용 가능 입니다.");
            res.send({ available: true }); // 아이디 사용 가능을 클라이언트에게 전달합니다.
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "서버 오류" }); // 서버 오류를 클라이언트에게 반환합니다.
    }
};

// GET /user/idCheckForm
exports.checkWindow = async (req, res) => {
    res.render("user/idCheckForm");
};

// POST /include/header/checkEmail
exports.checkEmail = async (req, res) => {
    const generateRandomNumber = (min, max) => {
        const randNum = Math.floor(Math.random() * (max - min + 1)) + min;

        return randNum;
    };

    const number = generateRandomNumber(111111, 999999);
    const { email } = req.body;

    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: "새싹 노드 이메일 연결용",
        html: "<h1> 인증번호를 입력해주세요 /n/n/n/n/n/n </h1>" + number,
    };
    smtpTransport.sendMail(mailOptions, (err, response) => {
        console.log("response", response);
        if (err) {
            res.json({ ok: false, msg: " 메일 전송에 실패하였습니다. " });
            smtpTransport.close(); //전송종료
            return;
        } else {
            res.json({ ok: true, msg: " 메일 전송에 성공하였습니다. ", authNum: number });
            smtpTransport.close(); //전송종료
            return;
        }
    });
};
