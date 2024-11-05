/// <reference types="cypress" />

import { isMobile, isStore } from "./genericPage";

let store = Cypress.env('STORE');
class homePage {

    pageUrl(value) {
        const page = cy.location('pathname').should('contain', `${value}`)
        return page
    }

    // --- Banners ---

    firstBanner() {
        if (isStore("liverpool")) {
            return cy.get('img[class="image_banners_container"]')
        } else {
            return cy.get('#bannerNo-1')
        }
    }

    secondBanner() {
        switch (true) {
            case isStore("liverpool"):
                return cy.get('[name*="Secondary"]')
            case isStore("suburbia"):
                return cy.get('#bannerNo-2 > .container > :nth-child(1)')
            default:
                return cy.get('#bannerNo-2 > .o-container_banner .a-container__imageBanner')
        }
    }

    plpView() {
        return cy.get('.m-product__listingPlp')
    }

    differentCat() {
        return cy.get('.m-product__listingPlp, .clp_body, .o-blpMainContent')
    }

    // --- Menu ---

    menuSelect(value) {
        return cy.contains(value, { matchCase: false })
    }

    menuCategory() {
        return cy.get('.nav-mobile-category .m-megamenu__section')
    }

    menuSub(value) {
        if (store == "liverpool" && value == "CUIDADO DE LA PIEL") {
            return cy.contains(value)
        } else {
            return cy.get('.m-leftMenu-wrapper').contains(value)
        }
    }

    // --- Carousels ---

    carouselViewMore() {
        return cy.get('.carousel_new_home .carousel_titles')
    }

    carouselTitle() {
        return cy.get('.carousel_titles > .main_title')
    }

    carouselTitleClick() {
        const title = cy.get('#carouselNo-1 > .carousel-heading')
        title.click()
    }

    carouselImages() {
        return cy.get('.carousel_new_home .figure-container > .lazyloaded')
    }

    carouselImg() {
        return cy.get('[data-index="1"] .figure-container')
    }

    // --- Store locator ---

    randomOption(option) {
        return cy.get('.col-12 > .m-list-scrollable > .list-group').contains(option)
    }

    randomCityStore() {
        cy.get('.col-12 > .m-list-scrollable > .list-group >').then(($items) => {
            const item = $items.toArray()
            Cypress._.sample(item.slice(0, 10)).click()
        })
    }

    // --- Header ---

    logo() {
        return cy.get('.a-header__logo')
    }

    miniBag() {
        return cy.get('.a-header__bag')
    }

    carouselTitleRecentlySeen() {
        return cy.get('.a-recentItems__title')
    }

    // [ REV. ]

    // [ FOOTER ]

    footer() {
        return cy.get('footer')
    }

    orderCard() {
        if (isMobile()) {
            return cy.get('.o-order__product__content')
        } else {
            return cy.get('.o-order__container__products')
        }
    }

    conditions() {
        return cy.get('#condiciones-prod > p > a')
    }

    modalConditions() {
        return cy.get('.modal-beneficios-content')
    }

    // --- New home --

    newBtn() {
        return cy.get('.button_left_rd')
    }

    forYou() {
        return cy.get('.button_right_rd')
    }

    newHomeContainer() {
        return cy.get('.new-home-template-container > .container')
    }
}

export default homePage;