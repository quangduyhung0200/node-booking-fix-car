'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Booking', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            garaid: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },

            carId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            timeType: {
                type: Sequelize.STRING,

                allowNull: false,
            },
            date: {
                type: Sequelize.STRING
            },

            status: {
                type: Sequelize.STRING,

                allowNull: false,
            },
            token: {
                type: Sequelize.STRING,
                allowNull: false,
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
        await queryInterface.dropTable('Booking');
    }
};