'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Service extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Service.belongsToMany(models.Gara_Car, { through: 'Service_Gara_Car', foreignKey: 'serviceId' });
            Service.hasMany(models.Booking, { foreignKey: 'serviceId', as: 'serviceBookingData' });
        }
    };
    Service.init({
        name: DataTypes.STRING,
        description: DataTypes.STRING,




    }, {
        sequelize,
        modelName: 'Service',
        freezeTableName: true
    });
    return Service;
}; 