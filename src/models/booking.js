'use strict';
const { INTEGER } = require('sequelize');
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Booking.belongsTo(models.Time, { foreignKey: 'timeType', targetKey: 'id', as: 'timeDataBooking' });

            Booking.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'bookingData' });
            Booking.belongsTo(models.Gara, { foreignKey: 'garaId', targetKey: 'id', as: 'bookingDataGara' });
            Booking.belongsTo(models.Car, { foreignKey: 'carid', targetKey: 'id', as: 'carBookingData' });
            Booking.belongsTo(models.Service, { foreignKey: 'serviceId', targetKey: 'id', as: 'serviceBookingData' });
            Booking.belongsTo(models.Price, { foreignKey: 'priceId', targetKey: 'id', as: 'PriceBookingData' });
            Booking.belongsTo(models.StatusBooking, { foreignKey: 'status', targetKey: 'status', as: 'statusBooking' });

        }
    };
    Booking.init({
        userId: DataTypes.INTEGER,
        garaid: DataTypes.INTEGER,
        carId: DataTypes.INTEGER,
        timeType: DataTypes.STRING,
        date: DataTypes.STRING,
        status: DataTypes.INTEGER,
        token: DataTypes.STRING,
        serviceId: DataTypes.INTEGER,
        isDelete: DataTypes.STRING,
        priceId: DataTypes.INTEGER,


    }, {
        sequelize,
        modelName: 'Booking',
        freezeTableName: true
    });
    return Booking;
}; 