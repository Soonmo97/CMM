// 모델 구조 분해 할당
const { create } = require("domain");
const { Category, LikeList, Menu, Restaurant, Review, User } = require("../models");

// GET /restaurantDetail/:restIndex
// restIndex에 해당되는 식당 상세페이지 조회
exports.getRestDetail = async (req, res) => {
    try {
        const { restIndex } = req.params;

        // 식당 정보 (식당명, 식당정보, 주소, ..)
        const restaurant = await Restaurant.findOne({
            where: {
                rest_index: restIndex,
            },
        });

        // 세션에서 로그인 된 유저 인덱스 가져오기
        const user = req.session.user;
        const userIndex = req.session.index;
        let likeCheckResult = false;
        let isLogin = false;
        if (user) {
            // 로그인 o
            isLogin = true;
            // 좋아요 등록 여부 (등록 o, 등록 x)
            const likeCheck = await LikeList.findOne({
                where: {
                    user_index: userIndex,
                    rest_index: restIndex,
                },
            });
            // 좋아요 해당 유저가 해당 식당이 좋아요 되어있다면
            if (likeCheck) likeCheckResult = true;
        }

        // 식당 카테고리
        const categoryList = await Category.findAll({
            where: {
                rest_index: restIndex,
            },
        });

        // 식당 메뉴
        const menuList = await Menu.findAll({
            where: {
                rest_index: restIndex,
            },
        });

        // 식당 리뷰
        const reviewList = await Review.findAll({
            where: {
                rest_index: restIndex,
            },
            include: {
                model: User,
                attributes: ["nickname"],
            },
            attributes: ["user_index", "review_content", "createdAt", "review_rating"],
        });

        res.render("restaurantDetail", {
            restaurant,
            likeCheckResult,
            categoryList,
            menuList,
            reviewList,
            isLogin,
            user,
            userIndex,
        });
    } catch (err) {
        console.log("err", err);
        res.status(500).send("sever error");
    }
};

// POST /restaurantDetail/:restIndex/createLike
// 좋아요 생성
exports.postCreateLike = async (req, res) => {
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

// DELETE /restaurantDetail/:restIndex/deleteLike
// 좋아요 삭제
exports.deleteLike = async (req, res) => {
    try {
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

// GET /restaurantDetail/:restIndex/reviewPlus
// 리뷰 더보기
exports.getReviewPlus = async (req, res) => {
    try {
        const { restIndex } = req.params;
        const reviewList = await Review.findAll({
            where: {
                rest_index: restIndex,
            },
            include: {
                model: User,
                attributes: ["nickname"],
            },
            attributes: ["user_index", "review_content", "createdAt", "review_rating"],
        }).catch((err) => {
            console.log("좋아요 삭제 error", err);
        });
        res.send({ reviewList: reviewList });
    } catch (err) {
        console.log("err", err);
        res.status(500).send("sever error");
    }
};

// POST /restaurantDetail/:restIndex/createReview
// 리뷰 등록
exports.postCreateReview = async (req, res) => {
    try {
        const userIndex = req.session.index;
        const { restIndex, content, rating } = req.body;
        await Review.create({
            review_content: content,
            review_rating: rating,
            rest_index: restIndex,
            user_index: userIndex,
        });
        res.send({ message: "리뷰 등록이 완료되었습니다." });
    } catch (err) {
        console.log("err", err);
        res.status(500).send("sever error");
    }
};
