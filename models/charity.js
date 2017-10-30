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
    description: DataTypes.STRING,
    logo: DataTypes.BLOB
  });

  Charity.associate = (models) => {
    Charity.belongsToMany(models.CharityEvent, {
      foreignKey: 'charity_id'
    });
    Charity.belongsToMany(models.Volunteers, {
      through: 'CharityVolunteers',
      foreignKey: 'charity_id'
    });
  };

  return Charity;
};