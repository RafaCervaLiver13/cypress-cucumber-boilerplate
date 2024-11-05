/// <reference types="cypress" />

import { isMobile, isStore } from "./genericPage"

let addressName, newAddress, newPayment, selectedStore, priceUnit, offer, minimumQty

class opcPage {

    // [ REV. ]

    addressName() {
        cy.get('.mainLoader').should('not.be.visible')
        cy.wait(500)
        // get shipping address name
        if (isMobile) {
            cy.get('.opc_address-detail-font').then(($address) => {
                addressName = $address.text()
                cy.log(addressName)
            })
        }
    }

    changeDelivery() {
        return cy.get('#opc_addressButton_select > .a-box__accordionIcon > .text-shutdown-card').contains('Cambiar')
    }

    deliveryAddress() {
        return cy.get('#opc_deliveryAddress')
    }

    waitLoader() {
        cy.get('.mainLoader').should('not.be.visible')
    }

    // [ Legal advise Nuevo León ]

    deleteFirstItem() {
        cy.intercept('POST', '/couponList').as('wait');
        cy.get('.menuMotion').first().click()
        cy.get('.dropdown-menu').first().contains('Eliminar').click()
        cy.wait('@wait')
        cy.get('.mainLoader').should('not.be.visible')
    }

    deleteLastItem() {
        if (isMobile()) {
            cy.get('.menuMotion').last().click()
            cy.get('.dropdown-menu').last().contains('Eliminar').click({ force: true })
            cy.contains('La forma de pago seleccionada no aplica para la compra de este artículo, por favor elige otro método.').parents('#opc_productsContainer >').find('.icon-more_vert').click()// Look for the text inside the div
            cy.get('.dropdown-menu.show').contains('Eliminar').click({ force: true })
        } else {
            cy.get('button:contains("Eliminar")').last().click({ force: true })
            cy.get('.mdc-snackbar-absolute > .m-mdc__snackbarSurface').contains('Se actualizó tu método de pago y promoción')
            cy.contains('La forma de pago seleccionada no aplica para la compra de este artículo, por favor elige otro método.').parents('#opc_productsContainer >').find('button').contains('Eliminar').click()
        }
    }

    finishOrder() {
        return cy.get('body').then(($body) => {
            if ($body.find('#submitForOther').length > 0) {
                return cy.get('#submitForOther')
            } else {
                return cy.get('#submitForPaypal')
            }
        })
    }

    checkAge() {
        return cy.get('.onePageCheckout-deliveryAddress-detail .a-checkbox__input')
    }

    // [ LEGAL MOTOS ]

    legalMoto() {
        return cy.get('#opc_section-deliAddress_event_legalMoto')
    }

    // [ END ]

    addressDetail() {
        return cy.get('.onePageCheckout-deliveryAddress-detail')
    }

    deliveryNameNotEqual() {
        cy.get('.mainLoader').should('not.be.visible')
        cy.wait(750)
        cy.get('#opc_section-deliAddress .opc_addressButton_select_address').then(($address) => {
            const deliveryName = $address.text()
            expect(deliveryName).to.not.equal(addressName)
        })
    }

    deliveryCCNameEqual() {
        cy.get('.mainLoader').should('not.be.visible')
        cy.wait(500)
        cy.get('#opc_addressButton_select').then(($address) => {
            const deliveryName = $address.text()
            expect(deliveryName).to.include(newAddress)
        })
    }



    menuThreePoints() {
        return cy.get('.icon-more_vert')
    }

    itemMenuSelect(value) {
        return cy.get('.dropdown-menu').contains(value)
    }

    opcOverview() {
        return cy.get('.m-breakdownExpenses')
    }

    // --- Delivery Address Page ---

    deliveryAddressRadio() {
        return cy.get('#opc_homeDelivery [type="radio"]')
    }

    deliveryCCbutton() {
        return cy.get('#opc_modal_storeButton')
    }

    opcFavoriteStores() {
        return cy.get('.opc_store-delivery-addresses')
    }

    addAddress() {
        return cy.get('#opc_addNewAddress__button > .a-btn')
    }

    addAddressDesktop() {
        return cy.get('.opc_addressContinueModal > :nth-child(1) >')
    }

    menuAddressThreePoints() {
        return cy.get('.menuMotion > > .icon-more_vert')
    }

    menuAddressThreePointsDefault() {
        return cy.contains('Predeterminada').find('.m-redirectIconContainer > > > .icon-more_vert')
    }

    saveNameStore() {
        cy.get('.step1AddressOptions.show >').parents('.opc_store-delivery-addresses_align-items > .align-items-center').children().first().within(($name) => {
            selectedStore = $name.text()
            cy.log(selectedStore)
        })
    }

    menuAddressThreePointsToAzar() {
        cy.get('.menuMotion > #address0 > .icon-more_vert').then(($items) => {
            const item = $items.toArray()
            const ele = Cypress._.sample(item)
            ele.scrollIntoView()
            ele.click({ force: true })
            cy.get('.step1AddressOptions.show >').parents('.pc_pickup__addStore--store--container > .align-items-center').children().first().within(($name) => {
                selectedStore = $name.text()
                cy.log(selectedStore)
            })
        })
    }

    menuAddressThreePointsCreditCardToAzar() {
        cy.get('.m-redirectIconContainer > > > .icon-more_vert').then(($items) => {
            const item = $items.toArray()
            const ele = Cypress._.sample(item)
            ele.scrollIntoView()
            ele.click({ force: true })
        })
    }

    menuAddressThreePointsGift() {
        return cy.contains('Casa').parents('#opc_homeDelivery >').find('.menuMotion > #address0 > .icon-more_vert')
    }

    menuAddressOption(value) {
        return cy.get('.menuMotion > .step1AddressOptions >').contains(value)
    }

    addressShortName(value) {
        newAddress = value + Math.floor(Math.random() * 100)
        //cy.get('[name="shortName"]').type(newAddress)
        cy.get('#addressChain-alias').type(newAddress)
    }

    typeFirstName(value) {
        cy.get('[name="firstName"]').type(value)
    }

    typeLastName(value) {
        cy.get('[name="lastName"]').type(value)
    }

    typeZip(value) {
        cy.get('#addressChain-zipCode, .d-xl-none [nameinput="CódigoPostal"]').type(value)
        //cy.get('[name="postalCode"]').first().type(value)
    }

    typeZipDesktop(value) {
        cy.get('[name="postalCode"]').last().type(value)
    }

    typeCity(value) {
        cy.get('[name="city"]').type(value)
    }

    typeStreet(value) {
        cy.get('[name="street"]').first().type(value)
    }

    typeStreetDesktop(value) {
        cy.get('[name="street"]').last().type(value)
    }

    typeNoExt(value) {
        cy.get('[name="noExt"]').first().type(value)
    }

    typeNoExtDesktop(value) {
        cy.get('[name="noExt"]').last().type(value)
    }

    typeCellPhone(value) {
        cy.get('[name="cellphone"]').type(value)
    }

    typeLada(value) {
        cy.get('[name="LADA"]').type(value)
    }

    typePhone(value) {
        cy.get('[name="phone"]').type(value)
    }

    typeStateText(value) {
        cy.get('[name="stateText"]').first().type(value)
    }

    typeStateTextDesktop(value) {
        cy.get('[name="stateText"]').last().type(value)
    }

    typeMunicipalityText(value) {
        cy.get('[name="municipalityText"]').first().type(value)
    }

    typeMunicipalityTextDesktop(value) {
        cy.get('[name="municipalityText"]').last().type(value)
    }

    typeState() {
        cy.get('[name="country"]').select(Math.floor(Math.random() * 32))
    }

    typeMunicipality() {
        cy.get('[name="municipality"]').select(1)
    }

    typeColony() {
        cy.get('[name="colony"]').select(1)
    }

    typeColonyText(value) {
        cy.get('[name="colonyText"]').first().type(value)
    }

    typeColonyTextDesktop(value) {
        cy.get('[name="colonyText"]').last().type(value)
    }

    clearCampsOpc() {
        cy.wait(1000)
        cy.get('[name="nickName"]').clear({ force: true })
        cy.wait(1000)
        cy.get('[name="fullNameUser"]').clear({ force: true })
        cy.get('[name="postalCode"]').first().clear({ force: true })
        cy.get('[name="street"]').first().clear({ force: true })
        cy.get('[name="noExt"]').first().clear({ force: true })
    }

    clearCampsOpcDesktop() {
        cy.get('[name="nickName"]').clear({ force: true })
        cy.wait(500)
        cy.get('[name="fullNameUser"]').clear({ force: true })
        cy.get('[name="postalCode"]').last().clear({ force: true })
        cy.get('[name="street"]').last().clear({ force: true })
        cy.get('[name="noExt"]').last().clear({ force: true })
    }

    lada() {
        return cy.get('[name="LADA"]')
    }

    phone() {
        return cy.get('[name="phone"]')
    }

    addressFindDelete() {
        cy.wait(1000)
        cy.contains(newAddress).parent().within(($name) => {
            cy.log($name)
            cy.get('.menuMotion > #address0 > .icon-more_vert').click()
            cy.contains('Eliminar').click()
        })
    }

    addressClose() {
        return cy.get('button.close > .icon-close').first().click()
    }

    // --- Delivery C&C ---

    addressCCName() {
        return cy.get('.opc_store-delivery-name').first().then(($cc) => {
            newAddress = $cc.text()
            cy.log(newAddress)
        })
    }

    // --- Gift registry ---

    giftSearchButtonOpc() {
        return cy.get('.button-sticky-modal-gr > .a-btn')
    }

    giftSearchButton() {
        //return cy.get('[name="findGiftTableByCode"] > #findGiftTable')
        return cy.get('.button-sticky-modal-gr > .a-btn')
    }

    /* Eliminar posteriormente
    giftSearchResults() {
        return cy.get('.o-resultGiftTable__items')
    }


    giftSelectCelebrated() {
        return cy.get('.o-selectCelebrated__backPanelMyBag > .o-selectCelebrated__body [type="radio"]')
    }
    */

    giftSelectCelebratedOpc() {
        //return cy.get('.o-selectCelebrated__backPanelMyBag > .o-selectCelebrated__body [type="radio"]')
        return cy.get('.gr-FormData .col-1 [type="radio"]')
    }

    giftMessage() {
        return cy.get('#textarea')
    }

    // --- Promotions ---

    promoContainer() {
        return cy.get('.product-card-container > .product-promotion')
    }

    promoList() {
        return cy.get('.a-checkout_promoList >')
    }

    // --- Formas de pago ---

    paymentDetail() {
        return cy.get('#opc_paymentMethod')
    }

    paymentChange() {
        return cy.get('#opc_paymentMethod').contains('Cambiar')
    }

    addPayment() {
        return cy.get('#opc_payments-container .a-btn--onePageCheckout')
    }

    paymentPaypal() {
        return cy.get('.d-inline-flex > :nth-child(2)')
    }

    paymentMoneyTranfer() {
        return cy.contains('Efectivo y Transferencias')
    }

    paymentNickName(value) {
        newPayment = value + Math.floor(Math.random() * 1000)
        cy.get('[name="nickName"]').type(newPayment)
    }

    typePaymentFullName(value) {
        cy.get('[name="fullNameUser"]').type(value)
    }

    typePaymentCard(value) {
        cy.get('[name="cardNumber"]').type(value + Math.floor(10000000 + Math.random() * 89999999))
    }

    typePaymentCardExp(value) {
        cy.get('#opc_o-addNewCardForm .m-fullInfoContainer--column [name="cardExp"]').type(value, { force: true })
    }

    typeCardExp() {
        return cy.get('#opc_mycvvrequired [name="cardExp"]').first()
    }

    typeCardExpDesktop() {
        return cy.get('#cardExp').first()
    }

    typeCvv() {
        return cy.get('#opc_mycvvrequired [name="cvv"]').first()
    }

    typeCvvDesktop() {
        return cy.get('#cvv').first()
    }

    setcvv(cvv) {
        cy.get('#cvv').type(cvv)
    }

    verifyConfirmPurchase() {
        cy.get('#order-confirmation-page').should('exist')
        cy.get('.confirmation-section').should('exist')
        cy.get('.confirmation-section').contains('gracias por comprar').should('exist')
    }

    selectPurchase() {
        cy.get('.row > .col-sm-10').contains('Pedido confirmado').click()
    }

    cancelPurchase() {
        cy.get('.row > .icon-arrow_right').click()
    }

    verifyCancelPurchase() {
        cy.get('.cancel-order').should('exist')
        cy.get('.cancel-order-message > .mdc-snackbar > .m-mdc__snackbarSurface > .m-mdc__snackbarLabel').should('exist').and('be.visible')
    }

    pushContinuar() {
        cy.get('.a-btn').click()
    }

    typePaymentCvv(value) {
        cy.get('#opc_o-addNewCardForm .m-fullInfoContainer--column [name="cvv"]').type(value, { force: true })
    }

    existPromo() {
        cy.get('.mainLoader').should('not.be.visible')
        cy.get('body').then(($body) => {
            if ($body.find('.a-btn > .icon-arrow_right').length > 0) {
                cy.get('.a-btn > .icon-arrow_right').click()
                cy.contains('meses').should('not.exist')
            } else {
                cy.get('.a-btn > .icon-arrow_right').should('not.exist')
            }
        })

    }

    verifyOptionDelete() {
        cy.get('.step1AddressOptions.dropdown-menu.show').contains('Eliminar').should('not.exist')
    }

    selectOptionThreePoints(option) {
        if (option != "Agregar a mis direcciones") {
            this.saveNameStore()
        }
        cy.get('.step1AddressOptions.show>').contains(option).click({ force: true })
    }

    selectOptionThreePointsCreditCard(option) {
        cy.get('.dropdown-menu.show').contains(option).click({ force: true })
    }

    existStore() {
        cy.contains(selectedStore).scrollIntoView().should('be.visible')
    }

    deleteStore() {
        cy.get('.opc_store-delivery-addresses_align-items').contains(selectedStore).parents(".d-flex.justify-content-between.align-items-center.mb-2").within(($name) => {
            cy.get('.icon-more_vert').click()
            cy.contains('Eliminar').click()
        })
    }

    verifyStoreSelected() {
        cy.contains("Predeterminada").contains(selectedStore)
    }

    verifyNewPayment() {
        cy.contains(newPayment)
    }

    elementsToMenuThreePointsFormToPay() {
        return cy.get('.dropdown-menu.show >')
    }

    cardOpc() {
        cy.get('.col-lg-12').first().find('.menuMotion > > .icon-more_vert').should('not.exist')
    }

    totalCostVerify(qty) {
        cy.get('.col-12 > .a-product__paragraphDiscountPrice').then(($name) => {
            priceUnit = $name.text().replace(/[$,]/g, "").replace("  ", "").replace("  ", ".")
            let price = parseFloat(qty * priceUnit).toFixed(2)
            cy.get('.bloquePrecio_titulo_precio').should($title => {
                const op2 = $title.text().replace(/[$,]/g, "").trim()
                expect(op2).to.eq(price)
            })
        })
    }

    saveTotalCost() {
        //cy.get('.sticky_myBag_right--price').then(($name) => {
        cy.get('.bloquePrecio_titulo_precio').then(($name) => {
            priceUnit = $name.text()
            cy.wrap(priceUnit).as('priceUnit')
        })
    }

    verifyDifferenceCost() {
        cy.log(cy.get('@priceUnit'))
        cy.get('@priceUnit').then(txt => {
            cy.scrollTo('top')
            cy.get('.bloquePrecio_titulo_precio').should('not.have.text', txt)
        })
    }
    increaseQty() {
        cy.get('.col-12 > .m-product__qty').find(':nth-child(3) > .a-btn').scrollIntoView().click({ force: true })
        cy.wait(2000)
    }

    decreaseQty() {
        //cy.scrollTo('center')
        cy.get('.col-12 > .m-product__qty > .row > :nth-child(1) > .a-btn').click({ force: true })
        cy.wait(2500)
    }

    trashElement() {
        return cy.get('.col-12 > .m-product__qty >').find('.a-header__strongLink')
    }

    trashElementDesktop() {
        return cy.get('.d-none > .m-product__qty > .row > :nth-child(1) > .a-btn')
    }

    itemQty(value) {
        cy.get('.col-12').find("#mainSearchbar").clear().type(value + '{enter}')
        cy.wait(2500)
        //cy.get('.col-12').find("#mainSearchbar").type(value)
        //cy.wait(1000)
    }

    itemQtyDesktop(value) {
        cy.get('.d-none').find("#mainSearchbar").clear().type(value + '{enter}')
        cy.wait(2500)
    }

    increaseQtyDesktop() {
        cy.get('.d-none >.m-product__qty').find(':nth-child(3) > .a-btn').click({ force: true })
        cy.wait(2000)
    }

    decreaseQtyDesktop() {
        cy.get('.d-none > .m-product__qty').find(':nth-child(1) > .a-btn').scrollIntoView().click({ force: true })
        cy.wait(2000)
    }

    buttonDeleteElement() {
        cy.get('.a-btn > .a-header__strongLink').last().click()
    }

    compareTotalSubTotal() {
        cy.get('@priceUnit').then(txt => {
            cy.get(':nth-child(1) > .m-breakdownExpenses__quantity > :nth-child(1) > .a-inlineElement').should($title => {
                const op2 = $title.text().replace(/[$,]/g, "").trim()
                const tempPrice = txt.replace(/[$,]/g, "").trim()
                expect(parseFloat(op2)).to.greaterThan(parseFloat(tempPrice))
            })
        })
    }

    selectCountry(value) {
        cy.get('#country').select(value)
    }

    selectCountryDesktop(value) {
        cy.get('.mdc-select__native-control#country').last().select(value)
    }

    yourAddressAndCC() {
        cy.get('#opc_addressButton').should('be.visible')
        cy.get('#opc_addressCCButton').should('be.visible')
    }

    elementsWayToPay() {
        cy.get('#opc_selectCC').should('be.visible')
        cy.get('#opc_selectPP').should('be.visible')
        cy.get('#opc_selectC').should('be.visible')
    }

    elementToArticle() {
        cy.get('#opc_productsContainer > .m-box').should('be.visible')
    }

    typePay(pay) {
        if (pay == "Pago en efectivo") {
            cy.get('#billingCASH').check({ force: true })
        } else {
            cy.get('#billingSPEI').check({ force: true })
        }
    }

    payMethod() {
        return cy.get('#opc_section-PayMethod')
    }

    selectPayPredeterminate(method) {
        cy.get('.mainLoader').should('not.be.visible')
        if (method == "Pago en efectivo") {
            cy.get("#cashOptions").find(".icon-more_vert").click({ force: true })
        } else {
            cy.get("#speiOptions").find(".icon-more_vert").click({ force: true })
        }
        cy.get(".dropdown-menu.show").contains("Marcar como predeterminado").click({ force: true })
    }

    verifySkuElements() {
        cy.get('.a-checkout__imageProduct').should('be.visible')
        cy.get('.opc_MproductDescWAP').should('exist')
        cy.get('.a-checkout__descriptionProduct > .product-descriptions').should('exist')
        cy.get('.opc_MproductDescWAP > .col-12').should('exist')
    }

    selectBoxOffers() {
        if (isStore('suburbia')) {
            cy.get('.m-product__giftRegistry-container > .a-btn').click({ force: true })
        } else {
            cy.intercept('/summary').as('waitPage')
            cy.get('.a-btn > .icon-arrow_right').click({ force: true })
            cy.wait('@waitPage')
        }
    }

    modalOffers() {
        return cy.get('.modal-content')
    }

    verifyAllOffers() {
        this.selectBoxOffers()
        this.modalOffers().find('.a-checkout_promoList >').each(($offer) => {
            offer = ""
            offer = $offer.text()
            cy.get('.a-checkout_promoList >').contains(offer).wait(750).click({ force: true })
            offer = $offer.text().split('.00')[1]
            if (offer == "cuenta corriente externas") {
                offer = "De contado"
            }
            cy.wait(1500)
            cy.scrollTo(0, 600).wait(1500)
            cy.get('.m-product__giftRegistry-container > .a-btn').contains(offer).should('be.visible')
            this.selectBoxOffers()
        })
    }

    verifyPredeterminate(method) {
        if (method == "Pago en efectivo") {
            cy.get("#cashOptions").contains("Predeterminada").should('be.visible')
        } else {
            cy.get("#speiOptions").contains("Predeterminada").should('be.visible')
        }
    }



    messageCyC() {
        return cy.get('.a-box__radioSuccessAlert')
    }

    // --- Warranty ---

    minusQty() {
        return cy.get('.opc-garantia-sku .opc_MproductDescWAP .-minus')
    }

    minusQtyDesktop() {
        return cy.get('.opc-garantia-sku .p-lg-3 .-minus')
    }

    disabledQtyButton() {
        return cy.get('.opc-garantia-sku .pl-0 .disable-btn-mkp ')
    }

    disabledQtyWarrantyOpc() {
        return cy.get('.opc-garantia-sku .disable-btn-mkp')
    }

    /*
    deleteWarranty() {
        cy.get('.col-10 > .a-btn').click({ force: true })
    }
    */

    menu3pointWarranty() {
        return cy.get('.opc-garantia-sku > .product-card-container .icon-more_vert')
    }

    deleteWarranty() {
        cy.get('.a-checkout_promoList > :nth-child(2) [type="radio"]').check()
        cy.get('.col-12 > .a-btn').click({ force: true })
    }

    cancelAddDirection() {
        cy.get('.modal-header > .icon-back').click()
    }

    // --- Minimum purchase ---

    minimumPurchasePdp() {
        cy.get('.Container__pieces').then(($mp) => {
            const minimumPurchase = $mp.text().trim() // Trim to remove any leading/trailing spaces
            const qty = minimumPurchase.split(' ')[2] // Split by space and get the third element (index 2)
            cy.log(qty)
            // set minimum
            cy.get('.o-product__description').scrollIntoView().wait(500)
            cy.get('#a-stickyBarPdp__inputQty').clear({ force: true }).type(qty, { force: true });
        })
    }

    finishPurchaseEnabled() {
        cy.get('body').then(($body) => {
            if ($body.find('#submitForOther').length > 0) {
                cy.get('#submitForOther').should('be.enabled')
            } else {
                cy.get('#submitForPaypal').should('be.enabled')
            }
        })
    }

    minimumPurchaseChk() {
        cy.get('.a-checkout__minimunPurchase').then(($mp) => {
            const minimumPurchase = $mp.text().trim()
            const qty = minimumPurchase.split(' ')[2]
            cy.log(qty)
            // set minimum
            cy.get('#opc_productsContainer > .m-box').scrollIntoView().wait(500)
            if (isMobile) {
                cy.get('#opc_productsContainer > .m-box').find('.m-stickyBar__qtyInputs-OCP > #mainSearchbar').first().clear({ force: true }).type(qty);
            } else {
                cy.get('#opc_productsContainer > .m-box').find(".d-none").find('#mainSearchbar').clear({ force: true }).type(qty);
            }
        })
    }

    warningMinumPurchase() {
        cy.contains('La forma de entrega seleccionada requiere la compra de una cantidad mínina de piezas.')
            .should('not.exist')
    }

    shippingWarningMinimumPurchase(value) {
        cy.contains(value)
    }

    msgMinimumPurchase() {
        return cy.get('.col-12 > .a-checkout__minimunPurchase')
    }

}

export default opcPage;
