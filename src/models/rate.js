'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Rate extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Rate.belongsTo(models.Gara, { foreignKey: 'rateId', targetKey: 'id', as: 'rateData' });

        }
    };
    Rate.init({
        name: DataTypes.STRING,
        star: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'Rate',
        freezeTableName: true
    });
    return Rate;
}; 