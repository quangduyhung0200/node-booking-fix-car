'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Gara extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Gara.belongsTo(models.Provind, { foreignKey: 'provindId', targetKey: 'id', as: 'provindGaraData' });

            Gara.belongsToMany(models.Car, { through: 'Gara_Car', foreignKey: 'garaId' });
            Gara.hasMany(models.Schedule, { foreignKey: 'garaId', as: 'GaraScheduleData' });
            Gara.hasMany(models.Booking, { foreignKey: 'garaId', as: 'bookingDataGara' });

            Gara.belongsTo(models.User, { foreignKey: 'userId', as: 'userGara' });
            Gara.hasMany(models.Comment, { foreignKey: 'garaId', as: 'GaraComment' });
        }
    };
    Gara.init({


        nameGara: DataTypes.STRING,
        descriptionHTML: DataTypes.STRING,
        descriptionMarkDown: DataTypes.STRING,
        description: DataTypes.STRING,
        address: DataTypes.STRING,
        provindId: DataTypes.INTEGER,
        avata: DataTypes.BLOB('long'),
        userId: DataTypes.INTEGER,
        phone: DataTypes.STRING,
        rateId: DataTypes.FLOAT,
        status: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'Gara',
        freezeTableName: true
    });
    return Gara;
}; 