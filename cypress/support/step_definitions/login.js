import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import loginPage from "../pages/loginPage.js"
import genericPage, { isMobile, isStore } from "../pages/genericPage.js"
import homePage from "../pages/homePage.js"
import { utility } from "../../support/utility"

const login = new loginPage()
const generic = new genericPage()
const home = new homePage()
const usrJson = new utility().getUser();
const skuJson = new utility().getSku();
let store = Cypress.env('STORE');
let site = Cypress.env('SITE');
let user, sku

beforeEach(() => {
    cy.fixture(usrJson).then((select) => {
        user = select
    })

    cy.fixture(skuJson).then((select) => {
        sku = select
    })
})

// --- Login ---

Then('the user name is displayed', (table) => {
    if (isStore('liverpool')) {
        cy.get('.mobile-account-title > span').should('be.visible')
    } else {
        cy.get('.o-myAccount-aside').should('be.visible')
    }
})

Then('select button {string} to log in', (texto) => {
    if (isMobile()) {
        switch (texto) {
            case "Mi cuenta":
                generic.menuHam()
                home.menuSelect(texto).click({ force: true })
                break
            default:
                generic.button(texto).click({ force: true })
        }
    }
    else {
        switch (texto) {
            case "Mesa de Regalos":
                texto = "Mesa de regalos"
                generic.button(texto).click({ force: true })
                break
            default:
                generic.button(texto).click({ force: true })
        }
    }
})

Then('display button {string} no articles after login', (texto) => {
    if (isMobile()) {
        generic.button(texto).should('be.visible')
    }
    else {
        switch (texto) {
            case "Registra tu tarjeta":
                texto = "Solicita tu Tarjeta "
                generic.button(texto).should('be.visible')
                break
            default:
                generic.button(texto).should('be.visible')
        }
    }
})

When('log in with user {string} in iframe form', (type) => {
    cy.url().should('contain', 'https://' + site + '.' + store + '.com.mx/tienda/paginas/mis-citas')
    cy.wait(3000)
    const random = Cypress._.random(user[type].length - 1)
    const email = user[type][random].email
    const username = "#username"
    generic.iframeInput(username, email)
    const pass = user[type][random].pass
    const password = "#password"
    generic.iframeInput(password, pass)
    const boton = "Iniciar sesión"
    generic.iframeButton(boton)
})

When('select for gift table option {string}', (table) => {
    if (isMobile()) {
        generic.menuHam()
        home.menuSelect(table).click({ force: true })
    }
})

When('select button Comprar in pdp', () => {
    if (store != "liverpool") {
        login.buyButtonMs()
    } else {
        login.buyButton()
    }
})

When('select menu hamburger in insurance center', () => {
    cy.get('#\\#mobileMenuIcon').click({ force: true })
})