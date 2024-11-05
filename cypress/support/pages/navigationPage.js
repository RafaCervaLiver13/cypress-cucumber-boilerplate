/// <reference types="cypress" />
import { isMobile } from '../pages/genericPage'
let store = Cypress.env('STORE');
const storeIframe = { liverpool: "12889", suburbia: "23741", potterybarn: "23872", gap: "23871" }

class navigationPage {

    validarImagenesGarantia() {
        return cy.get('img[alt="Garantias | Liverpool"]')
    }

    validarImagenesGarantiaSb() {
        return cy.get(':nth-child(3) > .row > .col-12 > .findSucursal')
    }

    validarLabelLoSentimos() {
        return cy.get('.o-content__noResultsNullSearch > .col-lg-12')
    }

    touchLinkAyuda() {
        return cy.get('.a-modal-help')
    }

    validarQueMuestranLosConsejos() {
        return cy.get('.modal-content')
    }

    validarQueMuestranLosConsejosdesktop() {
        return cy.get('.o-content__noResultsNullSearch')
    }

    validarFacturacion() {
        return cy.get('.secBotones')
    }

    validarAyuda() {
        return cy.get('.insurgentes > .ayuda')
    }

    validarDireccionesEntrega() {
        return cy.get('.myAccount-address__header')
    }

    validarFormasDePago() {
        return cy.get('#opc_myCards')
    }
    validarGarantiaLiver() {
        return cy.get(':nth-child(1) > .o-blpPictureBrand__content > .col-lg-10')
    }

    validarSostenibilidad() {
        return cy.get('.text_banner1 > :nth-child(2)')
    }

    validarSostenibilidadSb() {
        return cy.contains('Sostenibilidad')
    }

    verifyMatchStore(palabra) {
        cy.get('.list-group >').contains(palabra)
    }

    selectState(estado) {
        cy.get("#select-state").select(estado)
    }

    verifyImageContebio() {
        return cy.get('#contebio-content').scrollIntoView().should('be.visible')
    }

    verifyImageContebioDesktop() {
        cy.scrollTo('center')
        return cy.get(':nth-child(5) > section').should('be.visible')
    }

    selectImageContebio() {
        return cy.get('#content_parent').scrollIntoView().find('.cntb-img').first().click({ force: true })
    }

    selectImageContebioDesktop() {
        return cy.get('.cntb-160-0-2-valor-contenido-contebio-liverpool-imagen-destacado-picture > .cntb-img').first().click({ force: true })
    }

    verifyCarruselContebio() {
        return cy.get('.slick-track')
    }

    selectCarruselContebio() {
        return cy.get('#slick-slide01 > :nth-child(1) > .cntb-prev > .fn-c-product > .fn-c-product-img').click({ force: true })
    }

    contebio() {
        return cy.get('body').scrollIntoView().find('.text-dark > .cntb-group').first().click({ force: true })
    }

    voiceClient() {
        cy.get('.icon_vozcliente').wait(3000).click({ force: true })
        cy.wait(3000)
    }

    contactanosButton() {
        cy.get(":nth-child(1) >  .o-blpPictureBrandTwo__content >").find('.m-blpTopBanner__contentImage > .a-blpTopBanner__image').click()
    }

    citaButton() {
        cy.get('.btn-form-2 > a > p').click()
    }

    seguroAuto() {
        cy.get(':nth-child(2) > a > .img-wrapper-rectangle > .content-wrapper').click({ froce: true })
    }

    seguroCel() {
        cy.get(':nth-child(3) > a > .img-wrapper-rectangle > .content-wrapper').click({ froce: true })
    }

    carouselMore() {
        cy.get('.item > a > .card').first().click({ force: true })
    }

    carouselCategorias() {
        return cy.get('.o-blpMainContent')
    }

    exploraCategorias() {
        return cy.get('.m-blpTopBanner__link > .m-blpTopBanner__contentImage')
    }

    viewCategoria() {
        return cy.get('.o-container__secondary')
    }

    tendencia() {
        return cy.get('#defaultCarouselPlaceholder')
    }

    isMobileFrameNav() {
        if (isMobile()) {
            return cy.switchToIframe('#kampyleForm' + storeIframe[store])
        } else {
            return cy.switchToIframe('#kampyleFormAnimation' + storeIframe[store])
        }
    }

    searchHistory(){
        return cy.get('.sayt-history')
    }

    searchTrends() {
        return cy.get('.m-saytContent')
    }

    searchedWord(word) {
        return cy.get('.m-product__listingPlp').should('contain', word)
    }

    searchedWord2(word) {
        const normalizeText = (text) => {
            return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        };
    
        return cy.get('.m-product__listingPlp').then($el => {
            const text = normalizeText($el.text());
            const searchWord = normalizeText(word);
            expect(text).to.contain(searchWord);
        });
    }

    crossSearchIcon() {
        return cy.get('#clear-sayt');
    }

    lensSearchIcon() {
        return cy.get('.input-group-text > .icon-zoom')
    }

    inputSearch(){
        return cy.get('.input-group > #mainSearchbar')
    }

    modalSearch(){
        return cy.get('.m-typeahead > .container > ')
    }
}

export default navigationPage;