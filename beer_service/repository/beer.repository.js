const { Op } = require('sequelize');

const Beer = require('../models/beer');


class BeerRepository {
    async getAll(filter = null) {
      try {
        let beers;
        if(filter) {
            beers = await Beer.findAll({
                where: {
                  id: {
                    [Op.in]: filter,
                  },
                },
            });
        }
        else
            beers = await Beer.findAll();
        return beers.map(b=> b.dataValues);
      } catch (error) {
        throw new Error('Error retrieving beers from the database');
      }
    }
  
    async get(id) {
      try {
        const beer = await Beer.findByPk(id);
        return beer.dataValues;
      } catch (error) {
        throw new Error(`Error retrieving beer with ID ${id}`);
      }
    }
  }
  
  module.exports = BeerRepository;