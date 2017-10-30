'use strict';

const { charities } = require('./data/charities');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Charities', charities, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Charities', null, {});
  }
};
