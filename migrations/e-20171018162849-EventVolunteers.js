'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('EventVolunteers',{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      charity_event_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'CharityEvents',//plural required here
          key:'id'
        },
        onUpdate:'cascade',
        onDelete:'cascade'
      },
      charity_volunteer_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'CharityVolunteers',
          key:'id'
        },
        onUpdate:'cascade',
        onDelete:'cascade'
      },
      time: {
        allowNull: false,
        type: Sequelize.STRING
      },
      position: {
        allowNull: false,
        type: Sequelize.STRING
      },
      status: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      vols_needed: {
        allowNull: true,
        type: Sequelize.INTEGER
      }

    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('EventVolunteers')
  }
};
