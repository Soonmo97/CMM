const Menu = (sequelize, DataTypes) => {
    const menu = sequelize.define(
        "Menu",
        {
            menu_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            menu: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
        }
    );
    return menu;
};

module.exports = Menu;
