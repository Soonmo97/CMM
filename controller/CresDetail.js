// 모델 구조 분해 할당
const { Category, LikeList, Menu, Restaurant, Review, User } = require("../models");

// GET /restaurantDetail/:restIndex
// restIndex에 해당되는 식당 상세페이지 조회
exports.getRestDetail = async (req, res) => {
    try {
        console.log(req.params);
        const { restIndex } = req.params;
        // 식당 정보 (식당명, 식당정보, 주소, ..)
        const restaurant = await Restaurant.findOne({
            where: {
                rest_index: restIndex,
            },
        });

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
            attributes: ["user_index", "review_content", "createdAt"],
        });

        res.render("restaurantDetail", { restaurant, categoryList, menuList, reviewList });
    } catch (err) {
        console.log("err", err);
        res.status(500).send("sever error");
    }
};

// POST /restaurantDetail/:restIndex/review
// 리뷰 생성

// POST /restaurantDetail/:restIndex/likeList
// 즐겨찾기 생성

// DELETE /restaurantDetail/:restIndex/likeList/delete
// 즐겨찾기 삭제
