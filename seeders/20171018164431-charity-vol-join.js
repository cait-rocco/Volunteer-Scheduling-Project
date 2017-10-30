'use strict';

const { charityVolunteers } = require('./data/charityVolunteers');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('CharityVolunteers', charityVolunteers, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('CharityVolunteers', null, {});
  }
};
