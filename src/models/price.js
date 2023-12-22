'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Price extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            Price.hasMany(models.Gara_Car, { foreignKey: 'priceId', as: 'priceData' });
        }
    };
    Price.init({
        value: DataTypes.STRING,


    }, {
        sequelize,
        modelName: 'Price',
        freezeTableName: true
    });
    return Price;
}; 