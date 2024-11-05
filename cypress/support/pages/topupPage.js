/// <reference types="cypress" />

import { isStore } from "./genericPage";

let newNumberName

class topupPage {
    typeCellPhoneNumber() {
        var number = '0123456789';
        var numberLength = number.length;
        var result = '';
        for (var i = 0; i < 10; i++) {
            result += number.charAt(Math.floor(Math.random() * numberLength));
        }
        cy.get('#cell').clear()
        cy.get('#cell').type(result)
    }

    typeNameToCellPhone() {
        const alphabet = "abcdefghijklmnopqrstuvwxyz"
        const randomName = alphabet.charAt(Math.floor(Math.random() * alphabet.length))
        cy.wait(250)
        newNumberName = `Random ${randomName}`
        cy.get('#name').clear().type(newNumberName)
    }

    selectCompanyCellPhone() {
        let att = ''
        if (isStore('liverpool')) {
            att = 'AT&T'
        } else {
            att = "ATT"
        }
        const company = ['TELCEL', 'MOVISTAR', att, 'UNEFON']
        cy.get('#company').select(company[Math.floor(Math.random() * company.length)])
    }

    messageCellPhoneRegisterOk(message) {
        cy.contains(message).should('be.visible')
    }

    addNumberButton() {
        cy.wait(1000)
        return cy.get('.order-1 > .a-btn')
    }

    deleteNumber() {
        cy.contains(newNumberName).parents("#o-box-airTime__cellphones >").within(($name) => {
            cy.get('.menuMotion > #address1 > .icon-more_vert').click()
            cy.contains('Eliminar').click()
        })
    }

    numbersListCheckbox(company) {
        cy.contains(company).first().parents(".row.align-items-start.justify-content-between").within(($name) => {
            cy.get('.a-checkbox__input').check()
        })
    }

    editNumber() {
        cy.contains('Random').first().parents(".row.align-items-start.justify-content-between").within(($name) => {
            cy.get('.menuMotion > #address1 > .icon-more_vert').click()
            cy.contains('Editar').click()
        })
    }

    notExistNumber() {
        cy.get(newNumberName).should('not.exist')
    }

    editedNumberName() {
        cy.get('#o-box-airTime__cellphones').should('contain', newNumberName)
        //cy.get(newNumberName).should('exist')
    }

    selectType(value) {
        cy.get('#balanceTypeValue').select(value)
    }

    selectMonto(value) {
        cy.get('#labelIDrecharge').select(value)
    }

    verifyButtonFinalizar() {
        cy.get('.m-mdc__snackbarLabel').should('be.visible')
    }

    selectMonth() {
        cy.get('#idLabel__Month').select("02")
    }

    selectYear() {
        cy.get('#idLabel__Year').select(2)
    }

    typeCvv() {
        cy.get('#idCvv').type("123")
    }

    digitalWallet() {
        return cy.get('.m-airTime-paymet_cardInfo')
    }

    // -- Sodexo --

    creditCardNumber() {
        return cy.get('#creditCardNumber')
    }
}

export default topupPage;