/// <reference types="cypress" />

class loginPage {

    buttonLoginCredit() {
        return cy.contains('Ingresar a mi cuenta')
    }

    logoLiver() {
        return cy.get('#logo')
    }

    buyButton() {
        return cy.get('.t-myBag__toBuy > .a-btn').click()
    }

    buyButtonMs() {
        return cy.get('.opc_sticky_button > .a-btn').click()
    }

}

export default loginPage;