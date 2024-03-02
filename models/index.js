"use strict";

const Sequelize = require("sequelize");
const config = require(__dirname + "/../config/config.json")["development"];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const User = require("./User")(sequelize, Sequelize);
const Suggestions = require("./Suggestions")(sequelize, Sequelize);
const Suggest_Like = require("./Suggest_Like")(sequelize, Sequelize);

User.hasMany(Suggestions, {
    sourceKey: "user_index",
    foreignKey: "user_index",
});
Suggestions.belongsTo(User, {
    sourceKey: "user_index",
    foreignKey: "user_index",
});

User.hasOne(Suggest_Like, {
    sourceKey: "user_index",
    foreignKey: "user_index",
});
Suggest_Like.belongsTo(User, {
    sourceKey: "user_index",
    foreignKey: "user_index",
});

Suggestions.hasMany(Suggest_Like, {
    sourceKey: "sug_index",
    foreignKey: "sug_index",
});
Suggest_Like.belongsTo(Suggestions, {
    sourceKey: "sug_index",
    foreignKey: "sug_index",
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Suggestions = Suggestions;
db.Suggest_Like = Suggest_Like;

module.exports = db;
