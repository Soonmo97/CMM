const Suggestions = function (Sequelize, DataTypes) {
    const Suggestions = Sequelize.define(
        "Suggestions",
        {
            sug_index: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            title: { type: DataTypes.STRING, allowNull: false },
            content: { type: DataTypes.STRING(1234), allowNull: false },
        },
        { freezeTableName: true, timestamps: true, underscored: true }
    );
    return Suggestions;
};

module.exports = Suggestions;
