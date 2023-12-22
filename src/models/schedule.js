'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Schedule extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Schedule.belongsTo(models.Time, { foreignKey: 'timeType', targetKey: 'id', as: 'timeDataSchedule' });
            Schedule.belongsTo(models.Gara, { foreignKey: 'garaId', targetKey: 'id', as: 'GaraScheduleData' });

        }
    };
    Schedule.init({
        date: DataTypes.STRING,
        timeType: DataTypes.STRING,
        garaId: DataTypes.INTEGER,


    }, {
        sequelize,
        modelName: 'Schedule',
        freezeTableName: true
    });
    return Schedule;
}; 