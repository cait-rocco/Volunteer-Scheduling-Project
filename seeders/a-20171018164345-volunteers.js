'use strict';

const { volunteers } = require('./data/volunteers');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Volunteers', volunteers, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Volunteers', null, {});
  }
};