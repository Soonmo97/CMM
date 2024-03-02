const { Op } = require("sequelize");
const models = require("../models/index");
const { sequelize, User, Suggestions, Suggest_Like } = require("../models/index");

exports.listPage = async (req, res) => {
    const sugList = await Suggestions.findAll({
        attributes: [
            "sug_index",
            "title",
            "created_at",
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
            },
        ],
        group: ["Suggestions.sug_index", "User.user_index"],
        order: [["created_at", "DESC"]],
    });
    console.log(sugList);
    res.render("suggestions/suggestionList", { sugList: sugList });
};

exports.writePage = (req, res) => {
    res.render("suggestions/suggestionWrite");
};

exports.writeSuggestion = async (req, res) => {
    try {
        await models.Suggestions.create({
            user_index: 1,
            title: req.body.title,
            content: req.body.content,
        });
        res.redirect("list");
    } catch (err) {
        console.log(err);
    }
};

exports.getPost = async (req, res) => {
    const { postId } = req.params;
    try {
        const postInfo = await models.Suggestions.findOne({
            where: { sug_index: postId },
            attributes: [
                "sug_index",
                "title",
                "content",
                "created_at",
                [sequelize.fn("COUNT", sequelize.col("Suggest_Likes.sug_index")), "like_count"],
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
        const recommender = await models.Suggest_Like.findAll({
            where: { sug_index: postId },
            attributes: ["user_index"],
        });

        console.log("추천인", recommender);
        console.log("글 정보", postInfo);
        res.render("suggestions/suggestionPost", { postInfo });
    } catch (err) {
        console.log(err);
    }
};
