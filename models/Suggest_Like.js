const Suggest_Like = function (Sequelize, DataTypes) {
    const Suggest_Like = Sequelize.define(
        "Suggest_Like",
        {
            sug_like_index: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        },
        { freezeTableName: true, timestamps: false }
    );
    return Suggest_Like;
};

module.exports = Suggest_Like;
