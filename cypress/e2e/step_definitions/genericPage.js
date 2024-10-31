/// <reference types="cypress" />
let store = Cypress.env('STORE');

export const isMobile = () => {
    return (
        Cypress.config("viewportWidth") < 414
    )
}

export const isStore = (storeReceived) => {
    return (
        store == storeReceived
    )
}

class genericPage {

    openUrl() {
        cy.visit(url, {
            /* onBeforeLoad({ navigator }) {
                // CDMX city
                const latitude = 19.432608
                const longitude = -99.133209
                cy.stub(navigator.geolocation, 'getCurrentPosition')
                    .callsArgWith(0, { coords: { latitude, longitude } })
            } */
        })
    }

    // --- Login ---

    menuHam() {
        if (!isStore("liverpool")) {
            cy.wait(2000)
        }
        cy.get('.a-header__hamburger, .icon-menu_mobile').click()
        return this;
    }

    menuOption(value) {
        const menu = cy.contains(value, { matchCase: false })
        menu.click()
        return this;
    }

    typeEmail(value) {
        cy.wrap(value).as('userlog')
        const email = cy.get('#username');
        email.type(value);
        return this;
    }

    typePass(value) {
        cy.wrap(value).as('passlog')
        const pass = cy.get('#password');
        pass.type(value);
        return this;
    }

    loginBtnClick() {
        const button = cy.get('button:contains("Iniciar sesión")');
        button.click({ multiple: true, force: true });
    }

    // --- Visible pages ---

    pdpVisible() {
        return cy.get('.o-product__detail')
    }

    blpVisible() {
        return cy.get('.o-blp-mainContent');
    }

    clpVisible() {
        return cy.get('.clp_body');
    }

    plpVisible() {
        return cy.get('.m-product__listingPlp');
    }

    opcVisible() {
        return cy.get('#opc_container')
    }

    // --- Buttons, text, radio ---

    button(value) {
        return cy.contains(value, { matchCase: false })
    }

    text(value) {
        cy.contains(value).should('exist')
    }

    textNotExist(value) {
        cy.contains(value).should('not.exist')
    }

    radioButton() {
        return cy.get('[type="radio"]')
    }

    // --- PDP ---

    randomSize() {
        cy.get('body').then(($body) => {
            if ($body.find('#size-list-container').length > 0 && $body.find('#size-list-container').is(':visible')) {
                // size ok
                cy.get('#size-list-container .a-btn').not('.-disabled').should('be.visible').then(($size) => {
                    const select = Cypress._.sample($size.toArray())
                    select.click({ force: true })
                })
                cy.wait(500)
            } else if ($body.find('.size > .attributeAccordionHeader').length > 0) {
                cy.get('.size > .attributeAccordionHeader').click({ force: true })
                cy.get('#filters-storeLocator-storeInformation > .modal-dialog > .modal-content > .modal-body >').not('.-disabled').should('be.visible')
                    .its('length') // Get the count of children
                    .then(($items) => {
                        const randomIndex = Math.floor(Math.random() * $items);
                        cy.get(`#filters-storeLocator-storeInformation > .modal-dialog > .modal-content > .modal-body > :nth-child(${randomIndex + 1})`) // Select the random child
                            .click({ force: true }); // Click on it
                        cy.wait(1000)
                    })
                cy.wait(500)
            } else {
                // No size
                cy.log('No size')
            }
        })
    }

    pdpAddCart() {
        cy.get('#opc_pdp_addCartButton').click({ force: true })
        cy.wait(2000)
    }

    pdpPurchaseNow() {
        cy.get('body').then(($body) => {
            if ($body.find('#size-list-container').length > 0 && $body.find('#size-list-container').is(':visible')) {
                // size ok
                cy.get('#size-list-container .a-btn').not('.-disabled').should('be.visible').then(($size) => {
                    const select = Cypress._.sample($size.toArray())
                    select.click({ force: true })
                })
                cy.wait(500)
                cy.get('#opc_pdp_buyNowButton').click({ force: true })
            } else {
                // No size
                cy.get('#opc_pdp_buyNowButton').click({ force: true })
            }
        })
    }

    pdpPurchaseNowAddress() {
        cy.wait(500)
        cy.get('body').then(($body) => {
            if ($body.find('#size-list-container').length > 0) {
                // si tiene talla
                cy.get('#size-list-container .a-btn').not('.-disabled').then(($size) => {
                    const select = Cypress._.sample($size.toArray())
                    select.click({ force: true })
                })
                cy.wait(500)
                cy.get(':nth-child(3) > .GeoLocationCard #opc_pdp_buyNowButton').click({ force: true })
            } else {
                // no tiene talla
                cy.get(':nth-child(3) > .GeoLocationCard #opc_pdp_buyNowButton').click({ force: true })
            }
        })
    }

    pdpAddCartMsg() {
        return cy.contains('Agregaste un producto a tu bolsa')
    }

    // --- Gift registry event ---

    giftRegistryEvent(value) {
        return cy.get('.search-event-number-event .m-textField').type(value)
        //const event = cy.get('[name="eventCodeFindGiftTable"] .m-textField')
        //event.type(value);
    }

    giftRegistryEventOpc(value) {
        cy.get('.modal-content .search-event-number-event #mainSearchbar').type(value)
    }

    waitPage(url, elementToWait = '', elementWillExisting = true) {
        cy.intercept(url).as('waitPage')
        if (elementToWait == '') {
            cy.wait('@waitPage')
        } else {
            if (elementWillExisting) {
                cy.wait('@waitPage').then(() => {
                    cy.get(elementToWait).should('exist')
                })
            } else {
                cy.wait('@waitPage').then(() => {
                    cy.get(elementToWait).should('not.exist')
                })
            }
        }
    }

    deleteItems() {
        cy.intercept('POST', '/removeitemfromcart').as('removeItem');
        cy.get('body').then(($body) => {
            if ($body.find('.o-myBag').length > 0) {
                cy.get('.o-myBag').each(($element) => {
                    cy.log($element.text().includes("Comprar ahora"))
                    if ($element.text().includes("Comprar ahora")) {
                        cy.get('.menuMotion').first().click()
                        cy.get('.dropdown-menu').as('delete')
                        cy.get('@delete').contains('Eliminar').click({ force: true })
                        if (store != 'liverpool') {
                            cy.wait(2000)
                        }
                        cy.wait('@removeItem')
                    }
                })
            } else {
                if ($body.find('#selectStore-modal > .modal-dialog > .modal-content').length > 0) {
                    cy.get('#selectStore-modal > .modal-dialog > .modal-content > .modal-header > button.close > .icon-close').click()
                    cy.wait(1000)
                }
                cy.log('Sin artículos en la bolsa')
            }
        })
    }

    deleteItemsDesktop() {
        cy.intercept('POST', '/removeitemfromcart').as('removeItem');
        cy.get('body').then(($body) => {
            if ($body.find('.o-myBag').length > 0) {
                cy.get('.o-myBag').each(($element) => {
                    cy.log($element.text().includes("Comprar ahora"))
                    if ($element.text().includes("Comprar ahora")) {
                        cy.get('.m-latestinlineElement__block').first().as('delete')
                        cy.get('@delete').contains('Eliminar').click({ force: true })
                        if (store != 'liverpool') {
                            cy.wait(2000)
                        }
                        cy.wait('@removeItem')
                    }
                })
            } else {
                cy.log('Sin artículos en la bolsa')
            }
        })
    }

    deleteSavedDesktop() {
        cy.intercept('POST', '/removeitemfromcart').as('removeItem');
        cy.get('body').then(($body) => {
            if ($body.find('.o-myBag').length > 0) {
                cy.get('.o-myBag').each(($element) => {
                    cy.log($element.text().includes("Comprar ahora"))
                    if ($element.text().includes("Comprar ahora")) {
                        cy.get('.m-latestinlineElement').first().as('delete')
                        cy.get('@delete').contains('Eliminar').click({ force: true })
                        cy.wait(2000)
                        cy.wait('@removeItem')
                    }
                })
            } else {
                cy.log('Sin artículos en la bolsa')
            }
        })
    }

    miniBag() {
        return cy.get('.a-header__bag')
    }

    menuUser(option) {
        this.button(new RegExp(/^Hola \w+/))
        this.button(option).click({ force: true })
    }

    menuServicios() {
        this.button("Servicios").click({ force: true })
    }
    heart() {
        return cy.get('.wishlist-header > img')
    }

    heartDesktop() {
        return cy.get('.text-lg-center > a > img')
    }

    loadPage(element) {
        cy.intercept('GET', element).as('myRequest');
        cy.wait('@myRequest').then((interception) => {
            cy.log(interception.response.body);
        });
    }

    iframeInput(elemento, texto) {
        return cy.get('iframe')
            .then(($iframe) => {
                const $body = $iframe.contents().find('body')
                cy.wrap($body)
                    .find(elemento)
                    .type(texto)
            })
    }

    iframeButton(boton) {
        return cy.get('iframe')
            .then(($iframe) => {
                const $body = $iframe.contents().find('body')
                cy.wrap($body)
                    .find('button:contains("' + boton + '")').click({ multiple: true, force: true })                    //.find(elemento).click()
            })
    }

    iframeContains(boton) {
        return cy.get('iframe').first()
            .then(($iframe) => {
                const $body = $iframe.contents().find('body')
                cy.wrap($body)
                    .contains(boton)                //.find(elemento).click()
            })
    }

    iframeGet(boton) {
        return cy.get('iframe').first()
            .then(($iframe) => {
                const $body = $iframe.contents().find('body')
                cy.wrap($body)
                    .find(boton)               //.find(elemento).click()
            })
    }
    // ** Desktop **
    typeStore() {
        return cy.get('.o-storeLocator-aside #mainSearchbar')
    }

    searchClick() {
        return cy.get('.o-storeLocator-aside .icon-zoom').click()
    }

    menuThreePointsGeneric() {
        return cy.get('.icon-more_vert')
    }

    itemMenuSelectGeneric(value) {
        return cy.get('.dropdown-menu').contains(value)
    }

    // [ REV ]

    // --- Search ---
    search(value, skuType) {
        cy.wrap(value).as('skulog')
        cy.get('#mainSearchbar').type('{selectall}' + value + '{enter}', { force: true });

        // workaround for suburbia
        if (skuType == "coleccion") {
            cy.get('#img_0').click()
        }
    }

    haveLetters(texto) {
        let letras = "abcdefghyjklmnñopqrstuvwxyz";
        texto = texto.toLowerCase();
        for (let i = 0; i < texto.length; i++) {
            if (letras.indexOf(texto.charAt(i), 0) != -1) {
                return true;
            }
        }
        return false;
    }

    search2(value) {
        cy.wrap(value).as('skulog')
        cy.get('#mainSearchbar').wait(500).clear().type(value + '{enter}', { force: true });
    }

    searchBar() {
        return cy.get('#mainSearchbar')
    }

    menuHello(option) {
        cy.get('.m-popoverlist').contains(option).click({ force: true })
    }

    pdpModifyQty(qty) {
        switch (true) {
            case isStore("liverpool") || isStore("suburbia"):
                cy.get('#a-stickyBarPdp__inputQty').clear({ force: true }).type(qty, { force: true });
                break;

            case isStore("toysrus"):
                if (isMobile()) {
                    cy.get('.d-lg-none #a-stickyBarPdp__inputQty').clear().type(qty);
                } else {
                    cy.get('#a-stickyBarPdp__inputQty').clear().type(qty);
                }
                break;

            // Potterybarn
            default:
                if (isMobile()) {
                    cy.get('#qtyDropdownDesktop0 > .row > .col-3').click({ force: true, multiple: true });
                    cy.get('#modal-qty-config > :nth-child(6)').last().click({ force: true });
                    cy.get('[name="productQty"]').type(qty);
                    cy.get('.col-10 > .a-btn').click({ force: true });
                } else {
                    cy.get('#a-ProductQty__inputDesktop').clear({ force: true }).type(qty, { force: true });
                }
        }
    }

    myBagModifyQty() {
        return cy.get('.m-stickyBar__qtyInputs-OCP > #mainSearchbar')
    }

    // --- Orders ---

    searchOrder(order) {
        if (!isStore("suburbia")) {
            cy.get('#miscompras_SearchInput_Mobile').type(order + '{enter}')
            cy.wait(1000)
        } else {
            cy.intercept('POST', '/orderSearch').as('waitOrder');
            cy.get('#searchInput').type(order + '{enter}')
            cy.wait('@waitOrder').its('response.statusCode').should('eq', 200)
        }
    }

    searchOrderDesktop(order) {
        if (!isStore("suburbia")) {
            cy.get('#searchInput #mainSearchbar').type(order + '{enter}')
            cy.wait(1000)
        } else {
            cy.intercept('POST', '/orderSearch').as('wait');
            cy.get('#searchInput #mainSearchbar').type(order + '{enter}')
            cy.wait('@wait').its('response.statusCode').should('eq', 200)
        }
    }

    selectProduct() {
        cy.get('.carousel_new_home').eq(0).then(($items) => {
            const item = $items.length + 1
            cy.get('.carousel_new_home').eq(0).scrollTo('right', {ensureScrollable: false})
            cy.wait(1000)
            cy.get('#C1-CATST4003077 > .slick-slider > .slick-list > .slick-track>').find('img').eq(Cypress._.random(10) + 1).click({force: true})
            cy.wait(1000)
        })
    }

    // [ END ]

    // --- Warraty close modal ---
    warrantyModal() {
        cy.get('body').then(($body) => {
            if ($body.find('#waraanty_service-modal .modal-content').length > 0) {
                cy.get('#waraanty_service-modal .icon-close').click()
            } else {
                // nothing
            }
        })
    }

    getUser() {
        let env = Cypress.env('ENV')

        const usrProd = "users.prod.json"
        const usrQa = "users.qa.json"

        switch (env) {
            case 'prod':
                return usrProd
            case 'qa':
            case 'qa2':
            case 'qa3':
                return usrQa
        }
    }
    getSku() {
        let env = Cypress.env('ENV')

        const skuProd = "skus.prod.json"
        const skuQa = "skus.qa.json"

        switch (true) {
            case ["qa", "qa2", "qa3"].includes(env):
                return skuQa
            default:
                return skuProd
        }
    }


    getNav() {
        let env = Cypress.env('ENV')

        const navProd = "nav.prod.json"
        const navQa = "nav.qa.json"

        switch (true) {
            case ["qa", "qa2", "qa3"].includes(env):
                return navQa
            default:
                return navProd
        }
    }
}

export default genericPage