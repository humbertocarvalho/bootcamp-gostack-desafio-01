const routes = require('express').Router();

let projects = [];

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
  projects.map(project => {
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

module.exports = routes;
