import { When, Then } from "@badeball/cypress-cucumber-preprocessor"
import medPage from "../pages/medPage.js"

const med = new medPage()


Then('verify text transfer balance to my digital wallet', () => {
    med.transferContainer().click()
    med.cardsTransferText().should('be.visible')
})

When('select transfer balance to my digital wallet', () => {
    med.transferContainer().click()
})

Then('verifies wallet labels, serial number, cvv', () => {
    med.inputMonedero().should('be.visible')
    med.inputSerialNumber().should('be.visible')
    med.inputCVV().should('be.visible')
})

Then('verify label use digital wallet in payment method', () => {
    med.labelDigitalWallet().should('be.visible')
})

When('select checkbox use digital wallet', () => {
    med.checkboxDigitalWallet().check()
})

Then('verify label the amount not covered by the digital wallet will be charged from the selected card', () => {
    med.alertDigitalWallet().should('be.visible')
})

