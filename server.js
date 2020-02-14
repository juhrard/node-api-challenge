const express = require('express');

const projectRouter = require('./routers/projectRouter');
const actionRouter = require('./routers/actionRouter');

const server = express();

server.use(express.json());

server.use('/api/projects', logger, projectRouter);
server.use('/api/actions', logger, actionRouter);

server.get('/', (req, res) => {
  res.send(`<h2>API Sprint Challenge!</h2>`);
});

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}]${req.method} Request to ${req.originalUrl}`);
  next();
}

module.exports = server;
