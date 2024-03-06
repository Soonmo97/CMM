"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // menu 테이블의 컬럼을 NOT NULL로 변경
        await queryInterface.changeColumn("menu", "menu", {
            type: Sequelize.STRING(30), // 변경할 데이터 타입
            allowNull: false, // NOT NULL로 변경
        });

        await queryInterface.changeColumn("menu", "price", {
            type: Sequelize.INTEGER, // 변경할 데이터 타입
            allowNull: false, // NOT NULL로 변경
        });

        await queryInterface.renameColumn("restaurant", "rest_rating", "rating");

        await queryInterface.addColumn("review", "review_rating", {
            type: Sequelize.INTEGER,
            allowNull: false,
        });
    },

    down: async (queryInterface, Sequelize) => {
        // 이전 상태로 롤백하는 코드 작성
        // (이전 상태로 롤백하는 로직은 꼭 필요한 경우에만 작성)
    },
    // 마이그레이션 적용: npx sequelize-cli db:migrate
};
