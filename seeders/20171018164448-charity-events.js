'use strict';

const { charityEvents } = require('./data/charityEvents');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('CharityEvents', charityEvents, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('CharityEvents', null, {});
  }
};
