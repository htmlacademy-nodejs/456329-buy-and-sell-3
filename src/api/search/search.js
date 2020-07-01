'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const route = new Router();
const {getLogger} = require(`../../service/cli/logger`);

const logger = getLogger();


module.exports = (app, service) => {
  app.use(`/search`, route);

  route.get(``, (req, res) => {
    const {query} = req.query;
    
    if (!query) {
      return res.status(HttpCode.BAD_REQUEST).send(`Invalid query`);
    }

    const searchedResult = service.searchResult(query);
    res.status(HttpCode.OK).json(searchedResult);
    logger.debug(`GET api/search?query=${query} code ${res.statusCode}`);
  });
};
