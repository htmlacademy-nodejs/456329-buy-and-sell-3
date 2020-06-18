'use strict';

const {HttpCode} = require(`../../constants`);
const {getLogger} = require(`../../service/cli/logger`);

const logger = getLogger();

exports.existingOffer = (service, loggerText) => (req, res, next) => {
  const {offerId} = req.params;
  const offer = service.findOne(offerId);

  if (!offer) {
    return res.status(HttpCode.NOT_FOUND)
      .send(`Offer with '${offerId}' not found`);
  }

  res.locals.offer = offer;
  logger.debug(`${loggerText} - status code: ${req.url}`);
  return next();
};
