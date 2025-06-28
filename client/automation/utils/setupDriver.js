const { Builder } = require('selenium-webdriver');

const setupDriver = async () => {
  const driver = await new Builder().forBrowser('chrome').build();
  return driver;
};

module.exports = setupDriver;
