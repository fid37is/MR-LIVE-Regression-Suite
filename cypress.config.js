const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    "baseUrl": "https://gener8risk.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});