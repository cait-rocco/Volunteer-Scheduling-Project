'use strict';
module.exports = (sequelize, DataTypes) => {
  var Charity = sequelize.define('Charity', {
    name: DataTypes.STRING,
    street_address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    donation_link: DataTypes.STRING,
    description: DataTypes.TEXT,
    logo: DataTypes.BLOB,
    user_type: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {timestamps: false});

  Charity.associate = (models) => {
    Charity.hasMany(models.CharityEvent, {
      foreignKey: 'charity_id'
    });
    Charity.belongsToMany(models.Volunteer, {
      through: 'CharityVolunteers',
      foreignKey: 'charity_id'
    });
  };

  return Charity;
};