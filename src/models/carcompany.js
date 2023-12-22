'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CarCompany extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            CarCompany.hasMany(models.Car, { foreignKey: 'carCompanyId' })
        }
    };
    CarCompany.init({
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        avata: DataTypes.BLOB('long'),


    }, {
        sequelize,
        modelName: 'CarCompany',
        freezeTableName: true
    });
    return CarCompany;
}; 