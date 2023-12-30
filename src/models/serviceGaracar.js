'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Service_Gara_Car extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Service_Gara_Car.belongsTo(models.Price, { foreignKey: 'priceId', targetKey: 'id', as: 'priceData' });
            Service_Gara_Car.belongsTo(models.Payment, { foreignKey: 'paymentId', targetKey: 'id', as: 'paymentData' });

        }
    };
    Service_Gara_Car.init({
        serviceId: DataTypes.INTEGER,
        garaCarId: DataTypes.INTEGER,
        priceId: DataTypes.INTEGER,
        paymentId: DataTypes.INTEGER,
        isDelete: DataTypes.STRING,


    }, {
        sequelize,
        modelName: 'Service_Gara_Car',
        freezeTableName: true
    });
    return Service_Gara_Car;
}; 