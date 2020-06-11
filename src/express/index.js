'use strict';

const express = require(`express`);
const path = require(`path`);
const app = express();
const {data} = require(`../api`);

const {
  logInfo,
} = require(`../utils`);

const {
  offersRoutes,
  contentRoutes,
  actionRoutes,
} = require(`./routes/index`);

const PUBLIC_DIR = `public`;
const API_PREFIX = `/api`;
const DEFAULT_PORT = 8080;

app.use(express.json());

// Используем REST api
app.use(API_PREFIX, data);

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
