"use strict";

const { Router } = require(`express`);
const actionRouter = new Router();
const axios = require(`axios`);

actionRouter.get("/", async (req, res) => {
  try {
    const getCategories = await axios.get(`http://localhost:8080/api/categories`);
    const getOffers = await axios.get(`http://localhost:8080/api/offers`);
    const allOffers = getOffers.data;
    const allCategories = getCategories.data
    res.render(`main`, {
       allOffers,
       allCategories,
    });
  } catch (err) {
    res.render(`500`, { err });
  }
});

actionRouter.get(`/register`, (req, res) => res.render(`sign-up`));
actionRouter.get(`/login`, (req, res) => res.render(`login`));

actionRouter.get(`/search`, async (req, res) => {
  try {
    const response = await axios.get(encodeURI(`http://localhost:8080/api/search?query=${req.query.search}`));
    const findedOffers = response.data;
    console.log(findedOffers.length)
    res.render(`search-result`, {findedOffers});
  } catch (err) {
    res.render(`500`, {err});
  }
});

module.exports = actionRouter;
