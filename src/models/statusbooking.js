'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class StatusBooking extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            StatusBooking.hasMany(models.Booking, { foreignKey: 'status', as: 'statusBooking' });
        }
    };
    StatusBooking.init({
        status: DataTypes.STRING,
        description: DataTypes.STRING,
        isDelete: DataTypes.STRING,



    }, {
        sequelize,
        modelName: 'StatusBooking',
        freezeTableName: true
    });
    return StatusBooking;
}; 