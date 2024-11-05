const report = require("multiple-cucumber-html-reporter");
report.generate({
    jsonDir: "cypress/reports",  // ** Path of .json file **//
    reportPath: "cypress/reports",
    reportName: "Automation WAP Reporter",
    metadata: {
        browser: {
            name: "Chrome"
        },
        device: "Local test machine",
        platform: {
            name: "Mac OS",
            version: "Monterey",
        },
    },
    displayDuration: true,
    displayReportTime: true
});