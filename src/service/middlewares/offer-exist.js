'use strict';

const {HttpCode} = require(`../../constants`);

exports.existingOffer = (service) => (req, res, next) => {
  const {offerId} = req.params;
  const offer = service.findOne(offerId);

  if (!offer) {
    return res.status(HttpCode.NOT_FOUND)
      .send(`Offer with '${offerId}' not found`);
  }

  res.locals.offer = offer;
  return next();
};
