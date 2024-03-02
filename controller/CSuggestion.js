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
    res.render("suggestions/suggestionList", { sugList: sugList });
};

exports.writePage = (req, res) => {
    res.render("suggestions/suggestionWrite");
};

exports.writeSuggestion = async (req, res) => {
    await models.Suggestions.create({
        user_index: 1,
        title: req.body.title,
        content: req.body.content,
    });
    res.redirect("list");
};
