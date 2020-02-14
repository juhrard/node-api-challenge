const express = require('express');
const Projects = require('../data/helpers/projectModel');
const Actions = require('../data/helpers/actionModel');
const { validateAction, validateProject, validateProjectId, validateActionId } = require('../middleware');

const router = express.Router();

router.post('/', validateProject, (req, res) => {
  Projects.insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error adding the project",
      });
    });
});

router.post('/:id/actions', validateProjectId, validateAction, (req, res) => {
  const newAction = { ...req.body, project_id: req.params.id };

  Actions.insert(newAction)
    .then(action => {
      res.status(210).json(action);
    })
    .catch(error => {

      console.log(error);
      res.status(500).json({
        message: "Error getting the Actions for the project",
      });
    });
});

router.get('/', (req, res) => {
  console.log("headers", req.headers);

  Projects.get()
    .then(Projects => {
      res.status(200).json(Projects);
    })
    .catch(error => {

      console.log(error);
      res.status(500).json({
        message: "Error retrieving the Projects",
      });
    });
});

router.get('/:id', validateProjectId, (req, res) => {
  Projects.get(req.params.id)
  .then(project => {
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "project not found" });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the project",
    });
  });
});

router.get('/:id/actions', validateProjectId, (req, res) => {
  Projects.getProjectActions(req.params.id)
  .then(Actions => {
    res.status(200).json(Actions);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: "Error getting the Actions for the project",
    });
  });
});

router.delete('/:id', validateProjectId, (req, res) => {
  Projects.remove(req.params.id)
  .then(count => {
    if (count > 0) {
      res.status(200).json({ message: "The project has been nuked" });
    } else {
      res.status(404).json({ message: "The project could not be found" });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: "Error removing the project",
    });
  });
});

router.put('/:id', validateProjectId, (req, res) => {
  Projects.update(req.params.id, req.body)
  .then(project => {
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "The project could not be found" });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: "Error updating the project",
    });
  });
});

router.put('/:id/actions/:actionId', validateAction, (req, res) => {
  Actions.update(req.params.actionId, req.body)
  .then(action => {
    if (action) {
      res.status(200).json(action);
    } else {
      res.status(404).json({ message: "The action could not be found" });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: "Error updating the action",
    });
  });
});

router.delete('/:id/actions/:actionId', validateActionId, (req, res) => {
  Actions.remove(req.params.actionId)
  .then(count => {
    if (count > 0) {
      res.status(200).json({ message: "The action has been nuked" });
    } else {
      res.status(404).json({ message: "The action could not be found" });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: "Error removing the action",
    });
  });
});

module.exports = router;
