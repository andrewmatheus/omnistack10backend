const axios = require('axios');
const Dev = require('../models/Dev');

const parseStringAsArray = require('../utils/parseStringAsArray');

// Métodos controller: index "mostrar lista", show "mostrar um unico", store " Armazenar o registro", update "atualizar", destroy "deletar registro"

module.exports = {
  async index (req, res) {
    //Buscar todos os devs num raio 10km
    //Filtrar por tecnologias

    const { latitude, longitude, techs } = req.query;

    const techsArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },
    });

    return res.json({ devs });
  }
};