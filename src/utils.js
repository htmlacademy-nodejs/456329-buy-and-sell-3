'use strict';

const chalk = require(`chalk`);

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

module.exports.logInfo = (color, logText) => {
  console.log(chalk`{bold.${color} ${logText}}`);
}

module.exports.logInfo = (type, logText, color) => {
  type === `error` ? console.error(chalk`{bold.red ${logText}}`) : console.log(chalk`{bold.${color} ${logText}}`)
}

