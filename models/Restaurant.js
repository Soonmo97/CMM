const Restaurant = (sequelize, DataTypes) => {
    const restaurant = sequelize.define(
        "Restaurant",
        {
            rest_index: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            rest_name: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            rest_desc: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            rest_address: {
                type: DataTypes.STRING(128),
                allowNull: false,
            },
            rest_number: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            rest_time: {
                type: DataTypes.STRING(128),
                allowNull: true,
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
        }
    );
    return restaurant;
};

module.exports = Restaurant;
