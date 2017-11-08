'use strict';
module.exports = (sequelize, DataTypes) => {
  var EventTimes = sequelize.define('EventTimes', {
    charity_event_id: DataTypes.INTEGER,
    time: DataTypes.STRING,
    position: DataTypes.TEXT,
    vols_needed: DataTypes.INTEGER
  }, {timestamps: false});
  
    EventTimes.associate = (models) => {
      EventTimes.belongsToMany(models.User, {
        through: 'EventVolunteers',
        foreignKey: 'event_time_id',
        as: 'times'
      });
      EventTimes.associate = (models) => {
        EventTimes.belongsTo(models.CharityEvent, {
        foreignKey: 'charity_event_id'
        });
      };
    };
  return EventTimes;
};