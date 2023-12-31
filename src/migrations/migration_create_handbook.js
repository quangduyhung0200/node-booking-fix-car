'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('HandBook', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            staffId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            contentHTML: {
                type: Sequelize.TEXT('long'),
                allowNull: false,
            },

            contentMarkdown: {
                type: Sequelize.TEXT('long'),
                allowNull: false,
            },
            avata: {
                type: Sequelize.BLOB('long'),
                allowNull: true,
            },
            isDelete: {
                type: Sequelize.STRING,

                allowNull: true,
            },
            status: {
                type: Sequelize.STRING,

                allowNull: true,
            },
            title: {
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
        await queryInterface.dropTable('HandBook');
    }
};