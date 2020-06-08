`use strict`;

const { Router } = require(`express`);
const { getMockData } = require(`../service/lib/get-mock-data`);

const { CategoryService, OfferService } = require(`../service/data-service`);


const setCategoryController = require(`./category/category`);
const setOfferController = require(`./offer/offer`)

const apiRoutes = {
    CATEGORIES: `/categories`,
    OFFERS: `/offers`
};

const router = new Router();

(async () => {
    try {
        const offers = await getMockData();
        const categoryService = new CategoryService(offers);
        const offerService = new OfferService(offers)

        setCategoryController(router, categoryService);
        setOfferController(router, offerService)
        
        router.use(apiRoutes.CATEGORIES, router);
        router.use(apiRoutes.OFFERS, router)

    } catch (error) {
        console.error(error);
    }
})();

exports.data = router;
