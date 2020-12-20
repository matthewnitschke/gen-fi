const mongoose = require('mongoose');
const toMils = require('to-mils');

const mongoUrl = 'mongodb://db/fi';
const retryTime = '5sec';

var connectWithRetry = function (resolve) {
  return mongoose.connect(mongoUrl, function (err) {
    if (err) {
      console.log(
        `Failed to connect to mongo on startup - retrying in ${retryTime}`
      );
      setTimeout(() => connectWithRetry(resolve), toMils(retryTime));
    } else {
      console.log('Connected to mongo db');
      resolve();
    }
  });
};

module.exports = async () => {
  return new Promise((resolve, reject) => {
    try {
      connectWithRetry(resolve);
    } catch (e) {
      reject(e);
    }
  });
};
