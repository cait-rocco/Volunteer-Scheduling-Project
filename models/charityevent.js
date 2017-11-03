'use strict';
module.exports = (sequelize, DataTypes) => {
  var CharityEvent = sequelize.define('CharityEvent', {
    charity_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    date: DataTypes.DATE,
    street_address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.INTEGER
  }, {timestamps: false});
  
    CharityEvent.associate = (models) => {
      CharityEvent.belongsTo(models.User, {
        foreignKey: 'charity_id'
      });
    };

  return CharityEvent;
};