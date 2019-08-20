const routes = require('express').Router();

let projects = [];
let cont = 0;

function existsProjectMiddleware(req, res, next) {
  const { id } = req.params;

  const index = projects.find(project => project.id === id);

  if (!index) {
    return res.status(400).send(`Project with ID ${id} not found`);
  }

  return next();
}

function countRequestsMiddleware(req, res, next) {
  cont++;
  console.log(`Já foram feitas ${cont} requisições para o servidor.`);
  return next();
}

routes.use(countRequestsMiddleware);

routes.post('/projects', (req, res) => {
  const { id, title } = req.body;
  projects.push({
    id,
    title,
    tasks: []
  });
  return res.json(projects);
});

routes.get('/projects', (req, res) => {
  return res.json(projects);
});

routes.put('/projects/:id', existsProjectMiddleware, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  projects.find(project => {
    if (project.id === id) {
      project.title = title;
    }
  });

  return res.json(projects);
});

routes.delete('/projects/:id', existsProjectMiddleware, (req, res) => {
  const { id } = req.params;

  projects = projects.filter(project => project.id !== id);

  return res.send();
});

routes.post('/projects/:id/tasks', existsProjectMiddleware, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  projects.find(project => {
    if (project.id === id) {
      project.tasks.push(title);
    }
  });

  return res.json(projects);
});

module.exports = routes;
