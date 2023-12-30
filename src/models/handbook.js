'use strict';
const { INTEGER } = require('sequelize');
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class HandBook extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

            HandBook.belongsTo(models.User, { foreignKey: 'staffId', targetKey: 'id', as: 'StaffHandbookData' });
        }
    };
    HandBook.init({
        staffId: DataTypes.INTEGER,
        contentHTML: DataTypes.STRING,
        contentMarkdown: DataTypes.STRING,
        avata: DataTypes.BLOB('long'),
        isDelete: DataTypes.STRING,



    }, {
        sequelize,
        modelName: 'HandBook',
        freezeTableName: true
    });
    return HandBook;
}; 