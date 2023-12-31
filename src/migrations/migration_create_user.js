'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userName: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },

      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },

      address: {
        type: Sequelize.STRING
      },
      groupId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      avata: {
        type: Sequelize.BLOB('long'),
        allowNull: true,
      },
      isDelete: {
        type: Sequelize.STRING,

        allowNull: true,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('User');
  }
};