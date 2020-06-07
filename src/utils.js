'use strict';

const chalk = require(`chalk`);
const { nanoid } = require(`nanoid`);

const {
  MAX_ID_LENGTH,
} = require(`./constants`);

module.exports.getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports.shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

module.exports.getPictureFileName = (numb) => {
  if (numb < 10) {
    numb = `0${numb}`;
  }
  return `item${numb}.jpg`;

};

module.exports.generateComments = (count, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: this.shuffle(comments)
      .slice(0, this.getRandomInt(1, 3))
      .join(` `),
  }))
);

module.exports.logInfo = (logText, logColor) => console.log(chalk`{${logColor} ${logText}}`);

module.exports.logInfoError = (logText) => console.error(chalk.red(logText));