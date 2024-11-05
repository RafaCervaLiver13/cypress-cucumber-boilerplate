import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import topupPage from '../pages/topupPage'
import genericPage, { isMobile } from '../pages/genericPage'

const ar = new topupPage()
const generic = new genericPage()

Then('complete registration new number', () => {
    ar.typeCellPhoneNumber()
    ar.typeNameToCellPhone()
    ar.selectCompanyCellPhone()
})

Then('select button Add', () => {
    ar.addNumberButton().click({ force: true })
})

Then('select button Refresh', () => {
    ar.addNumberButton().click({ force: true })
})

Then('verify the message {string}', (message) => {
    ar.messageCellPhoneRegisterOk(message)
})

Then('remove previously added number', () => {
    ar.deleteNumber()
    generic.button('Aceptar').click({ force: true })
})

Then('Verify that the deleted number does not exist in the list', () => {
    ar.notExistNumber()
})

Then('the edited number is shown', () => {
    //cy.wait(250)
    ar.editedNumberName()
})

Then('select number TELCEL', () => {
    ar.numbersListCheckbox('Telcel')
    cy.wait(500)
})

Then('select recharge type {string}', (type) => {
    ar.selectType(type)
})

Then('select package {string}', (value) => {
    ar.selectMonto(value)
})

Then('check the Finish Recharge button', () => {
    if (isMobile()) {
        
    } else {
        cy.scrollTo('top')
    }
    generic.button("Finalizar recarga").wait(500).should('be.visible')
})

Then('select number {string}', (company) => {
    cy.intercept('POST', '/airtimeAmountSearch').as('waitAirtime')
    ar.numbersListCheckbox(company)
    cy.wait('@waitAirtime')
})

Then('select Edit', () => {
    ar.editNumber()
})

Then('edit phone information', () => {
    cy.wait(1500)
    ar.typeCellPhoneNumber()
    ar.typeNameToCellPhone()
    ar.selectCompanyCellPhone()
})

Then('verifica la etiqueta Agregar tarjeta', () => {
    cy.contains('Agregar tarjeta')
})

Then("fill in the card details", () => {
    ar.selectMonth()
    ar.selectYear()
    ar.typeCvv()
})

Then("verify the message The transaction was not authorized by the issuing bank.", () => {
    cy.contains("La transacción no fue autorizada por el banco emisor.").wait(500).should('be.visible')
})

Then('Verify that there is no check in the digital wallet with 0.00', () => {
    ar.digitalWallet().contains("$0.00").parents(".m-airTime-paymentCard.col-12").children().first().should('not.have.class', 'm-radioButton')
})

Then('select button {string} in Airtime', (name) => {
    if (isMobile()) {
        generic.button(name).click({ force: true })
    }
})

// --- Sodexo ---

Then('fill card details with bin: {string} in TA', (value) => {
    cy.get('#add-credit-card-modal').should('be.visible')
    ar.creditCardNumber().type(value + Math.floor(10000000 + Math.random() * 89999999), { force: true })
})

Then('accept button is disabled', () => {
    cy.get('.m-form-buttons .order-1 .a-btn').should('be.disabled')
})