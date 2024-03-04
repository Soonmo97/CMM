"use strict";
const Sequelize = require("sequelize");
const config = require(__dirname + "/../config/config.json")["prod"];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const UserModel = require("./User")(sequelize, Sequelize);
const SuggestionsModel = require("./Suggestions")(sequelize, Sequelize);
const Suggest_LikeModel = require("./Suggest_Like")(sequelize, Sequelize);
const CategoryModel = require("./Category")(sequelize, Sequelize);
const LikeListModel = require("./LikeList")(sequelize, Sequelize);
const MenuModel = require("./Menu")(sequelize, Sequelize);
const RestaurantModel = require("./Restaurant")(sequelize, Sequelize);
const ReviewModel = require("./Review")(sequelize, Sequelize);

// 1:N 관계 설정
// 식당 : 카테고리 (연결 키: rest_index)
RestaurantModel.hasMany(CategoryModel, {
    foreignKey: { name: "rest_index", allowNull: false },
});
CategoryModel.belongsTo(RestaurantModel, {
    foreignKey: { name: "rest_index", allowNull: false },
});

// 식당 : 즐겨찾기 (연결 키: rest_index)
RestaurantModel.hasMany(LikeListModel, {
    foreignKey: { name: "rest_index", allowNull: false },
});
LikeListModel.belongsTo(RestaurantModel, {
    foreignKey: { name: "rest_index", allowNull: false },
});

// 식당 : 메뉴 (연결 키: rest_index)
RestaurantModel.hasMany(MenuModel, {
    foreignKey: { name: "rest_index", allowNull: false },
});
MenuModel.belongsTo(RestaurantModel, {
    foreignKey: { name: "rest_index", allowNull: false },
});

// 식당 : 리뷰 (연결 키: rest_index)
RestaurantModel.hasMany(ReviewModel, {
    foreignKey: { name: "rest_index", allowNull: false },
});
ReviewModel.belongsTo(RestaurantModel, {
    foreignKey: { name: "rest_index", allowNull: false },
});

// 회원 : 리뷰 (연결 키: user_index)
UserModel.hasMany(ReviewModel, {
    foreignKey: { name: "user_index", allowNull: false },
});
ReviewModel.belongsTo(UserModel, {
    foreignKey: { name: "user_index", allowNull: false },
});

// 회원 : 즐겨찾기 (연결 키: user_index)
UserModel.hasMany(LikeListModel, {
    foreignKey: { name: "user_index", allowNull: false },
});
LikeListModel.belongsTo(UserModel, {
    foreignKey: { name: "user_index", allowNull: false },
});
// 회원-건의사항 :: 게시글 작성 시 (1:N 관계)
UserModel.hasMany(SuggestionsModel, {
    foreignKey: "user_index",
});
SuggestionsModel.belongsTo(UserModel, {
    foreignKey: "user_index",
});

// 회원-추천 (1:N)
UserModel.hasMany(Suggest_LikeModel, {
    foreignKey: "user_index",
});
Suggest_LikeModel.belongsTo(UserModel, {
    foreignKey: "user_index",
});

// 건의사항-추천 (1:N)
SuggestionsModel.hasMany(Suggest_LikeModel, {
    foreignKey: "sug_index",
});
Suggest_LikeModel.belongsTo(SuggestionsModel, {
    foreignKey: "sug_index",
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Suggestions = SuggestionsModel;
db.Suggest_Like = Suggest_LikeModel;
db.Category = CategoryModel;
db.LikeList = LikeListModel;
db.Menu = MenuModel;
db.Restaurant = RestaurantModel;
db.Review = ReviewModel;
db.User = UserModel;

module.exports = db;
