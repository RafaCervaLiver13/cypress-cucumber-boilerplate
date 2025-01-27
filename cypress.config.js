const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const fs = require('fs');

module.exports = defineConfig({
  e2e: {
    specPattern: "**/*.feature",
    requestTimeout: 16000,
    defaultCommandTimeout: 12000,
    chromeWebSecurity: false,
    blockHosts: [
      '*google-analytics.com',
      '*googletagmanager.com',
      '*bambuser.com',
      '*appsflyer.com',
      '*snapchat.com',
      '*pinterest.com',
      '*tiktok.com'
    ],
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/116.0.5845.177 Mobile/15E148 Safari/604.1',
    retries: {
      "runMode": 1,
      "openMode": 0
    },
    // view port iphone-x
    viewportWidth: 390,
    viewportHeight: 844,
    video: false,
    //experimentalWebKitSupport: true,
    numTestsKeptInMemory: 1,

    async setupNodeEvents(cypressOn, config) {
      // https://github.com/bahmutov/cypress-on-fix
      const on = require('cypress-on-fix')(cypressOn)
      // use "on" to register plugins, for example
      // https://github.com/bahmutov/cypress-split
      require('cypress-split')(on, config)

      // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        }),
      );

      on('after:run', (results) => {
        const jsonOutputPath = 'cypress/result/results.json';

        const totalTests = results.totalTests || 0;
        const totalPassed = results.totalPassed || 0;
        const totalFailed = results.totalFailed || 0;

        const successRate = totalTests > 0 ? (totalPassed / totalTests) * 100 : 0;
        const failureRate = totalTests > 0 ? (totalFailed / totalTests) * 100 : 0;

        const outputData = {
          totalTests,
          totalPassed,
          totalFailed,
          successRate: successRate.toFixed(2),
          failureRate: failureRate.toFixed(2),
        };

        try {
          fs.writeFileSync(jsonOutputPath, JSON.stringify(outputData, null, 2));
          console.log(`Test results written to ${jsonOutputPath}`);
        } catch (error) {
          console.error('Error writing test results:', error);
        }
      });

      // Make sure to return the config object as it might have been modified by the plugin.
      return config;
    },
  },
});