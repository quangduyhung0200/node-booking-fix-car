'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Gara_Car extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            Gara_Car.belongsToMany(models.Service, { through: 'Service_Gara_Car', foreignKey: 'garaCarId' });

        }
    };
    Gara_Car.init({
        garaId: DataTypes.INTEGER,
        carId: DataTypes.INTEGER,
        isDelete: DataTypes.STRING,





    }, {
        sequelize,
        modelName: 'Gara_Car',
        freezeTableName: true
    });
    return Gara_Car;
}; 