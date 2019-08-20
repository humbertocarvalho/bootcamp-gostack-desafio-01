const routes = require('express').Router();

let projects = [];
let cont = 0;
function existsProject() {}

function countRequests(req, res, next) {
  cont++;
  console.log(`Já foram feitas ${cont} requisições para o servidor.`);
  return next();
}

routes.use(countRequests);

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

routes.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  projects.find(project => {
    if (project.id === id) {
      project.title = title;
    }
  });

  return res.json(projects);
});

routes.delete('/projects/:id', (req, res) => {
  const { id } = req.params;

  projects = projects.filter(project => project.id !== id);

  return res.send();
});

routes.post('/projects/:id/tasks', (req, res) => {
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
