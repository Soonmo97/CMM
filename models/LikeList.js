const LikeList = (sequelize, DataTypes) => {
    const likeList = sequelize.define(
        "LikeList",
        {
            like_index: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
        }
    );
    return likeList;
};

module.exports = LikeList;
