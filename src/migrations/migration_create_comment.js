'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Comment', {


            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            comment: {
                type: Sequelize.STRING
            },
            garaId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },

            userId: {

                type: Sequelize.INTEGER,
                allowNull: false,

            },
            rate: {

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
        await queryInterface.dropTable('Comment');
    }
};