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
      '*pinterest.com'
    ],
    //userAgent: 'Mozilla/5.0 (Web0S; Linux/SmartTV) AppleWebKit/537.36 (KHTML, like Gecko) Chr0me/38.0.2125.122 Safari/537.36 LG Browser/8.00.00(LGE; 55UJ750V-ZB; 06.10.30; 1; DTV_W17H); webOS.TV-2017; LG NetCast.TV-2013 Compatible (LGE, 55UJ750V-ZB, wired)',
    //userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393',
    //userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15',
    retries: {
      "runMode": 1,
      "openMode": 0
    },
    //desktop
    viewportWidth: 1366,
    viewportHeight: 768,
    video: false,
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