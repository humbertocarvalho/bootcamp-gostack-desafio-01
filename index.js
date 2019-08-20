const express = require('express');
const server = express();
const routes = require('./routes');

// Habilita o express para reconhecer o body como JSON.
server.use(express.json());

// Indica para express para usar as rotinas definidas no arquivo de rotas
server.use(routes);

// Indica para o Express rodar na porta 3333.
server.listen(3333);
