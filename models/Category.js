const Category = (sequelize, DataTypes) => {
    const category = sequelize.define(
        "Category",
        {
            category_index: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            category_name: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
        }
    );
    return category;
};

module.exports = Category;
