'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Comment.belongsTo(models.Gara, { foreignKey: 'garaId', targetKey: 'id', as: 'GaraComment' });
            Comment.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'UserComment' });
        }
    };
    Comment.init({
        comment: DataTypes.STRING,

        gataId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER,
        rate: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'Comment',
        freezeTableName: true
    });
    return Comment;
}; 