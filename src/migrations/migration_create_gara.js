'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Gara', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            nameGara: {
                type: Sequelize.STRING
            },
            descriptionHTML: {
                type: Sequelize.STRING
            },

            descriptionMarkDown: {
                type: Sequelize.STRING
            },
            address: {
                type: Sequelize.STRING
            },
            provindId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },

            avata: {
                type: Sequelize.BLOB('long'),
            },
            carId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            phone: {
                type: Sequelize.STRING,

            },
            rateId: {
                type: Sequelize.INTEGER,


            },
            userId: {
                type: Sequelize.INTEGER,


            },
            status: {
                type: Sequelize.STRING,


            },
            description: {
                type: Sequelize.STRING,

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
        await queryInterface.dropTable('Gara');
    }
};