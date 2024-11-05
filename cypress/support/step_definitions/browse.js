import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import browsePage from '../pages/browsePage'
import genericPage, { isMobile, isStore } from '../pages/genericPage'

const bs = new browsePage()
const generic = new genericPage()

export let geoText, productName
let store = Cypress.env('STORE');
let site = Cypress.env('SITE');


// ----- BLP -----

Then('valido estar en blp', () => {
    bs.blpVisible()
    cy.get('.nav-sub-options-leftMenu').should('exist')
})

// ----- CLP -----

When('select subcategory', () => {
    cy.get('.a-category__listElement').then($elements => {
        const randomIndex = Math.floor(Math.random() * $elements.length);
        cy.wrap($elements[randomIndex]).click({ force: true });
    });
    cy.wait(1000)
})

Then('redirection to 3rd level is verified', () => {
    cy.get('body').then($body => {
        const cardsRowVisible = $body.find('.o-cards-row:visible').length > 0
        const productListingVisible = $body.find('.m-product__listingPlp:visible').length > 0
        
        expect(cardsRowVisible || productListingVisible).to.be.true
      })
})

When('choose clp image', () => {
    cy.get('.m-figureCard__figure').first().click()
})

// ----- PLP -----

Then('valid number of products in plp', () => {
    cy.wait(2500)
    cy.get('body').then(($body) => {
        if ($body.find("li[class*='product__card']").length > 0) {
            bs.plpProductCount()
        } else {
            cy.wait(500)
            generic.pdpVisible().should('exist')
        }
    })
})

When('click on filter', () => {
    if (isMobile()) {
        bs.plpFilterClick()
    }
    bs.resetAttemp()
})

When('click on list view mode', () => {
    if (isMobile()) {
        bs.plpFilterView().click()
        cy.get('#lista').click()
        cy.get('#filters-modal').click('topLeft')
    } else {
        bs.plpViewListDesktop().click()
    }
})

When('valid product name in plp', () => {
    bs.plpProductName().should('be.visible')
})

When('valid price of the product in plp', () => {
    bs.plpProductPrice().should('be.visible')
})

When('valid color variants in plp', () => {
    bs.plpProductColour().should('be.visible')
})

When('valid ratings in plp', () => {
    if (isStore('suburbia')) {
        if (isMobile()) {
            bs.plpFilterType('Calificaciones')
        } else {
            bs.plpFilterTypeDesktop('Calificación')
        }
    }
    bs.plpProductRatings().should('be.visible')
})

When('click on filter {string}', (filter) => {
    cy.wait(500)
    if (isMobile()) {
        bs.plpFilterType(filter)
        bs.plpByNumber()
        cy.get('#filters-modal').click('topLeft')
    } else {
        bs.plpFilterTypeDesktop(filter)
    }
})

When('click on filter prices', () => {
    if (isMobile()) {
        bs.plpFilterType('Precio')
        bs.plpRandomRadio()
        cy.get('#filters-modal').click('topLeft')
    } else {
        bs.plpRandomRadioDesktop()
    }
})

When('click on filter categories', () => {
    if (isMobile()) {
        bs.plpCategoryClick()
        bs.plpRandomCategory()
        cy.get('#filters-modal').click('topLeft')
    } else {
        bs.plpRandomCategoryDesktop()
    }
})

When('the filter is applied correctly', () => {
    bs.plpFilterTagName()
})

When('click on order', () => {
    if (isMobile()) {
        bs.plpSortBy().click()
    } else {
        bs.plpSortByDesktop().click()
    }
})

When('click on order for lower price', () => {
    cy.contains('Menor precio').click({ force: true })
})

When('click on order by {string}', (orden) => {
    cy.contains(orden).click({ force: true })
})

Then('verify that the ordering {string} be correct', (orden) => {
    cy.wait(2000)
    bs.plpProductPrice().first().then(($firstPrice) => {
        const priceUnit = $firstPrice.text().replace(/[$,]/g, "").replace("  ", "").replace("  ", ".")
        let price = parseFloat(priceUnit)
        bs.plpProductPrice().last().should($title => {
            let op2 = $title.text().replace(/[$,]/g, "").split("-")[0].trim()
            const secondPrice = parseFloat(op2)
            if (orden == "Menor precio") {
                expect(secondPrice).to.greaterThan(price)
            } else {
                expect(secondPrice).to.lessThan(price)
            }
        })
    })
})
// ----- PDP -----

Then('valid product image in pdp', () => {
    if (isMobile()) {
        bs.pdpImg().first().click('center')
    } else {
        bs.pdpImgDesktop().click({ force: true })
    }
    bs.pdpImgZoom().should('be.visible')
    cy.get("[title='Close (Esc)']").click()

})

Then('valid share button', () => {
    if (isMobile()) {
        bs.shareButton()
    } else {
        bs.shareButtonDesktop().scrollIntoView().wait(1000).click({ force: true })
    }
    bs.shareModal()
})

Then('verify allowed to view the video', () => {
    if (isMobile()) {
        bs.video()
    } else {
        bs.videoDesktop().should('be.visible')
    }
})

Then('verify elements of the 1st quadrant', () => {
    bs.pdpDetails()
    bs.pdpSku().should('be.visible')
})

Then('verify elements of the 1st MKP quadrant', () => {
    bs.pdpDetailsMkp()
    bs.pdpSku().should('be.visible')
})

Then('valid offers and promotions', () => {
    cy.get('.o-product__productSpecsPromos').should('exist')
})

Then('valid label characteristics', () => {
    if (isMobile()) {
        bs.pdpDetailProduct().click({ force: true })
    } else {
        bs.pdpDetailProductDesktop().scrollIntoView().should('be.visible')
    }
})

Then('valid estimated delivery date', () => {
    bs.pdpEdd().should('be.visible')
})

Then('valid label policies', () => {
    if (isMobile()) {
        bs.pdpPolitics()
    } else {
        bs.pdpPoliticsDesktop()
    }

})

Then('valid carousel similar articles', () => {
    cy.wait(2500)
    cy.scrollTo('bottom')
    bs.pdpCarousel().should('be.visible')
})

Then('valido título de carrusel {string}', (title) => {
    bs.pdpCarouselTitle(title)
})

Then('valid carousel elements', () => {
    bs.pdpDigitalDetails2()
    cy.wait(2000)
    if (isMobile()) {
        bs.pdpCarousel().scrollIntoView().wait(500).should('be.visible')
    } else {
        cy.scrollTo(0, 1500).wait(500)
        bs.pdpCarousel().scrollIntoView().should('be.visible')
    }
    bs.pdpCarouselTitle('Artículos similares')
})

When('select size', () => {
    cy.wait(1000)
    bs.pdpSelectSize()
})

Then('valid to display Product detail', () => {
    if (isMobile()) {
        bs.pdpDetailProductClick()
    } else {
        bs.pdpDetailProductDesktop().should('be.visible')
    }
})

Then('valid to display Offers and promotions Collection', () => {
    if (isMobile()) {
        bs.pdpOffersAndPromo()
    } else {
        cy.wait(500)
        bs.pdpOffersAndPromoDekstopCollection()
    }
})

Then('valid to display Offers and promotions', () => {
    if (isMobile()) {
        bs.pdpOffersAndPromo()
    } else {
        cy.wait(500)
        bs.pdpOffersAndPromoDekstop()
    }
})

Then('Valid to show Opinions of the article', () => {
    bs.pdpRatings()
})

Then('valid to show 2 opinions', () => {
    bs.pdpRatings()
    cy.get('.TTreview').not('[style*="display: none;"]').not('[style*="display:none"]').should('have.length', 2)
})

Then('select Show # reviews more', () => {
    bs.pdpRatings()
    cy.get('#TT3rShowMore > a > .TT3ShowMoreText').scrollIntoView().click({ force: true })
})

Then('verify if more than 2 opinions are shown', () => {
    bs.pdpRatings()
    cy.get('.TTreview').not('[style*="display: none;"]').not('[style*="display:none"]').should('have.length.gte', 2)
})

Then('verify that at least 2 articles are displayed in the carousel', () => {
    bs.pdpElementsCarousel()
})

Then('select button Escribe una opinión', () => {
    bs.pdpScrollRatings()
    bs.pdpWriteOpinionClick()
})

Then('verifica elementos de modal escribe una opinion', () => {
    bs.pdpWriteOpinionDetails()
})

Then('validate comment elements', () => {
    bs.pdpScrollRatings()
    if (isMobile()) {
        bs.pdpOpinionDetails()
    } else {
        bs.pdpOpinionDetailsDesktop()
    }
})

Then('search for an opinion by title {string}', (tittle) => {
    bs.pdpScrollRatings()
    if (isMobile()) {
        cy.get('#TTwriteReviewBtn-portrait').scrollIntoView()
        cy.scrollTo(0, 1500).wait(1000)
        /*
        if (isStore("liverpool")) {
            
            //cy.scrollTo(0, 1500).wait(750)
        } else {
            //cy.scrollTo(0, 2000).wait(750)
        }
        */
        bs.pdpSearchOpinion(tittle)
    } else {
        cy.wait(500)
        bs.pdpSearchOpinionDesktop(tittle)
    }
    cy.wait(500)
})

Then('search for an opinion by comment content {string}', (search) => {
    bs.pdpScrollRatings()
    if (isMobile()) {
        cy.get('#TTwriteReviewBtn-portrait').scrollIntoView().wait(500)
        /*
        if (isStore("liverpool")) {
            cy.scrollTo(0, 1000).wait(1000)
        } else {
            cy.scrollTo(0, 2000).wait(1000)
        }
        */
        bs.pdpSearchOpinion(search)
    } else {
        cy.wait(500)
        bs.pdpSearchOpinionDesktop(search)
    }
})

Then('Valid to show the opinion {string} {string}', (word, type) => {
    bs.pdpsearchWordInOpinion(type, word)
})

Then('select {string}', (type) => {
    bs.pdpScrollRatings()
    if (isMobile()) {
        if (isStore("liverpool")) {
            cy.get('#TTreviewSort').scrollIntoView()
            //cy.scrollTo(0, 1700).wait(750)
        } else if (!isStore("suburbia")) {
            cy.scrollTo(0, 2200).wait(750)
        }
        bs.pdpOpinionSelect().select(type)
    } else {
        cy.scrollTo(0, 1300).wait(500)
        bs.pdpOpinionSelect().select(type)
    }
})

Then('Verify that the selected option is displayed {string}', (type) => {
    const res = bs.pdpOpinionSelect()
    switch (type) {
        case "Más reciente":
            res.should('have.value', 'mostRecent')
            break
        case "Mayor calificación":
            res.should('have.value', 'highLow')
            break
        case "Menor calificación":
            res.should('have.value', 'lowHigh')
            break
        default:
            res.should('have.value', 'bestR')
            break
    }
    cy.wait(500)
    bs.pdpReviewExist()
})

Then('verify elements of Write a review', () => {
    bs.verifyElementsModalOpinion()
})

Then('verify the guidelines', () => {
    bs.lineamientos()
})

// --- Minibag ---

Then('verify text of empty bag', () => {
    cy.contains('No hay artículos en tu bolsa').should('exist')
})

// ----- EDD -----

Then('verify label release date', () => {
    bs.eddLabel().scrollIntoView().should('include.text', 'Fecha de Lanzamiento')
})

When('select option enter your zip code', () => {
    //cy.wait(2000)
    bs.eddLinkZipCode().scrollIntoView().click({ force: true })
})





When('I select the option change direction', () => {
    cy.wait(2500)
    bs.eddLinkChangeZipCode()
})

When('enter the zip code {string}', (cp) => {
    bs.eddTypeZipCode(cp)
    //cy.wait(1500)
    //bs.eddBtnSearch('Buscar').click()
})

When('shows estimated delivery date card', () => {
    bs.eddCard().scrollIntoView()
    //cy.get('.GeoBodyText').contains(/Comprando antes|Comprando antes/g)
    //bs.eddTextDate().should('include.text', ['Recoge entre el','Comprando antes de'])
})

Then('valid label with date range at home', () => {
    cy.wait(1500)
    cy.scrollTo(0, 1000)
    bs.eddTextDate().last().contains(new RegExp(/^\w{6} entre el \w+/)).should('be.visible')
})

Then('valid label with exact date', () => {
    //bs.eddCard().first().scrollIntoView()
    cy.wait(1000)
    bs.eddTextDate().should('be.visible')
})

Then('valid item without delivery date', () => {
    generic.pdpVisible()
    cy.get('.GeoBodyText').should('not.exist')
})

// ----- Add gift registry -----

When('select add to my table without selecting size', () => {
    bs.giftRegistryAddBtn().scrollIntoView().click({ force: true })
})

When('select button add to my gift table', () => {
    generic.randomSize()
    bs.giftRegistryAddBtn().scrollIntoView().click({ force: true })
})



Then('valid modal elements add to table', () => {
    bs.giftRegistryModal()
})

Then('valid physical and electronic gift radio button disabled', () => {
    cy.get('[type="radio"]').should('be.disabled')
})

Then('select event and radio button physical gift', () => {
    cy.get('#select-gr__id').trigger('mousemove').select(1)
    bs.radioButton().first().check()
    cy.get('#addGRButton').click()
})

// ----- Hybrids -----

Then('verifico elementos de articulo hibrido', () => {
    bs.pdpDetailsHybrid()
})

Then('verifico que no exista ITR, EDD y dropdown de cantidad', () => {
    bs.pdpDetails2Hybrid()
})

Then('selectradio button fisico', () => {
    bs.radioButton().first().check({ force: true }).should('be.checked')
})

Then('selectradio button digital', () => {
    bs.radioButton().last().check({ force: true }).should('be.checked')
})

// ----- Digital -----

Then('verify elements in pdp for digital article', () => {
    cy.wait(1000)
    bs.pdpVerifyDetails()
    bs.pdpSku().should('be.visible')
})

Then('verify that no estimated delivery date is displayed', () => {
    bs.pdpEdd().should('not.exist')
})

When('verify that there is no inventory in the store', () => {
    bs.pdpStock().should('not.exist')
})

Then('valid buy button and get download', () => {
    bs.pdpPurchaseNowDigital()
    cy.wait(1500)
})

Then('verify elements of ratings and reviews', () => {
    bs.pdpScrollRatings()
    bs.pdpVerifyDetails()
})
// ----- Gift with purchase -----

Then('gift option shown included', () => {
    bs.giftIncludedText().scrollIntoView().should('include.text', 'Regalo incluido')
})

Then('gift with purchase tag shown', () => {
    bs.gwpText().scrollIntoView().should('include.text', 'Regalo con compra')
})

Then('the image of the included gift is displayed', () => {
    bs.giftIncludedImg()
})

Then('the name of the included gift is shown', () => {
    bs.giftIncludedName()
})

When('select gift', () => {
    bs.giftIncludedName().click({ force: true })
})

Then('verify gift list', () => {
    bs.gwpList().should('be.visible')
})

Then('verify gift title', () => {
    bs.gwpPopupTitle().should('include.text', 'Regalo')
})

Then('verify popup close button', () => {
    bs.gwpPopupBtnClose().should('be.visible')
})

Then('verify gift name', () => {
    bs.gwpPopupName().should('be.visible')
})

Then('verify image in the gift popup', () => {
    bs.gwpPopupImg().scrollIntoView().should('be.visible')
})

Then('verify label select your gift from the list', () => {
    bs.gwpPopupTextSelectList()
})

Then('verify the text, the delivery date of the gift and the item could be different', () => {
    bs.gwpPopupTextDate().should('include.text', 'La fecha de entrega del regalo y del artículo podrían llegar a ser diferentes')
})

Then('check radio button selection in gift list', () => {
    cy.get('[type="radio"]').first().check({ force: true }).should('be.checked')
})

When('selectmenu del artículo', () => {
    cy.wait(1000)
    if (isMobile()) {
        bs.menuItem()
    }
    cy.wait(500)
})

When('verify the same amount in item and gift', () => {
    bs.bagItemGifts()
})

// ----- Size recommendation-----

When('select find your size', () => {
    cy.wait(1000)
    bs.sizeLabel().scrollIntoView().click({ force: true })
})

When('validate profile information', () => {
    cy.wait(1000)
    bs.profileMenu()
})

When('validate profile information guardado', () => {
    cy.wait(1000)
    bs.profileMenuSaved()
})

When('Enter data to determine womens top size', () => {
    // altura
    bs.inputHeigth(160).scrollIntoView().click({ force: true })
    // peso
    bs.inputWeigth(55).scrollIntoView().click({ force: true })
    cy.wait(1000)
    generic.button('Continuar').click({ force: true })
    // selectforma del vientre
    generic.button('Plano').click({ force: true })
    // selectforma de la cadera
    generic.button('Estrecha').click({ force: true })
    // selecttalla brassiere busto
    cy.wait(1000)
    bs.inputBustSize()
    // selecttalla brassiere copa
    bs.inputCupSize()
    cy.wait(1000)
    generic.button('Continuar').click({ force: true })
    // ingresa la edad de "28"
    bs.inputAge(33).scrollIntoView().click({ force: true })
    cy.wait(1000)
    generic.button('Continuar').click({ force: true })
    // seleccionar ajuste preferido
    bs.barPreferredSetting()
    cy.wait(1000)
    generic.button('Continuar').click({ force: true })
    cy.wait(1000)
    generic.button('Seguir comprando').click({ force: true })
})

Then('Enter data to determine womens bottom size', () => {
    // altura
    bs.inputHeigth(160).scrollIntoView().click({ force: true })
    // peso
    bs.inputWeigth(50).scrollIntoView().click({ force: true })
    cy.wait(1000)
    generic.button('Continuar').click({ force: true })
    // selectforma del vientre "Plano"
    generic.button('Plano').click({ force: true })
    // selectforma de la cadera "Estrecha"
    generic.button('Estrecha').click({ force: true })
    // ingresa la edad de "28"
    bs.inputAge(28).scrollIntoView().click({ force: true })
    generic.button('Continuar').click({ force: true })
    // seleccionar ajuste preferido
    bs.barPreferredSetting()
    generic.button('Continuar').click({ force: true })
    cy.wait(2000)
    // selecttalla
    //generic.button('M').click({ force: true })
    generic.button('XL').click({ force: true })
    generic.button('No sé').first().click({ force: true })
    //bs.whatSizeRefer()
    //cy.get('#uclw_close_container').click().should('be.visible')
})

Then('Enter data to determine womens shoe size', () => {
    // ¿Qué sueles llevar?
    bs.selectAdidas().click({ force: true })
    cy.wait(1500)
    // ¿Qué tipo?
    bs.typeShoes('Sneakers')
    cy.wait(1500)
    // ¿Qué talla?
    bs.whatSize('25')
    cy.wait(1500)
    // ¿Cuál es el ancho de tus pies?
    generic.button('Delgado').click({ force: true })
})

When('select liverpool logo', () => {
    cy.get('.a-header__logo').click({ force: true })
    cy.url().should('contain', 'https://' + site + '.' + store + '.com.mx/tienda/home')
})

Then('cierra popup encuentra tu talla', () => {
    bs.closeSize().click({ force: true })
})

Then('verify that size recommendation is displayed', () => {
    bs.recommendationSize().should('exist')
})

// ----- Colecciones -----

Then('verify elements from the 1st quadrant of a collection', () => {
    bs.pdpCollectionDetails()
})

Then('verify list of items in a collection', () => {
    bs.pdpCollectionList()
})

Then('check tag Articles added # of #', () => {
    bs.pdpCollectionQty()
})

Then('verify image, name, sku, rating and price of items in the collection', () => {
    bs.pdpCollectionItemDetails()
})

Then('realiza scroll al centro', () => {
    cy.scrollTo('center')
})

Then('click on the select button', () => {
    if (isMobile()) {
        bs.pdpCollectionSelect().first().click({ force: true })
    } else {
        bs.pdpCollectionSelectDesktop().click({ force: true })
    }
})

Then('verify elements of the selected item', () => {
    if (isMobile()) {
        bs.pdpCollectionSelection()
    } else {
        bs.pdpCollectionSelectionDesktop()
    }
})

Then('add collection item to bag', () => {
    if (isMobile()) {
        cy.contains('Aceptar').click({ force: true })
    }
    cy.wait(1000)
    bs.pdpCollectionAdd()
    cy.wait(1000)
    generic.pdpAddCartMsg().should('be.visible')
})

Then('verify the message No items selected', () => {
    bs.pdpCollectionAdd()
    cy.wait(1000)
    bs.pdpCollectionMsgNoItems().should('be.visible')
})

Then('verify that ratings are not displayed in the 1st quadrant', () => {
    cy.get('.o-product__detail > .container > .m-product__information--rating').should('not.exist')
})

// ----- Marketplace -----

Then('does not display availability in store for mkp item', () => {
    bs.notStoreAvailability()
})

Then('verify text sold by', () => {
    bs.pdpMkpSellerName().scrollIntoView().should('be.visible')
    cy.contains('Vendido por', { matchCase: false }).should('be.visible')
})

When('select seller name', () => {
    bs.pdpMkpSellerName().click({ force: true })
})

Then('check seller page elements', () => {
    bs.mkpVendorName().should('be.visible')
    bs.mkpVendorSince().should('be.visible')
    bs.mkpVendorFreeShipping().should('be.visible')
    bs.mkpVendorRating().should('be.visible')
    bs.mkpVendorAboutTitle().should('be.visible')
    //bs.mkpVendorAboutText().should('be.visible')
    bs.mkpVendorBtnCatalog().should('be.visible')
    bs.mkpVendorBtnHelp().should('be.visible')
    bs.mkpVendorOpinions().should('be.visible')
})

Then('select see catalog', () => {
    bs.mkpVendorBtnCatalog().click({ force: true })
})

Then('checks items in the sellers catalog', () => {
    bs.mkpCatalogName().should('be.visible')
})

Then('select see availability in store', () => {
    generic.randomSize()
    bs.pdpStock().scrollIntoView().should('be.visible').click({ force: true })
})

// ----- Inventario -----

Then('select state {string} availability in store', (edo) => {
    bs.edoAvailabilityStore(edo)
})

Then('verify results with availability in stores', () => {
    bs.elementsWithAvailabilityStore(store)
})

Then('display label try it on PDP image', () => {
    bs.tryBeautyButton().should('be.visible')
})

Then('select another variant', () => {
    if (isMobile()) {
        cy.scrollTo(0, 500).wait(500)
        cy.get('#color-show-more').click().wait(500)
    }
    bs.selectAnotherVar()
})

Then('select try it', () => {
    bs.tryBeautyButton().click({ force: true })
    cy.get('#YMK-module-iframe').should('be.visible')
})

Then('verify the label With Beauty Try On, test your products in real time', () => {
    cy.switchToIframe('#YMK-module-iframe').contains('Con Beauty Try On, prueba tus productos en tiempo real').should('exist')
})

Then('select Upload a photo', () => {
    cy.switchToIframe('#YMK-module-iframe').contains('Sube una foto').click()
})

Then('select the image of a sku in the section You may also be interested in', () => {
    cy.get('.m-description-tryonbeauty').then(($el) => {
        cy.wrap($el.text()).as('nombreElemento')
    })
    bs.carouselBTO().find('.card').last().click({ force: true })
})

Then('Verify that you can choose another variant of the sku', () => {
    cy.wait(1500)
    cy.get('div.font-weight-bold > span').then(($el) => {
        cy.wrap($el.text()).as('nombreElemento')
    })
    cy.get('#color-list -try-on-beauty > :nth-child(2) > .atom-color').scrollIntoView().click({ force: true })
    cy.wait(1000)
    cy.get('div.font-weight-bold > span').then(($el2) => {

        cy.get('@nombreElemento').then(el => {
            expect(el).not.to.equal($el2.text())
        });
    })
})

Then('add to my bag from the Beauty Try On PopUp', () => {
    cy.get('.mt-3 > #opc_pdp_addCartButton').click({ force: true })
})


Then('verify the redirection to the PDP of the sku', () => {
    cy.get('.a-product__information--title').then(($el2) => {

        cy.get('@nombreElemento').then(el => {
            expect(el).not.to.equal($el2.text())
        });
    })
})

Then('select the PopUp tag', () => {
    cy.switchToIframe('#YMK-module-iframe').find('div:nth-child(2) > div > div:nth-child(1) > div').click({ force: true })
    cy.switchToIframe('#YMK-module-iframe').contains('Confirmar').click({ force: true })
})

Then('verify redirection to PDP when closing PopUp', () => {
    cy.get('#YMK-module-iframe').should('not.exist')
})

Then('{string} the quantity of products', (opcion) => {
    if (opcion == "Aumentar") {
        bs.addQtyBto()
    } else {
        bs.minusQtyBto()
    }
})

Then('verify that {string} the quantity of products', (opcion) => {
    if (opcion == "Aumentar") {
        bs.qtyBto(3)
    } else {
        bs.qtyBto(1)
    }
})

Then('slide down', () => {
    cy.get('#o-product__productSpecsPromos > .card').first().scrollIntoView().wait(500)
})

Then('verify that the Sticky Bar appears', () => {
    bs.stickyBar()
})

Then('select {string} of the lower Sticky Bar', (opcion) => {
    bs.stickyBar().contains(opcion).click({ force: true })
})

Then('select the heart of the Sticky Bar', () => {
    bs.wishlistSticky().click()
})

Then('select the sku image in the Sticky Bar', () => {
    bs.imageSticky().click()
})

Then('verify redirection to PDP', () => {
    cy.wait(1000)
    cy.scrollTo(0,0)
    cy.get('.o-checkout__header').then(($el) => {
        const bottom = Cypress.$(cy.state('window')).height()
        const rect = $el[0].getBoundingClientRect()
        const isInViewport = (
            rect.top >= -2 &&
            rect.left >= 0 &&
            rect.bottom <= bottom &&
            rect.right <= Cypress.$(cy.state('window')).width()
        )
        expect(isInViewport).to.be.true
    })
})

Then('verify that the warranty pop up is displayed', () => {
    bs.warrantyPopUp().should('be.visible')
})

Then('select the x of the warranty pop up to close it', () => {
    bs.warrantyPopUp().find('.icon-close').click()
})

Then('select the sku image', () => {
    if (isMobile()) {
        bs.productImage().click()
    } else {
        bs.productImageDesktop().click()
    }
})

Then('verifies elements of the second quadrant of the pdp', () => {
    if (!isStore("suburbia")) {
        bs.secondCuad().scrollIntoView().wait(500)
        if (!isStore("toysrus")) {
            //Recoge en tienda
            bs.secondCuad().find('.GeoLocationCard').should('be.visible')
            //Disponibilidad en tiendas
            bs.secondCuad().find('.ChangeStoreTextLink').should('be.visible')
        } else {
            //Disponibilidad en tiendas
            bs.secondCuad().find('.ChangeStoreTextLink').should('not.exist')
        }
        //Recibe a domicilio
        bs.secondCuad().find(':nth-child(3) > .GeoLocationCard').should('be.visible')

    } else {
        cy.get('.o-product__purchase > :nth-child(1)').should('be.visible')
    }

})

Then('verify the sku image carousel', () => {
    bs.carouselProduct().should('be.visible')
})

Then('verify 2 items in the bag', () => {
    cy.get('body').then(($body) => {
        expect(2).to.equal(Number($body.find('.a-header__bag > span').text()))
    })
})

Then('select button Continue shopping', () => {
    cy.contains("Continuar comprando").click({ force: true }).wait(1000)
})

Then('check the estimated delivery date', () => {
    var regex = /(\d+)/g;
    bs.eddTextDate().within(($text) => {
        geoText = $text.text().match(regex).join('')
        cy.log($text.text())
    })
    productName = cy.get('.a-product__information--title').within(($name) => {
        productName = $name.text()
        cy.log($name.text())
    })
})

Then('Verify that it is the same estimated delivery date that was shown on the PDP', () => {
    cy.contains(productName).parents('.sku_id_delivery_date').find('.delivery-home-estimation > span').first().then(($el2) => {
        cy.log(geoText)
        cy.log($el2.text())
        var regex = /(\d+)/g;
        expect(geoText).to.equal($el2.text().match(regex).join(''))
    })
})

Then('Verify that it is the same estimated date that you showed in PDP', () => {
    cy.url().should('contain', 'https://' + site + '.' + store + '.com.mx/tienda/oneCheckout')
    cy.contains(productName).parents('#opc_productsContainer >').find('.delivery-date-mobile >').first().then(($el2) => {
        cy.log(geoText)
        cy.log($el2.text())
        var regex = /(\d+)/g;
        expect(geoText).to.equal($el2.text().match(regex).join(''))
    })
})

Then('check the AVI banner', () => {
    cy.scrollTo(0,1800).wait(500)
    bs.aviCard().should('be.visible')
})

Then('check the AVI banner with login', () => {
    cy.scrollTo(0,1800).wait(500)
    bs.aviCard().contains('Iniciar Asesoría virtual').should('be.visible')
})

Then('check the AVI banner without login from {string}', (opcion) => {
    if(opcion == "pdp"){
        cy.scrollTo(0,1800).wait(500)
        bs.aviCard().contains('¿Quieres más detalles del producto?').should('be.visible')
    }
    else{
        bs.aviCard().scrollIntoView().wait(500)
        bs.aviCard().contains('¿No sabes cuál elegir?').should('be.visible')
    }
    bs.aviCard().contains('Inicia sesión').should('be.visible')
   
    bs.aviCard().find('.a-product__headLineProductPromoSubtitle').should('be.visible')
    bs.aviCard().find('.row > :nth-child(1) > img').should('be.visible')
})

Then('select button {string} from AVI banner', (opcion) => {
    cy.scrollTo(0,2000).wait(500)
    bs.aviCard().find('.a-btn').contains(opcion).click()
})

Then('Verify that the Virtual Advisor is deployed', () => {
    cy.get('.css-1l2nfdo.e19bzbh64').should('be.visible')
})

Then('verify list mode', () => {
    bs.listView()
})

Then('verify if the filters are deployed', () => {
    if (isMobile()) {
        bs.filters().should('be.visible')
    } else {
        bs.filtersDesktop().should('be.visible')
    }

})

// [ REV. ]

// [ CELULAR PROTECTION ]

Then('cell protection pop up sample', () => {
    bs.protectionPopUp().should('be.visible')
})

Then('cierra pop up de protección celular', () => {
    bs.protectionPopUp().find('.icon-close').click()
})

// --- PDP ---

Then('visualize elements of the 3rd quadrant', () => {
    bs.pdpSku().should('be.visible')
    bs.pdpDetailProductClick()
    bs.pdpRatings()
    bs.pdpCarousel().should('be.visible')
    if (isStore('liverpool')) {
        bs.pdpOffersAndPromo()
    }
})

// --- EDD ---

When('select your state {string}', (value) => {
    if (isMobile()) {
        bs.eddStore().click()
        cy.contains('Estado').click()
        cy.get('.bt_select_state').click()
        cy.contains(value).click()
    } else {
        cy.wait(1000)
        bs.eddStoreDesktop().click()
        cy.contains('Estado').click()
        cy.wait(1000)
        cy.get('.bt_select_state > p').click()
        cy.contains(value).click()
    }
})

When('select store', () => {
    cy.get('[type="radio"]').not('.disablerideo').first().check({ force: true }).should('be.checked')
})

Then('shows delivery date for c&c', () => {
    cy.wait(1000)
    bs.eddClickAndCollect()
})

// --- Gift Registry ---

Then('does not show add to my gift table button', () => {
    generic.pdpVisible()
    cy.scrollTo('center')
    cy.contains('Agregar a mi mesa de regalos').should('not.exist')
})

Then('shows button add to my gift table', () => {
    generic.pdpVisible()
    cy.scrollTo('center')
    cy.contains('Agregar a mi mesa de regalos')
})

Then('verify that button is disabled', () => {
    bs.buyNowDom().find('.GeoBodyHead').should('have.class', 'disabled');
})

Then('the buy at home button is enabled', () => {
    cy.wait(500)
    bs.buyNowDom().find('.GeoBodyHead').should('not.have.class', 'disabled');
})

// Cross Selling

Then('shown Purchased together', () => {
    bs.crossSellingContainer().should('exist').and('be.visible')
})

Then('the main sku must be the first one shown in Bought Together', () => {
    bs.verifyFirstSkuCS()
})

Then('the other items in Bought Together are different from the first', () => {
    bs.verifySkusCS()
})

Then('name, price and link details are displayed Bought together', () => {
    bs.verifyElementosSkusCS()
})

Then('verify that participating skus are selected by default', () => {
    bs.verifyCheckSkusCS()
})

Then('select button Choose the details of a product', () => {
    bs.crossSellingContainer().find('.cross_selling_initial_link').last().click({ force: true })
})

Then('Modal is displayed with details of the selected products', () => {
    bs.modalContainerCS().should('exist').and('be.visible')
    generic.text("Elige los detalles")
    bs.modalContainerCS().find('.icon-close').click()
})

Then('the Aceptar button must be disabled', () => {
    bs.modalContainerCS().contains("Aceptar").should('be.disabled')
})

Then('select product size', () => {
    bs.selectSizeArtitlesCS()
})

Then('the Aceptar button must be enabled', () => {
    bs.modalContainerCS().contains("Aceptar").should('be.enabled')
})

Then('Each product must show image, name and attributes', () => {
    bs.verifyElementsSkusModalCS()
})

Then('quantity of products increases', () => {
    bs.selectQuantityArtitlesCS()
})

Then('click the x button in the modal', () => {
    bs.modalContainerCS().find('.icon-close').click()
})

Then('Variant information is displayed in the pdp', () => {
    bs.verifyElementsSaveSkusCS()
})

Then('There should be no information previously selected in Purchased Together', () => {
    bs.verifyElementosSkusCS()
})

Then('select 1 product in Bought together', () => {
    bs.checkSkusCS()
    if (isMobile()) {
        cy.contains("Agregar a mi bolsa").scrollIntoView().wait(500)
    }
    bs.checkOnlyFirstElementCS()
    bs.saveTotalCS()
    bs.checkOnlyOneElementCS()
})

Then('select only one variant in Bought Together', () => {
    bs.saveTotalCS()
    bs.checkSkusCS()
    bs.checkOnlyOneElementCS()
})

Then('the total price is updated', () => {
    bs.compareTotalCS()
})

Then('Products are deselected in Bought Together', () => {
    bs.checkSkusCS()
})

Then('choose product details', () => {
    bs.selectSizeArtitlesCS()
})

Then('the chosen product is selected', () => {
    bs.verifyCheckLastElement()
})

Then('verify the total information in Bought Together', () => {
    bs.compareTotalCS()
})

Then('verify that there are no filters', () => {
    bs.filterItems().then(($filters) => {
        assert.lengthOf($filters, 0);
    })
})

//modal promos
Then('select payment options', () => {
    bs.promosButton().click({ force: true })
})

Then('verify texts inside the modal', () => {
    bs.promosModalHeader().contains('Formas de pago')
    bs.promosModalBody().find(':nth-child(1)').contains('Tarjetas ')
    bs.promosModalBody().find(':nth-child(1)').contains('* Las mensualidades se calculan sobre el precio final.')
})

Then('verify internal cards section promotions', () => {
    //precio mensual
    bs.promosModalBody().find('.info-promotions-detail__prices__amount').should('exist')
    //msi
    bs.promosModalBody().find('.info-promotions-detail__description__title').should('exist')
    //precio total final
    bs.promosModalBody().find('.info-promotions-detail__prices__total-amount').should('exist')
})

Then('verify title {string} inside the modal', (titulo) => {
    bs.promosModalBody().contains(titulo).should('exist')
})

Then('verify internal card icons', () => {
    let srcTarjeta;
    if(isStore("suburbia")){
        srcTarjeta = 'assets.suburbia.com.mx'
    }else{
        srcTarjeta = 'assetspwa.' + store + '.com.mx'
    }
    bs.promosModalBody().find(':nth-child(1)').find('[src="https://' + srcTarjeta + '/static/images/monederos/suburbia/suburbia_departamental.svg"]').should('exist')
    bs.promosModalBody().find(':nth-child(1)').find('[src="https://' + srcTarjeta + '/static/images/monederos/suburbia/suburbia_visa.svg"]').should('exist')
    bs.promosModalBody().find(':nth-child(1)').find('[src="https://' + srcTarjeta + '/static/images/monederos/dilisa/dilisa.svg"]').should('exist')
    bs.promosModalBody().find(':nth-child(1)').find('[src="https://' + srcTarjeta + '/static/images/monederos/dilisa/dilisa_rosa.svg"]').should('exist')
})

Then('verify section elements Other payment methods', () => {
    let srcTarjeta;
    if(isStore("suburbia")){
        srcTarjeta = 'assets.suburbia.com.mx'
    }else{
        srcTarjeta = 'assetspwa.' + store + '.com.mx'
    }
    //paypal
    bs.promosModalBody().find(':nth-child(4)').find('[src="https://' + srcTarjeta + '/static/images/atomo-icono-paypal.svg"]').should('exist')
    //SPEI
    bs.promosModalBody().find(':nth-child(4)').find('[src="https://' + srcTarjeta + '/static/images/icons/payment/100_transferencia.svg"]').should('exist')
})

Then('verify section elements External Cards', () => {
    let srcTarjeta;
    if(isStore("suburbia")){
        srcTarjeta = 'assets.suburbia.com.mx'
    }else{
        srcTarjeta = 'assetspwa.' + store + '.com.mx'
    }
    //visa
    bs.promosModalBody().find(':nth-child(2)').find('[src="https://' + srcTarjeta + '/static/images/icons/payment/16_visa.svg"]').should('exist')
    //master card
    bs.promosModalBody().find(':nth-child(2)').find('[src="https://' + srcTarjeta + '/static/images/myAccount/mastercard_logo.svg"]').should('exist')
    //msi
    bs.promosModalBody().find(':nth-child(2)').find('.info_promotions_other_cards_label').should('exist')
})

Then('verify closure of the modal breakdown of promotions', () => {
    bs.promosModalBody().should('exist').and('be.visible')
    bs.promosModalHeader().find('button.close > .icon-close').click()
    bs.promosModalBody().should('not.exist')
})

Then('verify the payment options link', () => {
    bs.promosButton().should('exist').and('be.visible')
})

Then('verify that the payment options link is not visible', () => {
    bs.promosButton().should('not.exist')
})

Then('select first result', () => {
    cy.wait(1000)
    bs.specialPromoFilter().then(($promo) => {
        const promoText = $promo.text()
        cy.wrap(promoText).as('filter')
    
    })
    bs.product().first().click({force:true})
    
})

Then('valid persistence of the promotion', () => {
    cy.get('@filter').then(($text) => {
        cy.get('.o-product__description').contains($text)
    })  
})

Then('valid promo tags', () => {
    bs.product().should('exist')
})

Then('validates the existence of the flag {string}', (bandera) => {
    cy.get('.m-flag-item').should('include.text', bandera)
})

Then('I select the other sellers button', () => {
    bs.anotherSellers().scrollIntoView().wait(500).click()
})

Then('click on the seller of a product', () => {
    bs.seller().click({force:true})
})

Then('twitter button update', () => {
    bs.xIcon().contains('X').should('be.visible')
})

// [ END ]
