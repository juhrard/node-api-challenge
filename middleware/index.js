const Projects = require('../data/helpers/projectModel');
const Actions = require('../data/helpers/actionModel');

function validateProjectId(req, res, next) {
  Projects.get(req.params.id)
    .then(project => {
      if(project) {
        req.project = project;
        next();
      } else {
        res.status(400).json({ message: "Invalid project id" })
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error retreiving the project",
      });
    });
}

function validateProject(req, res, next) {
  if(!req.body) {
    res.status(400).json({ message: "Missing project data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "Missing required name field" });
  } else if (!req.body.description) {
    res.status(400).json({ message: "Missing required description field" });
  } else {
    next()
  }
}

function validateAction(req, res, next) {
  if(!req.body) {
    res.status(400).json({ message: "Missing project data" });
  } else if (!req.body.description) {
    res.status(400).json({ message: "Missing required description field" });
  } else if (!req.body.notes) {
    res.status(400).json({ message: "Missing required notes field" });
  } else {
    next()
  }
}

function validateActionId(req, res, next) {
  Actions.get(req.params.id)
  .then(post => {
    if(post) {
      req.post = post;
      next();
    } else {
      res.status(400).json({ message: "Invalid action id" })
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: "Error retreiving the action",
    });
  });
}

module.exports = { validateAction, validateActionId, validateProject, validateProjectId };
