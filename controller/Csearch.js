// controller/Csearch.js

const { Op } = require("sequelize");
const { Restaurant, Category, Review } = require("../models/index");

// 키워드 검색 및 카테고리 조회를 처리하는 컨트롤러 함수
exports.search = async (req, res) => {
    try {
        const user = req.session.user;

        const { keyword } = req.query;

        // 키워드로 식당 검색
        const restaurants = await Restaurant.findAll({
            where: {
                rest_name: { [Op.like]: `%${keyword}%` },
            },
        });

        const indexReview = await Restaurant.findAll({
            attributes: ["rest_index", "rest_name"], // 식당의 속성
            include: {
                model: Review,
                attributes: ["review_rating"], // 리뷰의 속성 중 평점만 가져옴
            },
        });

        console.log("검색 데이터:", restaurants);

        if (user) {
            res.render("index", {
                isLogin: true,
                user: user,
                restaurants: restaurants,
                indexReview: indexReview,
                category: "검색결과",
            });
        } else {
            res.render("index", {
                isLogin: false,
                restaurants: restaurants,
                indexReview: indexReview,
                category: "검색결과",
            });
        }
    } catch (error) {
        console.error("검색 조회 오류:", error);
        res.status(500).send("서버 오류 발생");
    }
};

exports.categoryMenu = async (req, res) => {
    try {
        const user = req.session.user;
        const { category } = req.query;

        const categories = await Category.findAll({
            include: [
                {
                    model: Restaurant,
                    attributes: ["rest_name"],
                },
            ],
            where: { category_name: category },
        });

        for (let category of categories) {
            category.rest_name = category.Restaurant.rest_name;
        }

        const indexReview = await Restaurant.findAll({
            attributes: ["rest_index", "rest_name"], // 식당의 속성
            include: {
                model: Review,
                attributes: ["review_rating"], // 리뷰의 속성 중 평점만 가져옴
            },
        });

        if (user) {
            res.render("index", {
                isLogin: true,
                user: user,
                indexReview,
                restaurants: categories,
                category,
            });
        } else {
            res.render("index", {
                isLogin: false,
                indexReview,
                restaurants: categories,
                category,
            });
        }
    } catch (error) {
        console.error("카테고리 조회 오류:", error);
        res.status(500).send("서버 오류 발생");
    }
};
