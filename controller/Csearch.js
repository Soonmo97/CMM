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
                category: null,
            });
        } else {
            res.render("index", {
                isLogin: false,
                restaurants: restaurants,
                indexReview: indexReview,
                category: null,
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

        console.log("카테고리 >> ", category);
        // console.log("user", user);
        // 카테고리 조회

        /* 
        category_index: 26,
      category_name: '일식',
      rest_index: 5,
      rest_name:
      Restaurant: {
         "rest_index","rest_name"
      }
        */

        /*  rest_index,rest_name,rest_desc,rest_address,rest_number,rest_time:  */
        const categories = await Category.findAll({
            include: [
                {
                    model: Restaurant,
                    attributes: ["rest_name"],
                },
            ],
            where: { category_name: category },
        });
        // console.log("-----");
        // console.log(categories[0].Restaurant);

        for (let category of categories) {
            category.rest_name = category.Restaurant.rest_name;
        }

        // console.log("---new categories");
        // console.log(categories);

        const indexReview = await Restaurant.findAll({
            attributes: ["rest_index", "rest_name"], // 식당의 속성
            include: {
                model: Review,
                attributes: ["review_rating"], // 리뷰의 속성 중 평점만 가져옴
            },
        });

        // const restaurants = await Restaurant.findAll({
        //     attributes: ["rest_index", "rest_name"],
        // });

        // console.log(''categories);
        // const dataArr = [];
        // categories.forEach((rest_info) => {
        //     dataArr.push({
        //         rest_name: rest_info.Restaurant.rest_name,
        //     });
        // });
        // res.send(newArr);

        console.log("////////////////////////");

        // console.log("category", categories);

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
                // categories,
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
