'use strict';

const express = require(`express`);
const {readFile} = require(`fs`).promises;
const {HttpCode} = require(`../../constants`);

const {
  logInfo,
  logInfoError,
} = require(`../../utils`);

const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;


module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    const app = express();

    app.use(express.json());

    app.get(`/offers`, async (req, res) => {
      try {
        const fileContent = await readFile(FILENAME);
        const mocks = JSON.parse(fileContent);
        res.json(mocks);
      } catch (err) {
        logInfoError(`Ошибка в маршруте '/offers' ${err}`);
        res.status(HttpCode.INTERNAL_SERVER_ERROR);
        res.end();
      }
    });

    app.use((req, res) => res.status(HttpCode.NOT_FOUND).send(`Not found`));

    app
      .listen(port, () => {
        logInfo(`Ожидаю соединение на ${port}`, `green`);
      })
      .on(`error`, (err) => {
        logInfoError(`Ошибка при создании сервера ${err}`);
      });
  }
};
