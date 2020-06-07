'use strict';

const fs = require(`fs`).promises;
const { nanoid } = require(`nanoid`);

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`

const {
  getRandomInt,
  shuffle,
  getPictureFileName,
  generateComments,
  logInfo,
  logInfoError,
} = require(`../../utils`);

const {
  MAX_ID_LENGTH,
  MAX_COMMENTS,
} = require(`../../constants`);

const DEFAULT_COUNT = 1;

const FILE_NAME = `mocks.json`;

const OfferType = {
  offer: `offer`,
  sale: `sale`,
};

const SumRestrict = {
  min: 1000,
  max: 100000,
};

const PictureRestrict = {
  min: 1,
  max: 16
};

const generateOffers = (count, titles, categories, sentences, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    category: [categories[getRandomInt(0, categories.length - 1)]],
    description: shuffle(sentences).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.min, PictureRestrict.max)),
    title: titles[getRandomInt(0, titles.length - 1)],
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(SumRestrict.min, SumRestrict.max),
    comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments),
  }))
);

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    const contentTrim = content
      .toString()
      .split(`\n`)
      .map((line) => {
        return line.trim();
      })
      .filter((line) => {
        return line ? true : false;
      });

    return contentTrim;
  } catch (err) {
    logInfoError(err);
    return [];
  }
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const comments = await readContent(FILE_COMMENTS_PATH);

    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer, titles, categories, sentences, comments));

    try {
      if (args < 1000) {
        await fs.writeFile(FILE_NAME, content);
        logInfo(`Operation success. File created.`, `green`);
      } else {
        logInfoError(`Less then 1000, please`);
      }
    } catch (err) {
      logInfoError(`Can't write data to file...`);
    }
  }
};
