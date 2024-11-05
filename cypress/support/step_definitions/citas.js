import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import citasPage from "../pages/citasPage.js"
import { isMobile } from "../pages/genericPage.js"

const ci = new citasPage()

// --- Gift Registry ---

When('selectcitas en tienda', () => {
    if (isMobile()) {
        ci.menuClick()
        ci.menu('Servicios').click()
        ci.menu('Citas en tienda').click({ force: true })
    }
})

Then('select schedule an appointment', () => {
    cy.switchToIframe('#my_object')
        .find('.agenda-new').click({ force: true })
})

Then('select schedule by service', () => {
    cy.switchToIframe('#my_object')
        .find('.agenda-bookby-new').click({ force: true })
})

Then('select a service {string}', (service) => {
    cy.switchToIframe('#my_object')
        .find('.service-category-N').filter(`:contains(${service})`).click({ force: true })
})

Then('select a subservice {string}', (sub) => {
    cy.switchToIframe('#my_object')
        .contains(`${sub}`).click({ force: true })

    cy.switchToIframe('#my_object')
        .find('.continueButton').click({ force: true })
})

Then('select branch {string}', (suc) => {
    cy.switchToIframe('#my_object')
        .contains(suc).click({ force: true })

    cy.switchToIframe('#my_object')
        .find('.continueButton').click({ force: true })
})

Then('select available date and time', () => {
    cy.switchToIframe('#my_object')
        .find('.today').click({ force: true })

    cy.switchToIframe('#my_object')
        .find('.timer > label').first().then(($select) => {
            cy.log($select)
            $select.click()
        })
})

Then('select button continue in appointments', () => {
    cy.switchToIframe('#my_object')
        .find('.confirmSelectionButton').click({ force: true })
})

Then('select manage an existing appointment', () => {
    cy.switchToIframe('#my_object')
        .find('.agenda-editFirst').click({ force: true })
})