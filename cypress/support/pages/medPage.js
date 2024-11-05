/// <reference types="cypress" />

class medPage {

    cardsTransferText() {
        return cy.contains('Transferir saldo a mi monedero digital')
    }

    cardsOption() {
        return cy.get('.col-11 > :nth-child(1)')
    }

    transferContainer() {
        return cy.get('.m-infoContainer__arrowContainer')
    }

    inputMonedero() {
        return cy.get('#input-monedero')
    }

    inputSerialNumber() {
        return cy.get('#input-serialNumber')
    }

    inputCVV() {
        return cy.get('.mdc-text-field__input-cvv')
    }

    labelDigitalWallet() {
        return cy.contains('Usar monedero digital')
    }

    checkboxDigitalWallet() {
        return cy.get('.m-cardInfoContainer > .w-auto > .m-checkbox > .a-checkbox__input')
    }

    alertDigitalWallet() {
        //return cy.contains('La cantidad no cubierta por el monedero digital se cobrará de la tarjeta seleccionada')
        return cy.get('.-success > .undefinedm-mdc__snackbarSurface > .m-mdc__snackbarLabel')
    }

}

export default medPage;