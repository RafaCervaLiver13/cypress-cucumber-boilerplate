import { When } from "@badeball/cypress-cucumber-preprocessor";
import { isMobile } from "../pages/genericPage.js"

let xrayToken

let store = String(Cypress.env('STORE')).toUpperCase()
let site = String(Cypress.env('SITE')).toUpperCase()
let env = String(Cypress.env('ENV')).toUpperCase()
let tags = Cypress.env('TAGS') || ''

// Extract the words after @ in the first set of parentheses
let matchedTags = tags.match(/\((.*?)\)/)
let extractedTags = matchedTags ? matchedTags[1].match(/@(\w+)/g).map(tag => tag.substring(1)) : []

before(() => {
    const filename = 'cypress/fixtures/xray/info.json'
    //onst featureName = Cypress.spec.name
    cy.log(store, env, tags)
    cy.readFile("cypress/fixtures/xray/info.json").then((list) => {
        let summary, testPlanKey;

        switch (store) {
            case 'LIVERPOOL':
                summary = isMobile() ? `📱 Mobile ${store} - ${site} - ${extractedTags}` : `🖥 Desktop ${store} - ${site} - ${extractedTags}`
                testPlanKey = isMobile() ? "IAT-4276" : "IAT-4275"
                break
            case 'SUBURBIA':
                summary = isMobile() ? `📱 Mobile ${store} - ${site} - ${extractedTags}` : `🖥 Desktop ${store} - ${site} - ${extractedTags}`
                testPlanKey = isMobile() ? "IAT-4278" : "IAT-4277"
                break
            default:
                summary = isMobile() ? `📱 Mobile ${store} - ${site} - ${extractedTags}` : `🖥 Desktop ${store} - ${site} - ${extractedTags}`
                testPlanKey = isMobile() ? "IAT-4280" : "IAT-4279"
                break
        }

        list.fields.summary = summary;
        list.xrayFields.testPlanKey = testPlanKey;
        list.fields.labels = [store]
        list.xrayFields.environments = [site]
        //list.xrayFields.tags = extractedTags  // Store the extracted tags

        cy.writeFile(filename, JSON.stringify(list))
    })
})

/*
after(() => {
    const xrayInstance = new xray();

    xrayInstance.getToken();
    cy.wait(1000); // Wait for token to be generated
    sendReport()
    cy.wait(25000)
})
*/

function sendReport() {
    const curlCommand = `curl --location --request POST "https://xray.cloud.getxray.app/api/v2/import/execution/cucumber/multipart" ` +
        `--header "Content-Type: multipart/form-data" ` +
        `--header "Authorization: Bearer ${xrayToken}" ` +
        `--form "results=@cypress/reports/cucumber-report.json" ` +
        `--form "info=@cypress/fixtures/xray/info.json"`;

    // Execute the curl command using cy.exec
    cy.exec(curlCommand).then((result) => {
        // Log the result of the command
        cy.log(result.stdout);
    });
}

class xray {
    getToken() {
        cy.request({
            method: 'POST',
            url: 'https://xray.cloud.getxray.app/api/v2/authenticate',
            body: {
                "client_id": "09CE258845D4458BA5CE923110E9E844",
                "client_secret": "facb001c39f6b1150c77737791233b730a0a9d7dda37f41872859c8745894fa6"
            }
        }).then((res) => {
            xrayToken = res.body
            cy.log(xrayToken)
        })
    }
}

When('genera xray token', () => {
    cy.request({
        method: 'POST',
        url: 'https://xray.cloud.getxray.app/api/v2/authenticate',
        body: {
            "client_id": "09CE258845D4458BA5CE923110E9E844",
            "client_secret": "facb001c39f6b1150c77737791233b730a0a9d7dda37f41872859c8745894fa6"
        }
    }).then((res) => {
        xrayToken = res.body
        cy.log(xrayToken)
    })
})

When('envía xray reporte', () => {
    let cURL
    if (Cypress.platform === "win32") {
        cURL = "curl --location --request POST \"https://xray.cloud.getxray.app/api/v2/import/execution/cucumber/multipart\" ^ " +
            "--header \"Content-Type: multipart/form-data\" ^ " +
            "--header \"Authorization: Bearer " + xrayToken + "\" ^ " +
            "--form \"results=@\"cypress/reports/cucumber-report.json\"\" ^ " +
            "--form \"info=@\"cypress/fixtures/xray/info.json\"\""
    } else {
        cURL = `curl --location --request POST 'https://xray.cloud.getxray.app/api/v2/import/execution/cucumber/multipart' \
        --header 'Content-Type: multipart/form-data' \
        --header 'Authorization: Bearer ${xrayToken}' \
        --form 'results=@"cypress/reports/cucumber-report.json"' \
        --form 'info=@"cypress/fixtures/xray/info.json"'`
    }
    cy.exec(cURL).then((res) => cy.log(JSON.stringify(res.stdout)))
})

/*
And('xray cucumber', () => {
    cy.request({
        method: 'POST',
        url: 'https://xray.cloud.getxray.app/api/v2/import/execution/cucumber/multipart',
        headers: {
            'Authorization': 'Bearer ' + xrayToken,
            'content-type': 'multipart/form-data'
        },
        body: {

        }
    }).then((res) => {
        cy.log(JSON.stringify(res))
    })
})*/