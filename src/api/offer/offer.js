const { Router } = require(`express`);
const { HttpCode } = require(`../../constants`);
const offerValidator = require(`../../service/middlewares/offer-validator`);
const offerExist = require(`../../service/middlewares/offer-exist`)
const route = new Router();

module.exports = (app, offerService) => {
    app.use(`/offers`, route);

    route.get(`/:offerId`, (req, res) => {
        const { offerId } = req.params;
        const offer = offerService.findOne(offerId);

        if (!offer) {
            return res.status(HttpCode.NOT_FOUND)
                .send(`Not found with ${offerId}`);
        }

        return res.status(HttpCode.OK)
            .json(offer);
    });

    route.get(`/:offerId/comments`, offerExist(offerService), (req, res) => {
        const {offer} = res.locals;
    });

    route.post(`/`, offerValidator, (req, res) => {
        const offer = offerService.create(req.body);

        return res.status(HttpCode.CREATED)
            .json(offer);
    });

}