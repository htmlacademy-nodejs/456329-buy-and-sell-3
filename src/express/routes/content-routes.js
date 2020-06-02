'use strict';

const {Router} = require(`express`);
const contentRouter = new Router();

contentRouter.get(`/`, (req, res) => res.send(`/content`));
contentRouter.get(`/comments`, (req, res) => res.send(`/content/comments`));

module.exports = contentRouter;
