'use strict';

const {Router} = require(`express`);
const actionRouter = new Router();

actionRouter.get(`/`, (req, res) => res.render(`main`));
actionRouter.get(`/register`, (req, res) => res.render(`sign-up`));
actionRouter.get(`/login`, (req, res) => res.render(`login`));
actionRouter.get(`/search`, (req, res) => res.render(`search-result`));

module.exports = actionRouter;
