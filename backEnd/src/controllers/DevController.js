const axios = require('axios');
const Dev = require('../models/Dev');

const parseStringAsArray = require('../utils/parseStringAsArray');

// Métodos controller: index "mostrar lista", show "mostrar um unico", store " Armazenar o registro", update "atualizar", destroy "deletar registro"

module.exports = {
  async index (req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },

  async store (request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
  
      const { name = login, avatar_url, bio } = apiResponse.data;
    
      const techsArray = parseStringAsArray(techs);
    
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };
    
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      });
    }        

    return response.json(dev);
  },
  
  async update (request, response) {
    const { name, avatar_url, bio, techs, latitude, longitude } = request.body;

    const { github_username } = request.params;

    let dev = await Dev.findOne({ github_username });

    if (dev) {
      const techsArray = parseStringAsArray(techs);
    
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };
    
      dev = await Dev.update({        
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      });
    }        

    return response.json(dev);
  },

  async delete (request, response) {
    if (!request.params.github_username) {
      return response.status(401).json({ error: 'Incorret Params' });
    }
    const { github_username } = request.params;

    const dev = await Dev.findOne({ github_username });

    if (!dev) {
      return response.status(400).json({ error: 'Invalid Dev' });
    }
        
    await dev.remove({ where: { github_username } });

    return response.json({ Success: `Dev Successfully deleted!` });
  }

};