'use strict';

const {
  logInfo,
} = require(`../../utils`);

const packageJsonFile = require(`../../../package.json`);

module.exports = {
  name: `--version`,
  run() {
    const version = packageJsonFile.version;
    logInfo(version, `blue`)
  }
};
