/// <reference types="cypress" />

import genericPage, { isMobile, isStore } from "../pages/genericPage.js"
const generic = new genericPage()

let store = Cypress.env('STORE');
let attempts = 0
let totalPriceCS = 0
let viewMoreCheck = false
const max_attempts = 10

let categoryName

class browsePage {

    // --- PLP --- 

    plpProductCount() {
        cy.get('.m-product__card').then(($products) => {
            const count = Cypress.$($products).length;
            cy.log(count)
            if (isMobile()) {
                cy.get('.a-btn__filters').click()
                cy.get('.modal-title').then(($textcount) => {
                    const txt = $textcount.text()
                    cy.log(txt.split(' ')[0])
                    expect(Number(txt.split(' ')[0])).to.gte(count)
                })
            } else {
                cy.get('.a-plp-results-title').then(($textcount) => {
                    const txt = $textcount.text()
                    cy.log(txt.split(' ')[0])
                    expect(Number(txt.split(' ')[0])).to.gte(count)
                })
            }
        })
    }

    carouselBTO() {
        return cy.get('#carruselBTO')
    }

    plpFilterClick() {
        const filter = cy.get('.a-btn__filters')
        filter.click()
    }

    plpFilterView() {
        return cy.contains('Modo de vista')
    }

    plpViewListDesktop() {
        return cy.get('.icon-vistalista').last()
    }

    plpProductName() {
        return cy.get('.card-title')
    }

    plpProductPriceStrike() {
        return cy.get('.a-card-price')
    }

    plpProductPrice() {
        return cy.get('.a-card-discount')
    }

    plpProductColour() {
        return cy.get('.a-plp-color')
    }

    plpProductRatings() {
        return cy.get('.m-ratings')
    }

    plpFilterType(value) {
        cy.wait(500)
        const filter = cy.contains(value, { matchCase: false });
        filter.click({ force: true });
    }

    plpByNumber() {
        cy.get('.show-accord > .card-body >').then(($elements) => {
            const ele = Cypress._.sample($elements.toArray())
            const text = ele.innerText
            const number = parseInt(text.slice(
                text.indexOf('(') + 1,
                text.lastIndexOf(')'),))

            if (attempts < max_attempts) {
                cy.get('body').then(($body) => {
                    if ($body.find('.a-link__viewMore').length > 0 && !viewMoreCheck) {
                        cy.wait(500)
                        cy.get('.a-link__viewMore').click({ force: true })
                        viewMoreCheck = true
                    }
                })
                if (number == 1 || text == 'Ver más') {
                    this.plpByNumber()
                    attempts++
                } else {
                    cy.contains(text).parent().children('.m-checkbox').click()
                }

            } else {
                throw new Error('No se encontro filtro menor a 56 resultados.');
            }
        })
    }

    plpFilterTypeDesktop(filter) {
        cy.wait(1000)
        cy.log(filter)
        if (filter != "Color") {
            cy.get(`[title="${filter}"]`).parents('.m-plp__filterSection')
                .find('.m-checkbox__button').then(($elements) => {
                    const ele = Cypress._.sample($elements.toArray())
                    const text = ele.innerText
                    const number = parseInt(text.slice(
                        text.indexOf('(') + 1,
                        text.lastIndexOf(')'),))
                    if (attempts < max_attempts) {
                        if (number == 1 || text == 'Ver más') {
                            this.plpFilterTypeDesktop(filter)
                            attempts++
                        } else {
                            cy.get('body').then(($body) => {
                                if ($body.find(`[title="${filter}"]`).parents('.m-plp__filterSection').find('.a-link__viewMore').length > 0 && !viewMoreCheck) {
                                    cy.get(`[title="${filter}"]`).parents('.m-plp__filterSection').find('.a-link__viewMore').click({ force: true })
                                    viewMoreCheck = true
                                }
                            })
                            cy.wrap(ele).parent().find('[type = "checkbox"]').scrollIntoView().wait(1000).check({ force: true })
                        }

                    } else {
                        throw new Error('No se encontro filtro menor a 56 resultados.');
                    }
                })
        } else {
            cy.get(`[title="${filter}"]`).parents('.m-plp__filterSection')
                .find('.plp-filter-options > .a-plp-color > >').last().click({ force: true })
        }
    }

    plpRandomRadio() {
        cy.get('.m-radio').parents('.card-body >').then(($radio) => {
            const option = Cypress._.sample($radio.toArray())
            const text = option.innerText
            const number = parseInt(text.slice(
                text.indexOf('(') + 1,
                text.lastIndexOf(')'),))
            if (attempts < max_attempts) {
                if (number > 55) {
                    this.plpRandomRadio()
                    attempts++
                } else {
                    cy.contains(text).parent().find('.m-radio').click()
                }

            } else {
                throw new Error('No se encontro filtro menor a 56 resultados.');
            }
        })
    }

    plpRandomRadioDesktop() {
        let random
        if (store == "suburbia") {
            random = "Precios"
        } else {
            random = "Precios"
        }

        cy.get('[title=' + random + ']').parents('.m-plp__filterSection')
            .find('.m-radioButton').then(($radio) => {
                const option = Cypress._.sample($radio.toArray())
                const text = option.innerText
                const number = parseInt(text.slice(
                    text.indexOf('(') + 1,
                    text.lastIndexOf(')'),))
                if (attempts < max_attempts) {
                    if (number > 55) {
                        this.plpRandomRadioDesktop()
                        attempts++
                    } else {
                        cy.contains(text).parent().find('[type=radio]').check({ force: true })
                    }

                } else {
                    throw new Error('No se encontro filtro menor a 56 resultados.');
                }
            })
    }

    plpCategoryClick() {
        const cat = cy.get('#Departamentos-brands-filter-title');
        cat.click();
    }

    plpRandomCategory() {
        cy.get('.a-category__listElement_wap').then(($cat) => {
            const item = $cat.toArray()
            const randomCategory = Cypress._.sample(item)
            categoryName = Cypress.$(randomCategory).text().trim()
            cy.log(categoryName)
            Cypress.$(randomCategory).click()
        })
    }

    // 👌 ⤴
    plpFilterTagName() {
        cy.get('.mdc-chip__text').contains(categoryName)
    }

    plpRandomCategoryDesktop() {
        cy.wait(2000)
        cy.get('.nav-sub-options-leftMenu > >').then(($elements) => {
            const ele = Cypress._.sample($elements.toArray())
            const text = ele.innerText
            cy.contains(text).click({ force: true })
        })
    }

    plpSortBy() {
        return cy.get('#sortby')
    }

    plpSortByDesktop() {
        return cy.get('.col-lg-6 #sortby')
    }

    // --- PDP ---

    pdpVisible() {
        return cy.get('.o-product__detail');
        //const plp = cy.get('.o-product__detail');
        //plp.should('exist')
    }

    pdpImg() {
        return cy.get('.img-viewer')
    }

    pdpImgDesktop() {
        return cy.get('#image-real')
    }

    pdpImgZoom() {
        return cy.get('img.pswp__img')
    }

    shareButton() {
        cy.wait(1000)
        if (store != 'suburbia') {
            const button = cy.get('.icon-shared').first()
            button.click({ force: true })
        } else {
            const button = cy.get('.bg-iconShare > .icon-shared')
            button.click({ force: true })
        }
        const modal = cy.get('.show > .modal-dialog > .modal-content')
        modal.should('be.visible')
    }

    shareButtonDesktop() {
        return cy.get('.m-product__anchorShareSocial')
    }

    shareModal() {
        const modal = cy.get('.show > .modal-dialog > .modal-content')
        modal.should('be.visible')
    }



    video() {
        cy.get('.slick-dots button').then(($dots) => {
            const item = $dots.toArray()
            Cypress._.last(item).click()
        })
    }

    videoDesktop() {
        cy.get('.pzlvideo').click({ force: true })
        return cy.get('.pzlcontainerviewer')
    }

    pdpDetails() {
        // product name
        cy.get('.a-product__information--title').should('be.visible')
        // rating
        cy.get('.m-product__information--rating').should('be.visible')
        // store
        cy.get('.btnGeoStore').should('be.visible')
        // price
        cy.get('.a-product__paragraphDiscountPrice').should('be.visible')
        // free shipping
        cy.get('.m-product__freeShipping').should('be.visible')
    }

    pdpDetailsMkp() {
        // product name
        cy.get('.a-product__information--title').should('be.visible')
        // rating
        cy.get('.m-product__information--rating').should('be.visible')
        // store
        cy.get('.a-productInfo__selledByLink').should('be.visible')
        // price
        cy.get('.a-product__paragraphDiscountPrice').should('be.visible')
        // free shipping
        cy.get('.m-product__freeShipping').should('be.visible')
    }

    pdpSku() {
        return cy.get('.product-header-subcontainer-information--code > span')
    }

    pdpScroll() {
        const scroll = cy.get('#richContID')
        scroll.scrollIntoView()
        //cy.wait(2000)
    }

    pdpDetailProduct() {
        return cy.get('#a-description-modal__btn')
    }

    pdpDetailProductDesktop() {
        return cy.get('.m-product__detail')
    }

    pdpEdd() {
        return cy.get('.GeoDeliverySelectCard')
    }

    pdpSelectSize() {
        cy.wait(2000)
        cy.get('body').then(($body) => {
            if ($body.find('#size-list-container').length > 0) {
                // si tiene talla
                cy.get('#size-list-container >> .a-btn').not('.-disabled').then(($size) => {
                    const select = $size.toArray()
                    Cypress._.sample(select).click({ force: true })
                })
                cy.wait(500)
            } else {
                // no tiene talla
                cy.log('Sin talla')
            }
        })
    }

    pdpAddCart() {
        cy.get('body').then(($body) => {
            if ($body.find('#size-list-container').length > 0) {
                // si tiene talla
                cy.get('#size-list-container > > .a-btn').not('.-disabled').then(($size) => {
                    const select = Cypress._.sample($size.toArray())
                    select.click({ force: true })
                })
                cy.get('#opc_pdp_addCartButton').click({ force: true })
            } else {
                // no tiene talla
                cy.get('#opc_pdp_addCartButton').click({ force: true })
            }
        })
    }

    pdpPurchaseNowDigital() {
        cy.get('.o-product__buyNowBtn > .a-btn').click({ force: true })
    }

    pdpPolitics() {
        return cy.get('.btn-m-t #a-description-modal__btn').click({ force: true })
    }

    pdpPoliticsDesktop() {
        return cy.get('.class-2 > .mdc-tab__ripple').scrollIntoView().wait(500).click({ force: true })
    }

    pdpCarousel() {
        return cy.get('.o-carousel')
    }

    pdpCarouselTitle(value) {
        cy.contains(value).should('be.visible')
    }

    // --- EDD ---

    eddStore() {
        return cy.get('#a-edd-modal__btn')
    }

    eddStoreDesktop() {
        return cy.contains('Selecciona tu tienda').first()
    }

    eddLabel() {
        return cy.get('.m-product__eddDate')
    }

    eddLinkZipCode() {
        return cy.contains('Ingresa tu código postal')
    }

    eddLinkChangeZipCode() {
        const zip = cy.contains('Cambiar dirección').scrollIntoView({ ensureScrollable: true })
        zip.click({ force: true })
    }

    eddTypeZipCode(value) {
        const cp = cy.get('#CP')
        cp.type(value, {force: true})
    }

    eddCard() {
        //return cy.get('.GeoDeliverySelectCard')
        return cy.get('.GeoLocationCard > .d-flex')
    }

    eddTextDate() {
        return cy.get('.GeoBodyText')
    }

    eddClickAndCollect() {
        if (isMobile()) {
            cy.scrollTo('center')
        }

        cy.wait(3000)
        cy.get(':nth-child(1) > .GeoLocationCard .GeoBodyText').then(($edd) => {
            const text = $edd.text()

            const edd1 = text.includes('Recoge entre el')
            const edd2 = text.includes('Comprando antes de')
            const edd3 = text.includes('Recoge a partir de')

            expect(edd1 || edd2 || edd3).to.be.true
        })
    }

    eddBtnSearch(value) {
        return cy.get(`button:contains("${value}")`)
    }

    giftRegistryModal() {
        // image
        cy.get('figure > img').should('be.visible')
        // quantity
        cy.get('.a-giftRegistry_qntProduct').should('be.visible')
        // price
        cy.get('.a-giftRegistry__price').should('be.visible')
        // text
        cy.contains('Selecciona tu mesa de regalos').should('be.visible')
        // dropdown
        cy.get('#select-gr__id').should('be.visible')
        // text
        cy.contains('Preferencias del regalo').should('be.visible')
    }

    radioButton() {
        return cy.get('[type="radio"]')
    }

    // --- Hybrids ---

    pdpDetailsHybrid() {
        // share button
        cy.get('.bg-iconShare').should('be.visible')
        // product name
        cy.get('.a-product__information--title').should('be.visible')
        // rating
        cy.get('.m-product__information--rating').should('be.visible')
        // price
        cy.get('.a-product__paragraphDiscountPrice').last().scrollIntoView().should('be.visible')
        // purchase type label
        cy.get('.a-product__paragraphProductDownloadable').should('be.visible')
        // radio buttons
        cy.get('.hybridradio').should('be.visible')
        // help label
        cy.get('.a-product__anchorProductDownloadCode').should('be.visible')
        // purchase button
        cy.contains('.o-product__buyNowBtn', 'Comprar y obtener descarga').should('be.visible')

    }

    pdpDetails2Hybrid() {
        // store
        cy.get('.a-productInfo__selledByLink').should('not.exist')
        // edd
        cy.get('.GeoDeliverySelectCard').should('not.exist')
        // quantity
        cy.get('#qtyDropdownDesktop0').should('not.exist')
    }

    // --- Digital ---

    pdpVerifyDetails() {
        // product name
        cy.get('.a-product__information--title').should('be.visible')
        // rating
        cy.get('.m-product__information--rating').should('be.visible')
        // flag
        cy.get('.m-flag-item').should('include.text', 'Descarga Digital')
        // price
        cy.get('.a-product__paragraphDiscountPrice').should('be.visible')
        // help tag
        cy.get('.a-product__anchorProductDownloadCode').should('be.visible')
    }

    pdpDigitalDetails2() {
        // product name
        cy.get('.a-product__information--title').should('be.visible')
        // image product
        cy.get('.lazyloaded').should('be.visible')
        // price
        cy.get('.a-product__paragraphDiscountPrice').last().scrollIntoView().wait(500).should('be.visible')
        cy.scrollTo("bottom")
        cy.get('#ratings > .card > #object').click({ force: true })
    }

    pdpElementsCarousel() {
        cy.get('.o-carousel').find('a > .card').should('have.length.at.least', 2)
    }

    pdpDigitalDetails() {
        // rating stars
        cy.get('.TT2left > a').should('be.visible')
        // ratings
        cy.get('#ratings').scrollIntoView().should('be.visible')
        // opinions tag
        cy.contains('Opiniones del artículo')
        // include opinion
        cy.get('#TTreviewSearchTerm').type('muy bien', { force: true })
        // write opinion 
        cy.get('#TTwriteReviewBtn-portrait').click()
    }

    pdpSearchOpinion(value) {
        cy.get('#TTreviewSearchTerm').clear().type(value, { force: true })

        cy.wait(1000)
    }

    pdpSearchOpinionDesktop(value) {
        cy.get('#TTreviewSearchTerm').clear().type(value, { force: true })
    }

    pdpDetailProductClick() {
        if (isMobile()) {
            cy.get('#a-description-modal__btn').click({ force: true })
            cy.get('#detail-modal .modal-body').should('be.visible')
            cy.get('#detail-modal button.close > .icon-close').click()
        } else {
            cy.get('.m-product__detail > .tabs-content').should('be.visible')
        }
    }

    pdpOffersAndPromoDekstopCollection() {
        cy.get('.o-product__collectionDescription__detail').first().find('#a-offers__btn').click()
        const promo = cy.get('.o-product__collectionDescription__detail > #promo-modal > .modal-dialog > .modal-content > .modal-body')
        promo.should('include.text', 'Tarjetas Liverpool')
        promo.should('include.text', 'Presupuesto Liverpool')
        promo.should('include.text', 'Otras tarjetas')
        promo.should('include.text', 'CUENTA CORRIENTE EXTERNAS')
    }

    pdpOffersAndPromoDekstop() {
        const promo = cy.get('#o-product__productSpecsPromos > .card')
        promo.should('include.text', 'Tarjetas Liverpool')
        promo.should('include.text', 'Presupuesto Liverpool')
        promo.should('include.text', 'Otras tarjetas')
        promo.should('include.text', 'CUENTA CORRIENTE EXTERNAS')
    }

    pdpOffersAndPromo() {
        const promos = cy.get('#o-product__productSpecsPromos').scrollIntoView()
        promos.should('include.text', 'Tarjetas Liverpool')
        promos.should('include.text', 'Presupuesto Liverpool')
        promos.should('include.text', 'Otras tarjetas')
        promos.should('include.text', 'CUENTA CORRIENTE EXTERNAS')
    }

    pdpRatings() {
        //cy.wait(2000)
        const ratings = cy.get('#ratings')
        ratings.scrollIntoView().should('be.visible')
    }

    // ----- Ratings -----

    pdpScrollRatings() {
        cy.get('#ratings').scrollIntoView({ force: true }).wait(750).should('be.visible')
    }

    pdpWriteOpinionClick() {
        cy.get('#TTwriteReviewBtn-portrait').click({ force: true })
    }

    pdpWriteOpinionDetails() {
        cy.get('#TTtraDialogTitleBar').should('include.text', 'Enviar Opinión')
    }

    pdpOpinionDetails() {
        //stars first review
        cy.get('.TTrevCol1 > .TTratingBoxBorder > .TTratingBox').first().should('be.visible')
        //client name
        cy.get('.TTrevCol3 > :nth-child(2)').first().should('be.visible')
        //Purchase Date
        cy.get('[itemprop="dateCreated"]').first().should('be.visible')
        //Review tittle
        if (isStore("liverpool") || isStore("suburbia")) {
            cy.get('.TTrevCol2 > .TTreviewTitle').first().should('be.visible')
        }
        //Review body
        cy.get('.TTrevCol2 > .TTreviewBody').first().should('be.visible')
        //helpful
        cy.get('.TTrespMobileDisp > .TThelpful').first().should('be.visible')
        //Flag review
        cy.get('.TTrespMobileDisp > .TTflagReview > a').first().should('be.visible')
    }

    lineamientos() {
        cy.get('#TTReviewGuide').should('be.visible')
    }

    pdpOpinionDetailsDesktop() {
        //stars first review
        cy.get('.TTrevCol1 > .TTratingBoxBorder > .TTratingBox').first().should('be.visible')
        //client name
        cy.get('.TTrevCol3 > :nth-child(2)').first().should('be.visible')
        //Purchase Date
        cy.get('.TTrevCol3 > .TTrevPurchaseDate').first().should('be.visible')
        //Review tittle
        cy.get('.TTrevCol2 > .TTreviewTitle').first().should('be.visible')
        //Review body
        cy.get('.TTrevCol2 > .TTreviewBody').first().should('be.visible')
        //helpful
        cy.get('.TThelpful').first().should('be.visible')
        //Flag review
        cy.get('.TTflagReview > a').first().should('be.visible')
    }

    pdpsearchWordInOpinion(value, word) {
        if (value == 'title') {
            cy.get('.TT3questBorder').contains(word, { matchCase: false }).click()
            cy.get('#TT3soloReviewViewR .TTreviewTitle').contains(word, { matchCase: false })
        } else {
            cy.get('.TT3questBorder').first().click()
            cy.get('#TT3soloReviewViewR .TTreviewBody').contains(word, { matchCase: false })
        }
    }

    pdpOpinionSelect() {
        return cy.get('#TTreviewSort')
    }

    pdpReviewExist() {
        cy.get('.TTreview').first().should('be.visible')
    }

    verifyElementsModalOpinion() {
        cy.get('#TTtraDialogTitleBar').should('be.visible')
        cy.get('#TTrevCatItemImg').should('be.visible')
        cy.get('#TTwriteRevHeader').should('be.visible')
        cy.get('#TTwriteRevForm > :nth-child(1)').should('be.visible')
        cy.get('#TTreviewTitle').should('be.visible')
        cy.get('#TTreviewText').should('be.visible')
        cy.get('.TTvc-bar-media-lg-photo').should('be.visible')
        cy.get('#TTsubmitReview').should('be.visible')
        cy.get('#TTwriteRevGuideLn').should('be.visible')
    }
    // --- Gift with purchase ---

    giftIncludedText() {
        return cy.get('.a-giftPurchase-text')
    }

    gwpText() {
        return cy.get('.regalotext')
    }

    giftIncludedImg() {
        return cy.get('.a-giftAdded-img')
    }

    giftIncludedName() {
        return cy.get('.a-giftPurchase-btnText')
    }

    gwpList() {
        return cy.get('.m-giftPurchase_modalList').scrollIntoView()
    }

    gwpPopupTitle() {
        return cy.get('#gift-registry-modal')
    }

    gwpPopupBtnClose() {
        return cy.get('#giftPurchase-modal button.close > .icon-close')
    }

    gwpPopupName() {
        return cy.get('.m-giftPurchase-modal__title')
    }

    gwpPopupImg() {
        return cy.get('.m-giftPurchase_productImage')
    }

    gwpPopupTextSelectList() {
        return cy.get('.m-giftPurchase-modal__bodyTitle').should('include.text', 'Selecciona tu regalo de la lista')
    }

    gwpPopupTextDate() {
        return cy.get('.m-giftPurchase-modal__caption')
    }

    // --- Minibag ---

    menuItem() {
        return cy.get('.icon-more_vert').click()
    }

    bagItemGifts() {
        cy.get('.m-product > div > .a-inlineElement').first().then(($gift) => {
            const giftQty = $gift.text()
            cy.log("cantidad regalo: " + giftQty)

            cy.get('.m-product > div > .a-inlineElement').last()
                .should('have.text', giftQty)
        })
    }

    // --- Ratings ---

    btnWriteOpinion() {
        cy.get('#TTwriteReviewBtn-portrait').as('getbtnwriteOpinion')

        cy.wait('@getbtnwriteOpinion').then($button => {
            //cy.get('#TTwriteReviewBtn-portrait').then($button => {
            cy.wait('@getbtnwriteOpinion')
            if ($button.not(':visible')) {
                cy.log('entro if')
                //you get here only if button is visible
                cy.scrollTo('center', { easing: 'linear', duration: 1000 }).then(() => {
                    cy.wait(2500)
                });
            }
        })

        return cy.get('#TTwriteReviewBtn-portrait')
    }

    // --- Size recommendation ---

    sizeLabel() {
        return cy.get('.fitanalytics__button-text')
    }

    profileMenu() {
        cy.get('body').then(($body) => {
            // validar si existe menú en popup de tallas
            if ($body.find('#uclw_menu_icon').length > 0) {
                // seleccionar opción configuración
                this.menuConfig().click({ force: true })
                // borra info
                cy.get('.uclw_delete_profile').click({ force: true })
                // seleccionar boton si
                cy.get('.uclw_modal_submit').click({ force: true })
            }
        })
    }

    profileMenuSaved() {
        cy.get('body').then(($body) => {
            // validar si existe menú en popup de tallas
            if ($body.find('#uclw_menu_icon').length > 0) {
                // seleccionar opción configuración
                this.menuConfig().click({ force: true })
                // borra info
                cy.get('.uclw_delete_profile').click({ force: true })
                // seleccionar boton si
                cy.get('.uclw_modal_submit').click({ force: true })
            }
            else {
                if ($body.find('.uclw_back').length > 0) {
                    Cypress._.times(3, () => {
                        this.menuBack().click({ force: true })
                    })
                }
            }
        })
    }

    menuBack() {
        cy.get('.uclw_back')
    }

    menuConfig() {
        return cy.get('#uclw_settings_title')
    }

    inputHeigth(value) {
        return cy.get('#uclw_form_height').type(value);
    }

    inputWeigth(value) {
        return cy.get('#uclw_form_weight').type(value);
    }

    inputBustSize() {
        cy.get('[data-ref="bust"] > .uclw_data_select > .uclw_items').children().then(($size) => {
            const item = $size.toArray()
            cy.log($size.text())
            Cypress._.sample(item).click({ force: true })
        })
    }

    inputCupSize() {
        cy.wait(1000)
        return cy.get('[data-ref="cup"] > .uclw_data_select > .uclw_items').children().then(($size) => {
            const item = $size.toArray()
            cy.log($size.text())
            Cypress._.sample(item).click({ force: true })
        })
    }

    inputAge(value) {
        cy.wait(1000)
        return cy.get('.uclw_input_text').type(value);
    }

    barPreferredSetting() {
        cy.get('.uclw_fit_indicators_right').click({ force: true })
        //cy.get('.uclw_noUi-origin').click(40, 15, { force: true })
    }

    whatSizeRefer() {
        return cy.get('#uclw_item_systemInput_mx').click({ force: true })
        /*
        cy.get('body').then(($body) => {
            // validar si existe menú en popup de tallas
            if ($body.find('#uclw_item_systemInput_mx > h3 > b').length > 0) {
                // seleccionar menú en popup de tallas
                cy.get('#uclw_item_systemInput_mx > h3 > b').click({ force: true })
            }
        }) */
    }

    selectAdidas() {
        return cy.get('.id_adidas')
    }

    typeShoes(value) {
        //return cy.contains(value).scrollIntoView().click({ force: true })
        return cy.get('#uclw_form .uclw_category_page .uclw_category_item_label').contains(value).click({ force: true })
        //return cy.get('#uclw_category_item_0_1')
    }

    whatSize(value) {
        return cy.get('.uclw_numeric .uclw_items').contains(value).click({ force: true })
        //return cy.get('#uclw_size_select').contains(value)
    }

    recommendationSize() {
        return cy.get('.uclw_whitebox_container')
    }

    closeSize() {
        return cy.get('#uclw_close_link')
    }

    // --- Colecciones ---

    pdpCollectionDetails() {
        // product name
        cy.get('.a-product__information--title').should('be.visible')
        // rating
        cy.get('.m-product__information--rating').should('be.visible')
        // price
        cy.get('.a-product__paragraphRegularPrice').should('be.visible')
        // description
        cy.get('.o-product__description > .mt-2').should('be.visible')
    }

    pdpCollectionList() {
        cy.get('#products-container').should('be.visible')
    }

    pdpCollectionItemDetails() {
        // image
        cy.get('.o-product__collectionDescription__image').should('be.visible')
        // name
        cy.get('.product-header-container > .a-product__information--title').should('be.visible')
        // sku
        cy.get('.product-header-container > .m-product__information--code').should('be.visible')
        // rating
        cy.get(' .m-product__information--rating').should('be.visible')
        // price
        cy.get('.o-product__description > .m-product__price-dw-promotion').should('be.visible')
    }

    pdpCollectionSelect() {
        return cy.get('.o-product__selected >')
    }

    pdpCollectionSelectDesktop() {
        cy.get('.o-product__container').scrollIntoView()
        return cy.get('.a-btn.a-btn--tertiary.a-product__select').first()
    }

    pdpCollectionSelection() {
        // image
        cy.get('.slick-active > div > .img-viewer > .lazyloaded').should('be.visible')
        // name
        cy.get('.o-product__description > .product-header-container > .a-product__information--title')
        // sku
        cy.get('.o-product__description > .product-header-container > .m-product__information--code').should('be.visible')
        // rating
        cy.get('.o-product__description > .product-header-container > .m-product__information--rating').should('be.visible')
    }

    pdpCollectionSelectionDesktop() {
        // image
        cy.get('.o-product__collectionDescription__image').first().find('div > img').should('be.visible')
        // name
        cy.get('.o-product__collectionDescription__detail > .product-header-container > .a-product__information--title').first().should('be.visible')
        // sku
        cy.get('.o-product__collectionDescription__detail > .product-header-container > .m-product__information--code').first().should('be.visible')
        // rating
        cy.get('.o-product__collectionDescription__detail > .product-header-container > .m-product__information--rating').first().should('be.visible')
    }

    pdpCollectionMsgNoItems() {
        return cy.contains('No hay artículos seleccionados')
    }

    pdpCollectionAdd() {
        return cy.get('.o-product-purchase > div > .a-btn').click({ force: true })
    }

    pdpCollectionQty() {
        cy.get('.m-product__container__title').should('be.visible')
    }
    // --- Marketplace ---

    pdpStock() {
        return cy.get('.btnGeoStore')
    }

    listView() {
        cy.get('.o-listing__products.card-columns-plp').should('be.visible')
    }

    filters() {
        return cy.get('.modal-content')
    }

    filtersDesktop() {
        return cy.get('.col-lg-3')
    }

    notStoreAvailability() {
        return cy.get('.disponibilidad').should('not.exist')
    }

    pdpMkpSellerName() {
        return cy.get('.a-productInfo__selledByLink')
    }

    mkpVendorName() {
        return cy.get('.a-marketplace__vendorName')
    }

    mkpVendorSince() {
        return cy.get('.a-marketplace__vendorSince')
    }

    mkpVendorFreeShipping() {
        return cy.get('.m-marketplace__sendMessage')
    }

    mkpVendorRating() {
        return cy.get('.mt-2 > .d-flex')
    }

    mkpVendorAboutTitle() {
        return cy.get('.a-marketplace__aboutTitle')
    }

    mkpVendorAboutText() {
        return cy.get('.a-marketplace__aboutDesc')
    }

    mkpVendorBtnCatalog() {
        return cy.get('button:contains("Ver catálogo")')
    }

    mkpVendorBtnHelp() {
        return cy.get('button:contains("Ayuda")')
    }

    mkpVendorOpinions() {
        return cy.get('.o-marketplace__profileOpinions')
    }

    mkpCatalogName() {
        //return cy.get('.a-headline__marketplace')
        return cy.get('.mdc-chip')
    }

    edoAvailabilityStore(edo) {
        return cy.get('.row.m-0 > .col-12').contains(edo).click({ force: true })
    }

    elementsWithAvailabilityStore(store) {
        cy.contains("Con disponibilidad")
        cy.get('.a-product__store > :nth-child(2)').contains("piezas")
        if (store == "potterybarn") {
            store = "pottery barn"
        }
        cy.get('.a-product__store > :nth-child(1)')
            .should(($element) => {
                expect($element.text().toLowerCase()).to.satisfy((text) => {
                    return text.includes(store) || text.includes("liverpool");
                });
            });
    }

    resetAttemp() {
        attempts = 0;
        viewMoreCheck = false
    }

    tryBeautyButton() {
        return cy.get('#btn-try-on')
    }

    selectAnotherVar() {
        cy.get('#color-list-mobile >').then(($another) => {
            const select = Cypress._.sample($another.toArray())
            cy.wrap(select).click({ force: true })
        })
        cy.scrollTo('top')
    }

    addQtyBto() {
        cy.get('.pl-0 > .flex-column > .m-stickyBar__qtyInputs > .-add').click({ force: true })
    }

    minusQtyBto() {
        cy.get('.pl-0 > .flex-column > .m-stickyBar__qtyInputs > .-minus').click({ force: true })
    }

    qtyBto(value) {
        cy.get('.pl-0 > .flex-column > .m-stickyBar__qtyInputs > #a-stickyBarPdp__inputQty').should('have.value', value)
    }

    stickyBar() {
        return cy.get('.o-stickyBar__container').should('be.visible')
    }

    wishlistSticky() {
        return cy.get('#wishlist-heart-sticky')
    }

    imageSticky() {
        return cy.get('.a-stickyBar__image')
    }

    productImage() {
        return cy.get('.slick-active > div > .img-viewer > .lazyloaded')
    }

    productImageDesktop() {
        return cy.get('#image-real')
    }

    carouselProduct() {
        return cy.get('.pswp__container > [style="transform: translate3d(0px, 0px, 0px);"]')
    }

    secondCuad() {
        return cy.get('.o-product__productInfo > :nth-child(1) > .row > .col')
    }

    aviCard() {
        return cy.get('.d-xs-none')
    }

    // [ REV. ]

    // --- Add Gift Registry ---

    giftRegistryAddBtn() {
        return cy.get('#a-giftRegistry-modal__btn')
    }

    // [ CELULAR PROTECTION ]

    warrantyPopUp() {
        return cy.get('#waraanty_service-modal > .modal-dialog > .modal-content')
    }

    protectionPopUp() {
        return cy.get('#protection_service-modal > .modal-dialog > .modal-content')
    }

    buyNowDom() {
        return cy.get(':nth-child(3) > .GeoLocationCard')
    }

    // Cross Selling

    crossSellingContainer() {
        return cy.get('.cross_selling_container').scrollIntoView().wait(500)
    }

    verifyFirstSkuCS() {
        cy.get('.a-product__information--title').then(($art) => {
            const artitleName = $art.text()
            this.crossSellingContainer().find('.cross_selling_item_name').first().contains(artitleName)
        })
    }

    verifySkusCS() {
        cy.get('.cross_selling_item_name').each(($nameElement, index) => {
            const artitleNameCs = $nameElement.text();
            if (index !== 0) {
                cy.get('.a-product__information--title').then(($art) => {
                    const artitleName = $art.text();
                    expect(artitleNameCs).not.include(artitleName);
                });
            }
        });
    }

    verifyElementosSkusCS() {
        this.crossSellingContainer().find('.cross_selling_item_info').each(($element, index) => {
            if (index > 0) {
                cy.wrap($element)
                    .find('.cross_selling_item_name')
                    .should('exist')
                    .and('be.visible');

                cy.wrap($element)
                    .find('.cross_selling_item_price')
                    .should('exist')
                    .and('be.visible');

                cy.wrap($element)
                    .find('.cross_selling_initial_link')
                    .should('exist')
                    .and('be.visible');
            }
        });
    }

    verifyElementsSaveSkusCS() {
        this.crossSellingContainer().find('.cross_selling_item_info').each(($element) => {
            cy.wrap($element)
                .find('.cross_selling_item_name')
                .should('exist')
                .and('be.visible');

            cy.wrap($element)
                .find('.cross_selling_item_price')
                .should('exist')
                .and('be.visible');

            cy.wrap($element)
                .find('.cross_selling_initial_link')
                .should('not.exist')

            cy.wrap($element)
                .contains('Color')
                .should('exist')
                .and('be.visible');

            cy.wrap($element)
                .contains('Cantidad')
                .should('exist')
                .and('be.visible');

            cy.wrap($element).then(($body) => {
                if ($body.contents('Talla').length > 0) {
                    cy.wrap($element).contains('Talla').should('exist').and('be.visible');
                }
            })
        });
    }

    verifyCheckSkusCS() {
        this.crossSellingContainer().find('.a-checkbox__input.mdc-checkbox__native-control').each(($element) => {
            cy.wrap($element).should('be.checked')
        });
    }

    verifyCheckLastElement() {
        this.crossSellingContainer().find('.a-checkbox__input.mdc-checkbox__native-control').last().should('be.checked')
    }

    checkSkusCS() {
        this.crossSellingContainer().find('.a-checkbox__input').each(($element) => {
            cy.wrap($element).click({ force: true })
        });
    }

    modalContainerCS() {
        return cy.get('.cross_selling_modal_container')
    }

    artitlesModalCS() {
        return cy.get('.cross_selling_modal_product_info_container')
    }

    selectSizeArtitlesCS() {
        this.artitlesModalCS().each(($element) => {
            cy.wrap($element).then(($body) => {
                if ($body.find('#size-list-container .a-btn').length > 0) {
                    cy.wrap($element).find('#size-list-container .a-btn').first().click({ force: true })
                }
            })
        });
    }

    selectQuantityArtitlesCS() {
        this.artitlesModalCS().each(($element) => {
            cy.wrap($element).then(($body) => {
                if ($body.find('.m-stickyBar__qtyInputs > .-add').length > 0) {
                    cy.wrap($element).find('.m-stickyBar__qtyInputs > .-add').click()
                }
            })
        });
    }

    verifyElementsSkusModalCS() {
        this.modalContainerCS().find('.cross_selling_modal_product_info_container').each(($element) => {
            cy.wrap($element).scrollIntoView().wait(200)
            cy.wrap($element)
                .find('.cross_selling_modal_product_info_image')
                .should('exist')
                .and('be.visible');

            cy.wrap($element)
                .find('.cross_selling_modal_product_title')
                .should('exist')
                .and('be.visible');

            cy.wrap($element)
                .find('.cross_selling_modal_product_info_data_container')
                .should('exist')
                .and('be.visible');
        });
    }

    checkOnlyFirstElementCS() {
        this.crossSellingContainer().find('.a-checkbox__input').first().click({ force: true })
    }

    checkOnlyOneElementCS() {
        this.crossSellingContainer().find('.a-checkbox__input').last().click({ force: true })
    }

    compareTotalCS() {
        cy.get('@totalPriceCS').then(txt => {
            cy.get('.cross_selling_amount').should($title => {
                const op2 = $title.text().replace(/[$,]/g, "").trim()
                const tempPrice = txt.replace(/[$,]/g, "").trim()
                expect(parseFloat(tempPrice)).to.not.equal(parseFloat(op2))
            })
        })
    }

    saveTotalCS() {
        cy.get('.cross_selling_amount').then($title => {
            totalPriceCS = $title.text().replace(/[$,]/g, "").trim()
            cy.wrap(totalPriceCS).as('totalPriceCS')
        })
    }

    filterItems() {
        if (isMobile) {
            return cy.get('.container > .d-lg-none').find('.col > ')
        } else {
            return cy.get('.o-aside > :nth-child(5) >')
        }
    }

    promosButton() {
        return cy.get('.product__view-promotion-container')
    }

    promosModalHeader() {
        return cy.get('.info_promotions_modal_header')
    }

    promosModalBody() {
        return cy.get('.info_promotions_modal_body')
    }

    specialPromoFilter(){
        return cy.get('.m-plp-card-container .a-flag').first()
    }

    product(){
        return cy.get('.m-plp-card-container ')
    }

    anotherSellers(){
        return cy.get('.m-vendors__description')
    }

    seller(){
        return cy.get(':nth-child(1) > :nth-child(4) > .m-vendor > .a-offer-vendor__name')
    }

    xIcon() {
        return cy.get(':nth-child(2) > .col-12 > .a-modalShare__icon > .react-share__ShareButton')
    }
}

export default browsePage;