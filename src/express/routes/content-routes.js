'use strict';

const {Router} = require(`express`);
const contentRouter = new Router();
const axios = require(`axios`);

/* contentRouter.get(`/`, (req, res) => res.send(`/content`)); */


contentRouter.get("/comments", async (req, res) => {
  try {
    const getOffers = await axios.get(`http://localhost:8080/api/offers`);
    const allOffers = getOffers.data.slice(0,3);
    res.render(`comments`, {
       allOffers,
    });
  } catch (err) {
    res.render(`500`, { err });
  }
});


module.exports = contentRouter;
