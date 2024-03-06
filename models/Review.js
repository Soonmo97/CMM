const Review = (sequelize, DataTypes) => {
    const review = sequelize.define(
        "Review",
        {
            review_index: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            review_content: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            review_rating: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        { freezeTableName: true, timestamps: true, createdAt: true, updatedAt: false }
    );
    return review;
};

module.exports = Review;
