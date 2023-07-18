'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('beers', [
      {
        name: 'Efes',
        bartender_preparation_time: 5,
        volume: 330,
        pour_time: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Heinken',
        bartender_preparation_time: 7,
        volume: 500,
        pour_time: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Corona',
        bartender_preparation_time: 4,
        volume: 500,
        pour_time: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sol',
        bartender_preparation_time: 6,
        volume: 330,
        pour_time: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Carlsberg',
        bartender_preparation_time: 7,
        volume: 500,
        pour_time: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Guinness',
        bartender_preparation_time: 8,
        volume: 500,
        pour_time: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Miller',
        bartender_preparation_time: 3,
        volume: 330,
        pour_time: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Becks',
        bartender_preparation_time: 4,
        volume: 330,
        pour_time: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Budweiser',
        bartender_preparation_time: 6,
        volume: 500,
        pour_time: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Tuborg',
        bartender_preparation_time: 6,
        volume: 500,
        pour_time: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Asahi ',
        bartender_preparation_time: 3,
        volume: 330,
        pour_time: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Peroni ',
        bartender_preparation_time: 4,
        volume: 330,
        pour_time: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Skol',
        bartender_preparation_time: 9,
        volume: 500,
        pour_time: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bud Light',
        bartender_preparation_time: 3,
        volume: 330,
        pour_time: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('beers', null, {});
  }
};
