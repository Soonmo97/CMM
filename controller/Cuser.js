const { Op } = require("sequelize")
// const models = require("../models");
const express = require("express");
const { session }  = require("../session");
const { User } = require("../models");
const bcrypt = require('bcrypt');


// GET /
exports.main = (req, res) => {
    res.render("index");

    // const user = req.session.user;
    // console.log("유저 정보>> ",user);
    // if(user) {
    //     res.render("index", { isLogin:true, user:user });
    // }
    // else { res.render("index", { isLogin:false }); }
};

// GET /login
exports.getLogin = (req, res) => {
    console.log("로그인 요청입니다");
    res.render("login");
};

// GET /join
exports.getJoin = (req, res) => {
    res.render("join");
};

// POST /login
exports.postLogin = async (req, res) => {
    const { id, pw, hashV } = req.body;

    try {
        const user = await User.findOne({ where: { id: req.body.id } });
        if (user && await bcrypt.compare(pw, user.pw)) {
            // console.log("로그인 세션 >> ", req.session);
            // req.session.id = user.id;
            res.send('Login 성공');
        } else {
            res.status(401).send('아이디 혹은 비밀번호가 잘못되었습니다.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('로그인 오류');
    }
};

// POST /join
exports.postJoin = async (req, res) => {
    const { id, pw } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(pw, 10);
        await User.create({
            id: req.body.id,
            pw: hashedPassword,
            name: req.body.name,
            nickname: req.body.nickname,
            email: req.body.email,
        })
            .then((result) => {
                console.log("회원가입 완료", result.id);
                res.render("index");
            })
    } catch (error) {
        console.error(error);
        res.status(500).send('회원가입 실패');
    }

};
