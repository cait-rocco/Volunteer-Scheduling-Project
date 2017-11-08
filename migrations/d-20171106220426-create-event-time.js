'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('EventTimes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      charity_event_id: {
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'CharityEvents',
          key:'id'
        },
        onUpdate:'cascade',
        onDelete:'cascade'
      },
      time: {
        type: Sequelize.STRING
      },
      position: {
        type: Sequelize.TEXT
      },
      vols_needed: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('EventTimes');
  }
};