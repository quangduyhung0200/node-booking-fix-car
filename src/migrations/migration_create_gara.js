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
                type: Sequelize.FLOAT,


            },
            userId: {
                type: Sequelize.INTEGER,


            },
            status: {
                type: Sequelize.STRING,


            },
            description: {
                type: Sequelize.TEXT('long')

            },
            isDelete: {
                type: Sequelize.STRING,

                allowNull: true,
            },
            contenMarkdown: {
                type: Sequelize.TEXT('long'),

                allowNull: true,
            },
            contenHTML: {
                type: Sequelize.TEXT('long'),

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
        await queryInterface.dropTable('Gara');
    }
};