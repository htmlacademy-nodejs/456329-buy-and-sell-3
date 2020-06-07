const { Router } = require(`express`);
const { HttpCode } = require(`../../constants`);

const route = new Router();

module.exports = (app, service) => {
    app.use(`/search`, route);

    route.get(`/`, (req, res) => {
        const categories = service.findAll();
        res.status(HttpCode.OK)
            .json(categories);
    });
}