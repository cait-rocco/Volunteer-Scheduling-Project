'use strict';

const { eventVolunteers } = require('./data/eventVolunteers');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('EventVolunteers', eventVolunteers, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('EventVolunteers', null, {});
  }
};
