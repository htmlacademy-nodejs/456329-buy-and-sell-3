'use strict';

const {Router} = require(`express`);
const {getMockData} = require(`../service/lib/get-mock-data`);

const {CategoryService, OfferService, SearchService} = require(`../service/data-service`);


const setCategoryController = require(`./category/category`);
const setOfferController = require(`./offer/offer`);
const setSearchController = require(`./search/search`);

const apiRoutes = {
  CATEGORIES: `/categories`,
  OFFERS: `/offers`,
  SEARCH: `/search`
};

const router = new Router();

(async () => {
  try {
    const offers = await getMockData();
    const categoryService = new CategoryService(offers);
    const offerService = new OfferService(offers);
    const search = new SearchService(offers);

    setCategoryController(router, categoryService);
    setOfferController(router, offerService);
    setSearchController(router, search);

    router.use(apiRoutes.CATEGORIES, setCategoryController);
    router.use(apiRoutes.OFFERS, setOfferController);
    router.use(apiRoutes.SEARCH, setSearchController);

  } catch (error) {
    console.error(error);
  }
})();

exports.data = router;
