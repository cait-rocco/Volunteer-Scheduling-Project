'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    street_address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    donation_link: DataTypes.STRING,
    description: DataTypes.TEXT,
    picture: DataTypes.BLOB,
    user_type: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {timestamps: false});

  User.associate = (models) => {
    User.hasMany(models.CharityEvent, {
      foreignKey: 'charity_id'
    });
    User.belongsToMany(models.User, {
      through: 'CharityVolunteers',
      foreignKey: 'charity_id',
      as: 'charity'
    });
    User.belongsToMany(models.User, {
      through: 'CharityVolunteers',
      foreignKey: 'volunteer_id',
      as: 'volunteer'
    });
  };

  return User;
};