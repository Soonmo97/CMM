"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.changeColumn("Suggestions", "content", {
            type: Sequelize.STRING(2000),
        });
        await queryInterface.changeColumn("Suggestions", "title", {
            type: Sequelize.STRING(32),
        });
    },

    async down(queryInterface, Sequelize) {
        // 롤백
    },
};
