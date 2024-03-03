const User = (Sequelize, DataTypes) => {
   return Sequelize.define(
      "User",
      {
        // 컬럼 정의
        user_index: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        id: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
        pw: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        nickname: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
      },
      {
        freezeTableName: true,
        timestamps: false,
      }
    );
  };

module.exports = User;