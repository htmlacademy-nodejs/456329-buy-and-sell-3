'use strict';

const express = require(`express`);
const path = require(`path`);
const app = express();
const apiRoutes = require(`../api`);
const {getLogger} = require(`../service/cli/logger`);
const {HttpCode} = require(`../constants`);
const bodyParser = require(`body-parser`)

const logger = getLogger();

const {
  offersRoutes,
  contentRoutes,
  actionRoutes,
} = require(`./routes/index`);

const PUBLIC_DIR = `public`;
const API_PREFIX = `/api`;
const DEFAULT_PORT = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Используем REST api
app.use(API_PREFIX, apiRoutes);

/* app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND)
  res.json({
    error: {
      'name': 'Error',
      'status': 404,
      'message': 'Invalid Request',
      'statusCode': 404,
    }
  });
  logger.error(`Wrong route`);
}); */

// Используем необходимые модули
app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

// Подключим созданные маршруты
app.use(`/offers`, offersRoutes);
app.use(`/content`, contentRoutes);
app.use(`/`, actionRoutes);


app.listen(DEFAULT_PORT, () => {
  // Регистрируем запуск сервера
  logger.info(`server start on ${DEFAULT_PORT}`);
})
  .on(`error`, (err) => {
    // Логируем ошибку, если сервер не смог стартовать
    logger.error(`Server can't start. Error: ${err}`);
  });

module.exports = app;
