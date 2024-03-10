const { Restaurant, Category, Menu, User, sequelize } = require("../models/index");

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
        res.render("admin/adminRestList", { restInfo });
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

// 식당 추가 페이지 요청
exports.getAddPage = async (req, res) => {
    try {
        const result = await Restaurant.findAll({
            attributes: ["rest_index", "rest_name"],
        });
        const restInfo = result.map(({ dataValues: { rest_index, rest_name } }) => ({
            rest_index,
            rest_name,
        }));
        res.render("admin/adminAddRest", { restInfo });
    } catch (error) {
        console.log(error);
    }
};

// 식당 추가 요청
exports.addRest = async (req, res) => {
    const t = await sequelize.transaction();
    let insertRestInfo, insertCategories, insertCategory;

    try {
        const { rest_name, rest_desc, rest_address, rest_number, rest_time, category } = req.body;

        // 필수값이 없을 경우 throw Error
        if (!rest_name || !rest_address || !category.category1) {
            throw new Error();
        }

        // 식당 테이블에 식당 정보 추가
        insertRestInfo = await Restaurant.create(
            {
                rest_name: rest_name,
                rest_desc: rest_desc,
                rest_address: rest_address,
                rest_number: rest_number,
                rest_time: rest_time,
            },
            { transaction: t }
        );
        // 식당의 카테고리가 두 개 존재할 경우
        if (category.category2) {
            insertCategories = await Category.bulkCreate(
                [
                    {
                        category_name: category.category1,
                        rest_index: insertRestInfo.dataValues.rest_index,
                    },
                    {
                        category_name: category.category2,
                        rest_index: insertRestInfo.dataValues.rest_index,
                    },
                ],
                { transaction: t }
            );
            // 식당의 카테고리가 하나일 경우
        } else if (!category.category2) {
            insertCategory = await Category.create(
                {
                    category_name: category.category1,
                    rest_index: insertRestInfo.dataValues.rest_index,
                },
                { transaction: t }
            );
        }
        // 식당 정보와 카테고리 정보가 모두 추가된 경우 커밋
        console.log(insertRestInfo);
        console.log("커밋!");
        await t.commit();
        res.json({ isSuccess: true, rest_index: insertRestInfo.dataValues.rest_index });
    } catch (error) {
        // 에러가 있을 경우 롤백
        console.log(error);
        console.log("롤백");
        await t.rollback();
        res.status(500).json({ isSuccess: false });
    }
};

// 식당 메뉴 추가 페이지 요청
exports.getAddMenuPage = (req, res) => {
    try {
        res.render("admin/adminAddRestMenu");
    } catch (error) {
        console.log(error);
    }
};

// 식당 메뉴 추가 요청
exports.addMenu = async (req, res) => {
    try {
        const menuList = req.body;
        const menu = Object.values(menuList);
        console.log(menu);
        await Menu.bulkCreate(menu, { fields: ["menu", "price", "rest_index"] });
        res.json({ isSuccess: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ isSuccess: false });
    }
};

// 식당 수정 페이지 요청
exports.getEditPage = async (req, res) => {
    try {
        const result = await Restaurant.findAll({
            attributes: ["rest_index", "rest_name"],
        });
        const restInfo = result.map(({ dataValues: { rest_index, rest_name } }) => ({
            rest_index,
            rest_name,
        }));
        res.render("admin/adminEditRest", { restInfo });
    } catch (error) {
        console.log(error);
    }
};

// 식당 삭제
exports.deleteRest = async (req, res) => {
    try {
        // if (req.session.index === 6) {
        const result = await Restaurant.destroy({
            where: { rest_index: req.body.rest_index },
        });
        res.json({ isSuccess: true });
        // } else {
        // res.json({ isSuccess: false });
        // }
    } catch (error) {
        console.log(error);
        res.status(500).json({ isSuccess: false });
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
