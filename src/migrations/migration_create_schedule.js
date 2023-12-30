'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Schedule', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            date: {
                type: Sequelize.STRING,

            },
            timeType: {
                type: Sequelize.STRING,

            },
            garaId: {
                allowNull: false,
                type: Sequelize.INTEGER,

            },
            maxOrder: {
                type: Sequelize.STRING,

            },
            currenOrder: {
                type: Sequelize.STRING,

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
        await queryInterface.dropTable('Schedule');
    }
};