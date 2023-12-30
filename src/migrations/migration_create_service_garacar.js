'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Service_Gara_Car', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            serviceId: {
                type: Sequelize.INTEGER,

            },
            garaCarId: {
                type: Sequelize.INTEGER,

            },
            priceId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            paymentId: {
                type: Sequelize.INTEGER,
                allowNull: false,
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
        await queryInterface.dropTable('Service_Gara_Car');
    }
};