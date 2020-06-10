'use strict';

const {nanoid} = require(`nanoid`);
const MAX_ID_LENGTH = 6;

class OfferService {
  constructor(offers) {
    this._offers = offers;
  }

  create(offer) {
    const newOffer = Object.assign({
      id: nanoid(MAX_ID_LENGTH),
      comments: []
    }
    , offer);

    this._offers.push(newOffer);
    return newOffer;
  }

  createComment(offer, comment) {
    const newComment = Object.assign({
      id: nanoid(MAX_ID_LENGTH)
    }, comment);

    offer.comments.push(newComment);
    return newComment;
  }


  drop(id) {
    const offer = this._offers.find((item) => item.id === id);

    if (!offer) {
      return null;
    }

    this._offers = this._offers.filter((item) => item.id !== id);
    return offer;
  }

  dropComment(offer, commentId) {
    const dropComment = offer.comments.find((item) => item.id === commentId);

    if (!dropComment) {
      return null;
    }

    offer.comments = offer.comments.filter((item) => item.id !== commentId);
    return dropComment;
  }

  findAll() {
    return this._offers;
  }

  findOne(id) {
    return this._offers.find((item) => item.id === id);
  }

  update(id, offer) {
    const oldOffer = this._offers
      .find((item) => item.id === id);

    return Object.assign(oldOffer, offer);
  }

}

module.exports = OfferService;
