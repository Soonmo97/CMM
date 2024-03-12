// GET /roulette

const { Restaurant } = require("../models");

// 룰렛
exports.getRoulette = async (req, res) => {
    try {
        let isLogin = false;
        const user = req.session.user;
        if (user) isLogin = true;
        userIndex = req.session.index;
        const Restaurants = await Restaurant.findAll().catch((err) => {
            console.log("룰렛 식당 조회 error", err);
        });
        res.render("roulette", { Restaurants: Restaurants, user: user, isLogin: isLogin });
    } catch (err) {
        console.log("err", err);
        res.status(500).send("sever error");
    }
};
