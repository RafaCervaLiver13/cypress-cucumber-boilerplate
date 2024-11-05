import { Then } from "@badeball/cypress-cucumber-preprocessor";
import bydPage from "../pages/bydPage.js"
import genericPage, { isMobile } from "../pages/genericPage.js"

const byd = new bydPage()
const generic = new genericPage()

Then('BYD home is displayed', () => {
    byd.homeByd()
})

Then('select the button {string} in menu byd', (opcion) => {
    if (isMobile()) {
        byd.menuByd().click()
    }
    byd.menuOption(opcion).click()

})

Then('select {string} in menu byd', (opcion) => {
    byd.menuOption(opcion).click()

})

Then('select {string} in byd', (opcion) => {
    byd.selectOption(opcion).click()
})

Then('redirects to model {string}', (modelo) => {
    byd.homeModelo(modelo)
})

Then('redirects to option {string}', (opcion) => {
    byd.homeOpcion(opcion)
})

Then('select {string} in footer byd', (opcion) => {
    byd.footerByd().contains(opcion).scrollIntoView().click()
})

Then('shows the main carousel', () => {
    byd.carouselHome().should('exist')
})

Then('shows the promotions carousel', () => {
    byd.carouselPromos().should('exist').and('be.visible')
})

Then('The fields are filled in. Register to receive more information.', () => {
    byd.completeFormNewsletter()
})

Then('displays the basic information of the selected model', () => {
    byd.verifyElementCar()
})

Then('shows the outer section', () => {
    byd.verifySectionExterior()
})

Then('displays elements of the inner section', () => {
    byd.verifySectionInterior()
})

Then('displays elements of the Technology and Efficiency section', () => {
    byd.veryfyTechnology()
})

Then('select some model', () => {
    byd.selectRandomModel()
})

Then('select the button {string} of the selected model', (opcion) => {
    byd.buttonQuadrant().contains(opcion).click()
})

Then('display the modal', () => {
    byd.modalQuadrant().should('be.visible')
})

Then('select button {string} in byd model', (opcion) => {
    byd.bydModelo().contains(opcion).click()
})

Then('select a showroom', () => {
    byd.selectShowRoom().select(1)
})

Then('select a model', () => {
    cy.wait(3000)
    byd.selectModel()
})

Then('select date and time', () => {
    cy.wait(500)
    byd.selectDate()
    byd.selectHour().select(2)
})

Then('validate the information in the section {string}', () => {
    byd.resume().find(':nth-child(3) > .ResumeDrive_paragDrivingSecond__cJCPr').should('not.contain', '...')
    byd.resume().find(':nth-child(4) > .ResumeDrive_paragDrivingSecond__cJCPr').should('not.contain', '...')
    byd.resume().find(':nth-child(5) > .ResumeDrive_paragDrivingSecond__cJCPr').should('not.contain', '...')
    byd.resume().find(':nth-child(6) > .ResumeDrive_paragDrivingSecond__cJCPr').should('not.contain', '...')
})

Then('shows the legend of required fields in Contact Data', () => {
    byd.contact().find(':nth-child(1) > > .Input_ctnHelperTextApart__6YLt0').should('be.visible')
    byd.contact().find(':nth-child(2) > > .Input_ctnHelperTextApart__6YLt0').should('be.visible')
    byd.contact().find(':nth-child(3) > > .Input_ctnHelperTextApart__6YLt0').should('be.visible')
    byd.contact().find(':nth-child(4) > > .Input_ctnHelperTextApart__6YLt0').should('be.visible')
    byd.contact().find(':nth-child(5) > > .Input_ctnHelperTextApart__6YLt0').should('be.visible')
})