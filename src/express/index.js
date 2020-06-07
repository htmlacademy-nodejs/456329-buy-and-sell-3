'use strict';

const express = require(`express`);
const { Router } = require(`express`);
const path = require(`path`);
const router = new Router()
const app = express();

const { readFile } = require(`fs`).promises;
const { setCategoryController } = require(`../api`);
const { CategoryService } = require(`../service/data-service`);


const {
  logInfo,
} = require(`../utils`);

const {
  offersRoutes,
  contentRoutes,
  actionRoutes,
} = require(`./routes/index`);


const PUBLIC_DIR = `public`;
const FILENAME = `./mocks.json`;
const API_PREFIX = `/api`
const DEFAULT_PORT = 8080;

let offers;

(async function () {
  offers = await readFile(FILENAME);
  offers = JSON.parse(offers.toString());
  const categoryService = new CategoryService(offers)
  app.use(API_PREFIX, router);
  setCategoryController(router, categoryService);
  
})();



// Используем необходимые модули
app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

// Подключим созданные маршруты
app.use(`/offers`, offersRoutes);
app.use(`/content`, contentRoutes);
app.use(`/`, actionRoutes);

// Запуск сервера
app.listen(DEFAULT_PORT, () => logInfo(`Сервер запущен на порту: ${DEFAULT_PORT}`, `green`));