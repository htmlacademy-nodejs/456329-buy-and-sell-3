'use strict';

class SearchService {
  constructor(offers) {
    this._offers = offers;
  }

  searchResult(title) {
    return this._offers.filter((offer) => offer.title.includes(title));
  }
}

module.exports = SearchService;
