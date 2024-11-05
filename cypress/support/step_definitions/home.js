import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import homePage from "../pages/homePage.js"
import genericPage, { isMobile } from "../pages/genericPage.js"
import { utility } from "../../support/utility"

const home = new homePage()
const generic = new genericPage()
const skuJson = new utility().getSku();
let store = Cypress.env('STORE');
let sku

beforeEach(() => {
    cy.fixture(skuJson).then((select) => {
        sku = select
    })
})

// --- Banners ---

Then('display main banner', () => {
    home.firstBanner().should('be.visible')
})

Then('display secondary banner', () => {
    home.secondBanner().first().should('exist')
})

Then('redirects to a plp or clp', () => {
    home.secondBanner().first().click({ force: true })
    //home.plpView().should('be.visible')
})

When('select option {string}', (table) => {
    if (table == "Mi crédito") {
        cy.intercept('https://pro-api.' + store + '.com.mx/api/v2/*').as('waitCredit')
    }
    if (isMobile()) {
        generic.menuHam()
        if (table == "Sorteos y Concursos" || table == "Citas en tienda") {
            generic.menuServicios()
        }
        else if (table == "Mis Compras" || table == "Mi cuenta") {
            cy.contains(new RegExp(/^Hola \w+/)).should('exist')
            cy.wait(500)
        }
        home.menuSelect(table).click({ force: true })
        cy.wait(1500)
    }
    else {
        switch (table) {
            case "Localiza tu tienda":
                table = 'Tiendas'
                home.menuSelect(table).click({ force: true })
                break
            case "Mi cuenta":
                generic.menuUser(table)
                break
            case "Sorteos y Concursos":
                generic.menuServicios()
                home.menuSelect(table).click({ force: true })
                break
            case "Facturación electrónica":
                table = "Facturación"
                home.menuSelect(table).click({ force: true })
                break
            case "Mis Compras":
                cy.contains(new RegExp(/^Hola \w+/))
                cy.wait(500)
                home.menuSelect(table).click({ force: true })
                break
            default:
                home.menuSelect(table).click({ force: true })
                break
        }
    }
})

When('close map modal', () => {
    if (isMobile()) {
        cy.get('#filters-storeLocator-categories').find('.icon-close').click({ force: true })
    }
})

When('select subcategory option {string}', (table) => {
    home.menuSub(table).click({ force: true })
})

// --- Menu ---

Then('view categories', () => {
    if (isMobile()) {
        home.menuCategory().should('exist')
    }
})


Then('view the page {string}', (page) => {
    cy.contains(page, { matchCase: false })
})


// --- Carousels ---

When('select the button see more of the first carousel', () => {
    //cy.get('#carouselNo-1').contains('Ver más').should('be.visible').click()
    home.carouselViewMore().contains('Ver más').click()
})

Then('redirecciona a un plp', () => {
    home.plpView().should('be.visible')
})

Then('redirects to a plp, clp or blp', () => {
    home.differentCat().should('be.visible')
})

Then('the title of the first carousel is displayed', () => {
    home.carouselTitle().should('be.visible')
})

Then('click on the title of the first carousel', () => {
    home.carouselTitleClick()
})

Then('View the images of the first carousel', () => {
    home.carouselImages().should('be.visible')
})

When('select the image from the first carousel', () => {
    home.carouselImg().first().click()
})

// --- Store locator ---

Then('select button use my location', () => {
    cy.wait(1000)
    cy.get('.mapBtn').click().should('be.visible')
})

Then('view the map', () => {
    cy.get('.map').should('be.visible')
})

Then('search by city {string}', (city) => {
    if (isMobile()) {
        cy.wait(1000)
        cy.get('.icon-filtro').click()
        cy.get('.col-9').type(city)
        cy.get('.col-9 .icon-zoom').click()
        cy.wait(1000)
        cy.get('.col-12 .list-group > :nth-child(1)').click()
        cy.get('.o-box').should('be.visible')
    }
    else {
        generic.typeStore().type(city)
        generic.searchClick()
        cy.wait(1000)
        cy.get('[role="button"]').click()
        cy.get('.modal-body').should('be.visible')
    }
})

Then('search for store', () => {
    if (isMobile()) {
         cy.get('.icon-filtro').click()
        cy.get('.col-3').contains('Filtrar').click()
        home.randomOption('Liverpool').click()
        home.randomCityStore()
        cy.wait(1000)
        cy.get('.o-box').should('be.visible')
    }
})

// --- Header ---

Then('display logo and search box', () => {
    home.logo().should('be.visible')
    generic.searchBar().should('be.visible')
})

Then('display main page', () => {
    cy.get('main').should('be.visible')
})

Then('display mini bag at 0', () => {
    home.miniBag().should('contain', '0')
})

Then('Verify that the recently viewed carousel is displayed', () => {
    home.carouselTitleRecentlySeen().should('be.visible')
})

// --- Carrusel Vistos Recientemente ---

Then('search for 7 articles', () => {
    const skus = ["general", "regalo", "compraMinima", "talla", "mkp", "tallaBottomM", "tallaTopM"];

    skus.forEach(property => {
        const skus = sku[store]["sl"][0][property];
        const randomSku = skus[Cypress._.random(skus.length - 1)]["sku"];
        generic.search(randomSku);
        cy.wait(2500);
    });
})

Then('select estado home {string}', () => {
    if (isMobile()) {
    }
    cy.get('#select-state').select(value)
    cy.contains('Estado').click()
    cy.get('.bt_select_state').click()
    cy.contains(value).click()
})

Then('selecttienda home', () => {
    cy.get('.list-group > ').last().scrollIntoView().click({ force: true })
    cy.wait(500)
    cy.get('.list-group > ').last().should(('be.visible'))
})

// [REV.]

// [ Footer ]

When('scroll to the footer', () => {
    cy.wait(1000)
    home.footer().scrollIntoView().should('be.visible')
})

When('select {string} in footer', (opcion) => {
    home.footer().contains(opcion).click({ force: true })
})

Then('view purchase made from footer', () => {
    home.orderCard().should('be.visible')
})

Then('selecciona condiciones especiales', () => {
    home.conditions().click()
})

Then('visualiza modal de condiciones especiales', () => {
    home.modalConditions().should('be.visible')
})

Then('cierra modal correctamente', () => {
    home.modalConditions().find('.close-button').click()
    home.modalConditions().should('not.be.visible')
})

// --- New home ---

Then('selecciona Para ti', () => {
    home.forYou().click()
})

Then('select Whats new', () => {
    home.newBtn().click()
})

Then('the new home container is shown', () => {
    home.newHomeContainer().should('be.visible')
})

Then('scroll to the bottom of the home', () => {
    cy.scrollTo('bottom')
})
