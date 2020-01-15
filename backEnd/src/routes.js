const { Router } = require('express');

const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();


//Métodos HTTP: GET, POST, PUT, DELETE

// Tipos de parâmetros:

// Query params: request.query (Filtros, ordenação, paginação, ...)
// Route params: request.params (Identificar um recurso na alteração ou remoção)
// Body: request.body (Dados para criação ou alteração de um registro)

// MongoDB (Banco de dados Não-relacional)

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.put('/devs/:github_username', DevController.update);
routes.delete('/devs/:github_username', DevController.delete);

routes.get('/search', SearchController.index);

module.exports = routes;