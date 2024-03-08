// controller/Csearch.js

const { Op } = require("sequelize");
const { Restaurant, Category } = require("../models/index");

// 키워드 검색을 처리하는 컨트롤러 함수
// exports.search = async (req, res) => {
//     try {
//         const user = req.session.user;

//         const { keyword } = req.query;
//         const restaurants = await Restaurant.findAll({
//             where: {
//                 rest_name: { [Op.like]: `%${keyword}%` },
//             },
//         });

//         console.log("search data", restaurants);

//         // 검색 결과를 클라이언트에게 응답
//         // res.send(restaurants);
//         if (user) {
//             res.render("index", { isLogin: true, user: user, restaurants: restaurants });
//         } else {
//             res.render("index", { isLogin: false, restaurants: restaurants });
//         }
//         // res.render("index", { restaurants: restaurants });
//     } catch (error) {
//         console.error("검색 오류:", error);
//         res.status(500).send("서버 오류 발생");
//     }
// };

// 키워드 검색 및 카테고리 조회를 처리하는 컨트롤러 함수
exports.search = async (req, res) => {
    try {
        const user = req.session.user;

        const { keyword } = req.query;
        const { category } = req.query;

        // 키워드로 식당 검색
        const restaurants = await Restaurant.findAll({
            where: {
                rest_name: { [Op.like]: `%${keyword}%` },
            },
        });

        console.log("검색 데이터:", restaurants);

        if (user) {
            res.render("index", {
                isLogin: true,
                user: user,
                restaurants: restaurants,
            });
        } else {
            res.render("index", {
                isLogin: false,
                restaurants: restaurants,
            });
        }
    } catch (error) {
        console.error("검색 조회 오류:", error);
        res.status(500).send("서버 오류 발생");
    }
};

// exports.category = async (req, res) => {
//     try {
//         const user = req.session.user;

//         console.log("user", user);
//         // 카테고리 조회
//         const categories = await Category.findAll({
//             attributes: ["category_name"],
//             include: [
//                 {
//                     model: Restaurant,
//                     attributes: ["rest_index", "rest_name"],
//                     // through: { attributes: [] }, // 중간 테이블의 열을 가져오지 않도록 함
//                 },
//             ],
//         });

//         // console.log(''categories);
//         const dataArr = [];
//         categories.forEach((rest_info) => {
//             dataArr.push({
//                 rest_name: rest_info.Restaurant.rest_name,
//             });
//         });

//         // res.send(newArr);

//         console.log("category", categories);
//         if (user) {
//             res.render("index", {
//                 isLogin: true,
//                 user: user,
//                 restaurants: dataArr,
//             });
//         } else {
//             res.render("index", {
//                 isLogin: false,
//                 restaurants: dataArr,
//             });
//         }
//     } catch (error) {
//         console.error("카테고리 조회 오류:", error);
//         res.status(500).send("서버 오류 발생");
//     }
// };
