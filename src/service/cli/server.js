'use strict';

const express = require(`express`);
const {readFile} = require(`fs`).promises;
const {HttpCode} = require(`../../constants`);

const {
  logInfo,
  logInfoError,
} = require(`../../utils`);



const DEFAULT_PORT = 3000;


module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;
    

    const app = express();

    app.use(express.json());

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
