// 모델 구조 분해 할당
const { Category, LikeList, Menu, Restaurant, Review, User } = require("../models");

// GET /restaurantDetail/:restIndex
// restIndex에 해당되는 식당 상세페이지 조회
exports.getRestDetail = async (req, res) => {
    try {
        console.log("restIndex >> ", req.params);
        const { restIndex } = req.params;

        // 식당 정보 (식당명, 식당정보, 주소, ..)
        const restaurant = await Restaurant.findOne({
            where: {
                rest_index: restIndex,
            },
        });

        // 세션에서 로그인 된 유저 인덱스 가져오기
        const userIndex = req.session.index;
        let likeCheckResult = false;
        let isLogin = false;
        if (userIndex) {
            // 로그인 o
            isLogin = true;
            // 즐겨찾기 등록 여부 (등록 o, 등록 x)
            likeCheck = await LikeList.findOne({
                where: {
                    user_index: userIndex,
                    rest_index: restIndex,
                },
            });
            // 즐겨찾기 되어있다면
            if (!likeCheck) likeCheckResult = true;
        } else {
            // 로그인 x
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
        });
    } catch (err) {
        console.log("err", err);
        res.status(500).send("sever error");
    }
};

// POST /restaurantDetail/:restIndex/createLike
// exports.createLike = async (req, res) => {};
// 즐겨찾기 생성

// DELETE /restaurantDetail/:restIndex/deleteLike
// 즐겨찾기 삭제

// POST /restaurantDetail/:restIndex/createReview
// 리뷰 등록
