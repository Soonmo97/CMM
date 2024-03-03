"use strict";

const Sequelize = require("sequelize");
const config = require(__dirname + "/../config/config.json")["development"];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const CategoryModel = require("./Category")(sequelize, Sequelize);
const LikeListModel = require("./LikeList")(sequelize, Sequelize);
const MenuModel = require("./Menu")(sequelize, Sequelize);
const RestaurantModel = require("./Restaurant")(sequelize, Sequelize);
const ReviewModel = require("./Review")(sequelize, Sequelize);
const UserModel = require("./User")(sequelize, Sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Category = CategoryModel;
db.LikeList = LikeListModel;
db.Menu = MenuModel;
db.Restaurant = RestaurantModel;
db.Review = ReviewModel;
db.User = UserModel;

// 1:1 관계 설정
// 식당 : 식당 (연결 키: rest_index)
RestaurantModel.hasOne(LikeListModel, {
    foreignKey: { name: "rest_index", allowNull: false },
});
LikeListModel.belongsTo(RestaurantModel, {
    foreignKey: { name: "rest_index", allowNull: false },
});

// 1:N 관계 설정
// 식당 : 카테고리 (연결 키: rest_index)
RestaurantModel.hasMany(CategoryModel, {
    foreignKey: { name: "rest_index", allowNull: false },
});
CategoryModel.belongsTo(RestaurantModel, {
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

module.exports = db;
