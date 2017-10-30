'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Volunteers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      profile_pic: {
        type: Sequelize.BLOB
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Volunteers');
  }
};