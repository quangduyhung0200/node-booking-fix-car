'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Group_Role', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            groupId: {
                type: Sequelize.INTEGER,
                allowNull: false,

            },
            roleId: {
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
        await queryInterface.dropTable('Group_Role');
    }
};