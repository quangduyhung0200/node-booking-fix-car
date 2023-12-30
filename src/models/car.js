'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Car extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Car.belongsToMany(models.Gara, { through: 'Gara_Car', foreignKey: 'carId' });

            Car.belongsTo(models.CarCompany, { foreignKey: 'carCompanyId', targetKey: 'id', as: 'carCompanyData' });
            Car.hasMany(models.Booking, { foreignKey: 'carId', as: 'carBookingData' });
        }
    };
    Car.init({
        nameCar: DataTypes.STRING,

        carCompanyId: DataTypes.INTEGER,
        avata: DataTypes.BLOB('long'),
        descriptions: DataTypes.STRING,
        isDelete: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'Car',
        freezeTableName: true
    });
    return Car;
}; 