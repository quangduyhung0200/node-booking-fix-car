'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Gender, { foreignKey: 'gender', targetKey: 'id', as: 'genderDataUser' });
      User.belongsTo(models.Group, { foreignKey: 'groupId', targetKey: 'id', as: 'groupData' });
      User.belongsTo(models.Gara, { foreignKey: 'garaId', as: 'userGara' });
      User.hasMany(models.Booking, { foreignKey: 'userId', as: 'bookingData' });

    }
  };
  User.init({
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    gender: DataTypes.STRING,
    address: DataTypes.STRING,
    groupId: DataTypes.INTEGER,

    avata: DataTypes.BLOB('long'),
    garaId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
    freezeTableName: true
  });
  return User;
}; 