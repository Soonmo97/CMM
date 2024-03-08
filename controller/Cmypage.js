const { LikeList, Restaurant, Review, User } = require("../models");

// GET /mypage/likeList
// 내 좋아요 목록 조회
exports.getLikeList = async (req, res) => {
    try {
        let isLogin = false;
        const user = req.session.user;
        if (user) isLogin = true;
        userIndex = req.session.index;
        const likeList = await LikeList.findAll({
            where: {
                user_index: userIndex,
            },
            include: {
                model: Restaurant,
                attributes: ["rest_name"],
            },
            attributes: ["rest_index"],
        }).catch((err) => {
            console.log("내 좋아요 목록 조회 error", err);
        });
        res.render("./mypage/likeList", { likeList: likeList, user: user, isLogin: isLogin });
    } catch (err) {
        console.log("err", err);
        res.status(500).send("sever error");
    }
};

// delete /mypage/likeList/deleteLike
// 좋아요 삭제
exports.deleteLike = async (req, res) => {
    try {
        console.log(req.body);
        const { restIndex } = req.body;
        const userIndex = req.session.index;
        await LikeList.destroy({
            where: {
                rest_index: restIndex,
                user_index: userIndex,
            },
        }).catch((err) => {
            console.log("좋아요 삭제 error", err);
        });
        res.send({ message: "좋아요가 삭제되었습니다." });
    } catch (err) {
        console.log("err", err);
        res.status(500).send("sever error");
    }
};

// POST /mypage/likeList/createLike
// 좋아요 추가
exports.createLike = async (req, res) => {
    console.log(req.body);
    const { restIndex } = req.body;
    const userIndex = req.session.index;
    await LikeList.create({
        rest_index: restIndex,
        user_index: userIndex,
    }).catch((err) => {
        console.log("좋아요 등록 error", err);
    });
    res.send({ message: "좋아요 등록되었습니다." });
};

// GET /mypage/reviewList
// 내 리뷰 조회
exports.getReviewList = async (req, res) => {
    try {
        let isLogin = false;
        const user = req.session.user;
        if (user) isLogin = true;
        userIndex = req.session.index;
        const reviewList = await Review.findAll({
            where: {
                user_index: userIndex,
            },
            include: {
                model: Restaurant,
                attributes: ["rest_name"],
            },
            attributes: ["rest_index", "review_rating", "review_content"],
        }).catch((err) => {
            console.log("내 리뷰 조회 error", err);
        });
        res.render("./mypage/reviewList", { reviewList: reviewList, user: user, isLogin: isLogin });
    } catch (err) {
        console.log("err", err);
        res.status(500).send("sever error");
    }
};

// GET /mypage/profile
// 내 정보 조회
exports.getProfile = async (req, res) => {
    try {
        let isLogin = false;
        const user = req.session.user;
        if (user) isLogin = true;
        userIndex = req.session.index;
        const userinfo = await User.findOne({
            where: {
                user_index: userIndex,
            },
        }).catch((err) => {
            console.log("내 프로필 조회 error", err);
        });
        res.render("./mypage/profile", { userInfo: userinfo, user: user, isLogin: isLogin });
    } catch (err) {
        console.log("err", err);
        res.status(500).send("sever error");
    }
};
