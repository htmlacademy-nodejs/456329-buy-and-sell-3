'use strict';

const { Router } = require(`express`);
const { HttpCode } = require(`../../constants`);
const route = new Router();

module.exports = (app, service) => {
    app.use(`/offers`, route);

    route.get(`/`, (req, res) => {
        const offers = service.findAll();
        res.status(HttpCode.OK)
            .json(offers);
    });

    route.get(`/:offerId`, (req, res) => {
        const { offerId } = req.params;
        const offerById = service.findOne(offerId);
        res.status(HttpCode.OK)
            .json(offerById);

    });

    route.get(`/:offerId/comments`, (req, res) => {
        const { offerId } = req.params;
        const offerById = service.findOne(offerId).comments;
        res.status(HttpCode.OK)
            .json(offerById);

    });

    route.post(`/:offerId/comments`, (req, res) => {
        const { offerId } = req.params;
        const { commentText } = req.body
        const offerById = service.findOne(offerId).comments;
        const sendComment = service.createComment(offerById, commentText)
        res.status(HttpCode.CREATED).json(sendComment);
    });

    route.post(`/`, (req, res) => {
        const { category, description, picture, title, type, sum } = req.body;
        const newOffer = service.create({ category, description, picture, title, type, sum });
        res.status(HttpCode.CREATED).json(newOffer);
    })

    route.put(`/:offerId`, (req, res) => {
        const { offerId } = req.params;
        const { category, description, picture, title, type, sum } = req.body;
        const updatedOffer = service.update(offerId, { category, description, picture, title, type, sum });
        res.status(HttpCode.OK).json(updatedOffer);
    });

    route.delete(`/:offerId`, (req, res) => {
        const { offerId } = req.params;
        const deletedOffer = service.drop(offerId);
        res.status(HttpCode.OK).json(deletedOffer);
    });

}
