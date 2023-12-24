'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Provind extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            Provind.hasMany(models.Gara, { foreignKey: 'provindId', as: 'provindGaraData' });
        }
    };
    Provind.init({
        name: DataTypes.STRING,


    }, {
        sequelize,
        modelName: 'Provind',
        freezeTableName: true
    });
    return Provind;
}; 