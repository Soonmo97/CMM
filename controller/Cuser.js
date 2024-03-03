const { Op } = require("sequelize")
const models = require("../models");
const express = require("express");
const session = require("express-session");
const app = express();
// const { User } = require("../models");

// GET /
exports.main = (req, res) => {
    res.render("index");

    // console.log("유저 정보 >> ", user);
    // if(user){
    //     res.render("index", { isLogin:true, user:user });
    // }
    // else {
    //     res.render("index", {isLogin:false});
    // }
    
};

// GET /login
exports.getLogin = (req, res) => {
    const sess = req.session;
    console.log("로그인 요청입니다");
    res.render("login");
};

// GET /join
exports.getJoin = (req, res) => {
    res.render("join");
};

// POST /login
// {id,pw} = req.body
exports.postLogin = (req, res) => {
    models.User.findOne({
        where: {
            id: req.body.id,
            pw: req.body.pw,
        }
    })
    .then ((result) => {
        if (result == null || result == undefined) {
            console.log("로그인 자료가 없습니다.")
            
            const result = {success: false, msg: "로그인 정보가 정확하지 않습니다."};
            res.json(result);
            return;
            // req.session.user = req.body.id;
            // res.send(true);
        }

        if (result.pw != req.body.pw) {
            console.log("로그인 암호가 틀립니다.")
            const result = {success: false, msg: "로그인 정보가 정확하지 않습니다. #2"};
            res.json(result);

        }
        else {
            console.log("로그인 성공되었습니다.", req.session);
            
            req.session.user = req.body.id;
            console.log(req.session);
            res.json(result);
        }
        // else {
        //     res.send(`
        //     <script>
        //         alert("아이디 또는 비밀번호가 일치하지 않습니다.다시 시도해주세요.");
        //         document.location.href='/login';
        //     </script>`);
        // }
    })
    .catch((err) => {
        console.log("로그인 프로세스 오류 : ", err);
    })
};

// POST /join
exports.postJoin = (req, res) => {
    models.User.create({
        id : req.body.id,
        pw : req.body.pw,
        name : req.body.name,
        nickname : req.body.nickname,
        email : req.body.email,
        phone : req.body.phone, 
    })
    .then((result) => {
        console.log("회원가입 완료", result.id);
        res.render("index");
    })
};
