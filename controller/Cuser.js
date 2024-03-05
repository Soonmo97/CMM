const { Op } = require("sequelize")
// const { session }  = require("../session");
const { User } = require("../models");
const bcrypt = require('bcrypt');


// GET /index
exports.main = (req, res) => {
    const user = req.session.id;
    console.log("유저 정보>> ",user.id);
    if(user) {
        res.render("index", { isLogin:true, user:user });
    }
    else { res.render("index", { isLogin:false }); }
    // res.render("index");
};

// POST /include/header
exports.getHeader = (req, res) => {
    // res.render("index");
    const user = req.session.id;
    // console.log("유저 정보>> ",user);
    if(user) {
        res.render("index", { isLogin:true, user:user });
    }
    else { res.render("index", { isLogin:false }); }
}

// GET /login
exports.getLogin = (req, res) => {
    console.log("로그인 요청입니다");
    res.render("user/login");
};

// GET /join
exports.getJoin = (req, res) => {
    res.render("user/join");
};

// POST /login
exports.postLogin = async (req, res) => {
    const { id, pw } = req.body;

    try {
        const user = await User.findOne({ where: { id: req.body.id } });
        if (user && await bcrypt.compare(pw, user.pw)) {
            req.session.user = user.id;
            req.session.index = user.index;
                        
            res.render('index'); // 바로 리턴하여 함수를 종료합니다.
        } 
        else {
            res.status(401).send('아이디 혹은 비밀번호가 잘못되었습니다.');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('로그인 오류'); // 바로 리턴하여 함수를 종료합니다.
    }
};

// POST /join
exports.postJoin = async (req, res) => {
    const { id, pw } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(pw, 10);
        const user = await User.findOne({ where: { id: req.body.id } });
        
        // 기존 아이디와 가입 아이디를 비교해서 찾는 user가 null 값인 경우,
        // 중복되지 않는다는 뜻이기 때문에 가입 허용  
        if (user === null) {
            await User.create({
                id: req.body.id,
                pw: hashedPassword,
                name: req.body.name,
                nickname: req.body.nickname,
                email: req.body.email,
            })
            .then((result) => {
                // console.log("회원가입 완료!!", result.id);
                console.log("회원가입 완료 >>", result.id);
                res.send(result);
            })
        }
        else {
            // console.log("중복된 아이디 입니다.");
            res.render("user/join");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('회원가입 실패');
    }

};

// GET /logout
exports.getLogout = async (req, res) => {
    const user = req.body.id;
    if(user) {
        req.session.destroy((err)=> {
            if(err) throw err;

            res.redirect('/');
        });
    }
    else {
        // 세션 만료된 회원
        res.send(`
        <scrpit>
            alert('이미 세션이 완료되었습니다.');
            document.loation.href='/';
        </script>`);
    }
};

