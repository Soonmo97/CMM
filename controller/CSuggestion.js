const { Op } = require("sequelize");
const { sequelize, User, Suggestions, Suggest_Like } = require("../models/index");

// 게시글 목록 조회
exports.listPage = async (req, res) => {
    try {
        const limit = 5;
        const pageLimit = 3;
        let { page: currentPage } = req.query;

        // 전체 페이지 수 구하기
        const [{ totalPosts }] = await Suggestions.findAll({
            attributes: [[sequelize.fn("count", sequelize.col("sug_index")), "totalPosts"]],
            raw: true,
        });
        const totalPage = Math.ceil(totalPosts / limit); // 전체 페이지 수

        // 쿼리스트링 예외사항 (현재 페이지 유효성 검사)
        if (!currentPage || currentPage < 0) {
            currentPage = 1;
        } else if (currentPage > totalPage) {
            currentPage = totalPage;
        }

        let offset = 0 + (currentPage - 1) * limit;

        const startPage = Math.floor((currentPage - 1) / pageLimit) * pageLimit + 1; // 현재 페이지 단위의 시작 페이지
        let endPage = startPage + pageLimit - 1; // 현재 페이지 단위의 끝 페이지

        if (endPage > totalPage) {
            endPage = totalPage;
        }

        const pageInfo = {
            pageLimit: pageLimit,
            currentPage: currentPage,
            totalPage: totalPage,
            startPage: startPage,
            endPage: endPage,
        };

        console.log("pageInfo:", pageInfo);

        const sugList = await Suggestions.findAll({
            limit: limit,
            offset: offset,
            attributes: [
                "sug_index",
                "title",
                [
                    sequelize.fn("date_format", sequelize.col("created_at"), "%Y-%m-%d"),
                    "created_at",
                ],
                [sequelize.fn("COUNT", sequelize.col("Suggest_Likes.sug_index")), "like_count"],
            ],
            include: [
                {
                    model: User,
                    attributes: ["nickname"],
                },
                {
                    model: Suggest_Like,
                    attributes: [],
                    duplicating: false,
                },
            ],
            group: ["Suggestions.sug_index", "User.user_index"],
            order: [["sug_index", "DESC"]],
        });
        res.render("suggestions/suggestionList", { sugList: sugList, pageInfo: pageInfo });
    } catch (err) {
        console.log(err);
    }
};

// 게시글 작성 페이지 요청
exports.writePage = (req, res) => {
    res.render("suggestions/suggestionWrite");
};

// 게시글 작성 요청
exports.writeSuggestion = async (req, res) => {
    try {
        const postInfo = await Suggestions.create({
            user_index: 1,
            title: req.body.title,
            content: req.body.content,
        });
        const { sug_index } = postInfo.dataValues;
        res.redirect("post/" + sug_index);
    } catch (err) {
        console.log(err);
    }
};

// 특정 게시글 조회
exports.getPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const postInfo = await Suggestions.findOne({
            where: { sug_index: postId },
            attributes: [
                "sug_index",
                "title",
                "content",
                [
                    sequelize.fn("date_format", sequelize.col("created_at"), "%Y-%m-%d %H:%i:%s"),
                    "created_at",
                ],
                [sequelize.fn("count", sequelize.col("Suggest_Likes.sug_index")), "like_count"],
            ],
            include: [
                {
                    model: User,
                    attributes: ["user_index", "nickname"],
                },
                {
                    model: Suggest_Like,
                    attributes: [],
                },
            ],
            group: ["Suggestions.sug_index", "User.user_index"],
        });
        if (postInfo) {
            res.render("suggestions/suggestionPost", { postInfo });
        } else {
            res.send(
                '<script>alert("해당 포스트가 존재하지 않습니다."); document.location.href="/suggestion/list?page=1"</script>'
            );
        }
        console.log("글 정보", postInfo);
    } catch (err) {
        console.log(err);
    }
};

// 게시글 삭제
exports.deletePost = async (req, res) => {
    try {
        const { post } = req.query;
        console.log("지울 번호: ", post);
        const result = await Suggestions.destroy({
            where: { sug_index: post },
        });
        if (result) {
            console.log("삭제 성공!");
            res.redirect("list?page=1");
            console.log("redirect?");
        }
    } catch (err) {
        console.log(err);
    }
};
