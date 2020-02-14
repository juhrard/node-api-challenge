const express = require('express');
const Actions = require('../data/helpers/actionModel');
const { validateActionId, validateAction } = require('../middleware');

const router = express.Router();

router.get('/', (req, res) => {
  console.log("headers", req.headers);

  Actions.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the Actions",
      });
    });
});

router.get('/:id', validateActionId, (req, res) => {
  Actions.get(req.params.id)
  .then(action => {
    if (action) {
      res.status(200).json(action);
    } else {
      res.status(404).json({ message: "action not found" });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the action",
    });
  });
});

router.delete('/:id', (req, res) => {
  Actions.remove(req.params.id)
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

router.put('/:id', validateAction, (req, res) => {
  Actions.update(req.params.id, req.body)
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

module.exports = router;
