/// <reference types="cypress" />

class citasPage {

    menuClick() {
        const menu = cy.get('.a-header__hamburger')
        menu.click({ force: true })
        return this;
    }

    menu(value) {
        return cy.contains(value, { matchCase: false })
    }
}

export default citasPage;