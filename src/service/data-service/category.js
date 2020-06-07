class CategoryService {
    constructor(offers) {
        this._offers = offers;
    }

    findAll() {
        console.log(this._offers);
        const categories = this._offers.reduce((acc, offer) => {
            acc.add(...offer.category);
            return acc;
        }, new Set());

        return [...categories];
    }
}

module.exports = CategoryService;