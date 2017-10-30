'use strict';
module.exports = (sequelize, DataTypes) => {
  var CharityEvent = sequelize.define('CharityEvent', {
    charity_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.DATE,
    street_address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.INTEGER
  });
  
    CharityEvent.associate = (models) => {
      CharityEvent.belongsToMany(models.Volunteers, {
        through: 'EventVolunteers',
        foreignKey: 'charity_event_id'
      });
    };
  return CharityEvent;
};