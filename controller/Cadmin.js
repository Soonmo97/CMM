const { Restaurant, Category, Menu, User } = require("../models/index");

// 관리자 페이지 요청
exports.getAdminPage = async (req, res) => {
    try {
        // admin 계정 맞는지 판별
        // if (req.session.index === 6) {
        const result = await Restaurant.findAll({
            attributes: ["rest_index", "rest_name"],
        });
        const restInfo = result.map(({ dataValues: { rest_index, rest_name } }) => ({
            rest_index,
            rest_name,
        }));
        // console.log(restInfo);
        res.render("admin/adminRest", { restInfo });
        // } else {
        //     res.send(
        //         "<script>alert('접근 불가능한 페이지입니다.'); document.location.href='/'</script>"
        //     );
        // }
    } catch (error) {
        console.log(error);
    }
};

// 식당 정보 조회
exports.getRestInfo = async (req, res) => {
    try {
        console.log(req.body.rest_index);
        const restInfo = await Restaurant.findOne({
            where: { rest_index: req.body.rest_index },
            include: { model: Category, attributes: ["category_index", "category_name"] },
        });
        res.send({ restInfo: restInfo.dataValues });
    } catch (error) {
        console.log(error);
    }
};

// 식당 삭제
exports.deleteRest = async (req, res) => {
    try {
        if (req.session.index === 6) {
            const result = await Restaurant.destroy({
                where: { rest_index: req.body.rest_index },
            });
            res.send({ result });
        } else {
            res.send("접근 권한이 없습니다.");
        }
    } catch (error) {
        console.log(error);
    }
};

// 식당 정보 수정
exports.editRestInfo = async (req, res) => {
    try {
        // if (req.session.index === 6) {
        const [result] = await Restaurant.update(
            {
                rest_name: req.body.rest_name,
                rest_desc: req.body.rest_desc,
                rest_address: req.body.rest_address,
                rest_number: req.body.rest_number,
                rest_time: req.body.rest_time,
            },
            {
                where: { rest_index: req.body.rest_index },
            }
        );
        console.log(result);
        res.send({ result });
        // } else {
        //     res.send({ result: 0 });
        // }
    } catch (error) {
        console.log(error);
    }
};
