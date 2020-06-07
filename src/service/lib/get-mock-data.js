const fs = require(`fs`).promises;
const FILENAME = `mocks.json`;
let data = null;

module.exports.getMockData = async () => {
    if (data !== null) {
        return Promise.resolve(data);
    }
    try {
        const fileContent = await fs.readFile(FILENAME);
        data = JSON.parse(fileContent);
        res.json(data);
    } catch (err) {
        logInfoError(`Ошибка ${err}`);
        res.status(HttpCode.INTERNAL_SERVER_ERROR);
        res.end();
        return Promise.reject(err);
    }

    return Promise.resolve(data);
};