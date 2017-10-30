'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('EmployeeComputers',{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      charity_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Charities',//plural required here
          key:'id'
        },
        onUpdate:'cascade',
        onDelete:'cascade'
      },
      volunteer_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Volunteers',
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
