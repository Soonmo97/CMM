"use strict";

const Sequelize = require("sequelize");
const config = require(__dirname + "/../config/config.json")["development"];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const User = require("./User")(sequelize, Sequelize);
const Suggestions = require("./Suggestions")(sequelize, Sequelize);
const Suggest_Like = require("./Suggest_Like")(sequelize, Sequelize);

// 회원-건의사항 :: 게시글 작성 시 (1:N 관계)
User.hasMany(Suggestions, {
    foreignKey: "user_index",
});
Suggestions.belongsTo(User, {
    foreignKey: "user_index",
});

// 회원-추천 (1:N)
User.hasMany(Suggest_Like, {
    foreignKey: "user_index",
});
Suggest_Like.belongsTo(User, {
    foreignKey: "user_index",
});

// 건의사항-추천 (1:N)
Suggestions.hasMany(Suggest_Like, {
    foreignKey: "sug_index",
});
Suggest_Like.belongsTo(Suggestions, {
    foreignKey: "sug_index",
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Suggestions = Suggestions;
db.Suggest_Like = Suggest_Like;

module.exports = db;
