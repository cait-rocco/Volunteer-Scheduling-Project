'use strict';
module.exports = (sequelize, DataTypes) => {
  var Volunteer = sequelize.define('Volunteer', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    profile_pic: DataTypes.BLOB
  });
  
    Volunteer.associate = (models) => {
      Volunteer.belongsToMany(models.Charity, {
        through: 'CharityVolunteers',
        foreignKey: 'volunteer_id'
      });
      Volunteer.belongsToMany(models.CharityEvents, {
        through: 'EventVolunteers'
        foreignKey: 'volunteer_id'
      });
    };
  return Volunteer;
};