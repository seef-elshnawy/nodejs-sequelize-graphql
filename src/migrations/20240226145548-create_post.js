"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PostTest", {
      id: {
        type: Sequelize.UUID,
        defaultValue: queryInterface.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      post: {
        type: queryInterface.STRING,
        allowNull: false,
      },
      userId: {
        type: queryInterface.UUID,
        allowNull: false,
        references: {
          model: "UserTest",
          key: "id",
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.removeTable("PostTest");
  },
};
