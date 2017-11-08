'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CharityVolunteers',{
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
          model:'Users',//plural required here
          key:'id'
        },
        onUpdate:'cascade',
        onDelete:'cascade'
      },
      volunteer_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Users',
          key:'id'
        },
        onUpdate:'cascade',
        onDelete:'cascade'
      },
      application: {
        allowNull: true,
        type: Sequelize.BLOB
      },
      status: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }

    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('CharityVolunteers')
  }
};