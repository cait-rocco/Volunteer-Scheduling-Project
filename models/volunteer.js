'use strict';
module.exports = (sequelize, DataTypes) => {
  var Volunteer = sequelize.define('Volunteer', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    profile_pic: DataTypes.BLOB,
    user_type: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {timestamps: false});
  
    Volunteer.associate = (models) => {
      Volunteer.belongsToMany(models.Charity, {
        through: 'CharityVolunteers',
        foreignKey: 'volunteer_id'
      })
    };
  return Volunteer;
};


// CharityVolunteer.belongsToMany(models.CharityEvents, {
//   through: 'EventVolunteers',
//   foreignKey: 'charity_volunteer_id'
// });