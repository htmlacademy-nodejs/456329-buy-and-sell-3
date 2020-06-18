'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const route = new Router();
const {existingOffer} = require(`../../service/middlewares/offer-exist`);
const {getLogger} = require(`../../service/cli/logger`);

const logger = getLogger();


module.exports = (app, service) => {
  app.use(`/offers`, route);

  route.get(`/`, (req, res) => {
    const offers = service.findAll();
    res.status(HttpCode.OK)
      .json(offers);
    logger.debug(`GET /api/offers status code ${res.statusCode}`);
  });

  route.get(`/:offerId`, existingOffer(service, `GET /api/offers/:offerId`), (req, res) => {
    const {offerId} = req.params;
    const offer = service.findOne(offerId);
    res.status(HttpCode.OK)
      .json(offer);

  });

  route.get(`/:offerId/comments`, existingOffer(service, `GET /:offerId/comments`), (req, res) => {
    const {offerId} = req.params;
    const offerById = service.findOne(offerId).comments;
    res.status(HttpCode.OK)
      .json(offerById);

  });

  route.post(`/:offerId/comments`, existingOffer(service, `POST /:offerId/comments`), (req, res) => {
    const {offer} = res.locals;
    const comment = service.createComment(offer, req.body);

    res.status(HttpCode.CREATED)
      .json(comment);
  });

  route.post(`/`, (req, res) => {
    let offer;

    if (Object.entries(req.body).length === 0 && req.body.constructor === Object) {
      res.status(HttpCode.BAD_REQUEST)
        .send(`Data is empty`);
    } else {
      offer = service.create(req.body);
    }

    res.status(HttpCode.CREATED)
      .json(offer);
    logger.debug(`POST /api/offers - status code: ${res.statusCode}`);

  });

  route.put(`/:offerId`, existingOffer(service, `PUT /:offerId`), (req, res) => {
    const {offer} = res.locals;
    const updateOffer = service.update(offer.id, req.body);
    res.status(HttpCode.OK)
      .json(updateOffer);
  });

  route.delete(`/:offerId`, existingOffer(service, `DELETE /:offerId`), (req, res) => {
    const {offer} = res.locals;
    const deletedOffer = service.drop(offer.id);
    res.status(HttpCode.OK)
      .json(deletedOffer);
  });

  route.delete(`/:offerId/comments/:commentId`, existingOffer(service, `DELETE /:offerId/comments/:commentId`), (req, res) => {
    const {commentId} = req.params;
    const {offer} = res.locals;
    const deleteComment = service.dropComment(offer, commentId);

    return res.status(HttpCode.OK)
      .json(deleteComment);
  });

};
