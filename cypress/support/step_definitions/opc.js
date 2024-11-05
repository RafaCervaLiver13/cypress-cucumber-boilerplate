import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import opcPage from "../pages/opcPage.js"
import topupPage from '../pages/topupPage'
import genericPage, { isMobile } from "../pages/genericPage.js"

const opc = new opcPage()
const generic = new genericPage()

const ar = new topupPage()
let store = Cypress.env('STORE');

// [ REV. ]

When('select change delivery', () => {
    cy.get('body').then(($body) => {
        if ($body.find('.a-onepagecheckout_currentDeliveryType').length > 0) {
            opc.addressName()
        }
        opc.changeDelivery().click()
    })
})

When('select button click & collect', () => {
    opc.deliveryCCbutton().click()
})

When('select an address from the state {string}', (estado) => {
    cy.contains(estado).click()
    generic.button("Continuar").click({ force: true })
    opc.waitLoader()
})

Then('shows delivery address', () => {
    opc.addressDetail().should('be.visible')
    opc.deliveryAddress().should('be.visible')
})

Then('actualiza dirección entrega', () => {
    opc.deliveryAddressRadio().last().check({ force: true }).should('be.checked')
})

Then('update default address', () => {
    opc.menuAddressThreePoints().first().click()
    opc.menuAddressOption('Marcar como predeterminada').click()
    cy.wait(1000)
})

Then('delivery address must be different', () => {
    opc.deliveryNameNotEqual()
})

// [ Delivery Click & Collect ]

Then('choose tab select a store', () => {
    //cy.get('#opc_addStore__button > .a-btn').click()Agregar tienda
    cy.contains('Selecciona una tienda').click()
})

Then('select state {string}', (estate) => {
    cy.get('[name="state"]').select(estate)
})

Then('select state randomly', () => {
    const selected = Math.floor(Math.random() * 32)
    cy.get('[name="state"]').select(selected)
})

Then('select first click & collect option', () => {
    opc.addressCCName()
    generic.radioButton().first().click()
    generic.button('Continuar').click()
})

Then('click & collect address is the same as the one selected', () => {
    cy.wait(2000)
    opc.deliveryCCNameEqual()
})

Then('mark as default option is visible', () => {
    opc.menuAddressThreePoints().first().click()
    opc.menuAddressOption('Marcar como predeterminada').should('be.visible')
})

// [ Legal advise Nuevo León ]

Then('no legal notice shown for wines and spirits', () => {
    opc.deliveryAddress().should('not.contain', 'Aviso Legal')
})

When('remove first item in OPC', () => {
    opc.deleteFirstItem()
})

When('remove last item in OPC', () => {
    opc.deleteLastItem()
})

Then('check disabled button finish purchase', () => {
    opc.waitLoader()
    opc.finishOrder().should('be.disabled')
})

Then('verify enabled button finish purchase', () => {
    opc.waitLoader()
    opc.finishOrder().should('be.enabled')
})

Then('select check on verify your age', () => {
    opc.checkAge().check()
})

// [ LEGAL MOTOS ]

Then('does not show legal notice', () => {
    opc.legalMoto().should('not.exist')
})

// [ END ]

Then('view favorite stores', () => {
    opc.opcFavoriteStores().should('be.visible')
})

Then('select option en dropdown {string}', (option) => {
    if (isMobile()) {
        opc.menuThreePoints().click()
        opc.itemMenuSelect(option).click()
    }
    else {
        cy.scrollTo('bottom')
        cy.contains(option).click({ force: true })
    }
})

Then('select {string} in item quantity', (value) => {
    opc.saveTotalCost()
    if (isMobile()) {
        cy.get('button').contains(value).click()
    } else {
        opc.increaseQtyDesktop()
    }
    cy.wait(1000)
})

Then('check quantity different than 1', () => {
    cy.get('.mainLoader').should('not.be.visible')
    cy.wait(500)
    cy.get('.d-none > > > > .a-ProductQty__input').invoke('val').then(($qty) => {
        cy.log($qty)
        expect(parseInt($qty)).not.equal(1)
    })
})

Then('check option {string}', (option) => {
    if (isMobile()) {
        opc.menuThreePoints().click()
        opc.itemMenuSelect(option).should('be.visible')
    }
    else {
        cy.scrollTo('bottom')
        cy.contains(option).should('exist')
    }
})

Then('check purchase summary', () => {
    opc.opcOverview().scrollIntoView().contains('Subtotal').should('be.visible')
    opc.opcOverview().contains('Descuento:').should('be.visible')
    opc.opcOverview().contains('Cupones:').should('be.visible')
    opc.opcOverview().contains('Costo de envío:').should('be.visible')
    opc.opcOverview().contains('Total (IVA incluido):').should('be.visible')
})

// --- Promotions ---

Then('View available promotions', () => {
    opc.promoContainer().first().click()
    opc.promoList().should('be.visible')
})

// --- Delivery address ---

Then('select add another address', () => {
    if (isMobile()) {
        opc.addAddress().click({ force: true })
    } else {
        opc.addAddressDesktop().click({ force: true })
    }

})

Then('add recipient details', () => {
    // Datos del destinatario
    opc.typeFirstName('Mario')
    opc.typeLastName('Perez')

    // Dirección de envío
    opc.addressShortName('Random')
    opc.typeZip('05348')
    opc.typeCity('CDMX')
    opc.typeStreet('Mario Pani')
    opc.typeNoExt('200')
    opc.typeCellPhone('5512345678')
    //opc.typeLada('555')
    opc.typePhone('5512345678')
})

Then('select checkbox mark as default', () => {
    cy.get('.modal-body [type=checkbox]').check()
})

Then('add wrong cp {string}', (value) => {
    cy.get('[name="zipCode"]').type(value)
    cy.wait(1000).get('#opc_selectAddressModal > .-toTop > .m-mdc__snackbarSurface > .m-mdc__snackbarActions > .icon-close').click({ force: true })
})

Then('removes previously added delivery address', () => {
    opc.addressFindDelete()
    generic.button('Aceptar').click()
    opc.addressClose()
    cy.wait(2000)
})

// --- Gift registry ---

Then('select button search in modal', () => {
    opc.giftSearchButton().click()
})

Then('select button search in modal from opt', () => {
    opc.giftSearchButtonOpc().click()
})

/* Eliminar si es que ya no falla el step from opt
Then('selectevento e invitados', () => {
    opc.giftSearchResults().first().click()
    opc.giftSelectCelebrated().last().check({force: true})
})
*/

Then('select event and guests from opt', () => {
    opc.giftSelectCelebratedOpc().last().check({ force: true })
})

Then('write message {string}', (text) => {
    opc.giftMessage().type(text)
})

Then('check event number', () => {
    cy.get('.a-checkout__descriptionProduct').contains('Número de evento').should('exist')
})

Then('select I dont want to give away anymore', () => {
    if (isMobile()) {
        opc.menuThreePoints().click()
        opc.itemMenuSelect('Ya no quiero regalar').click()
    }
    else {
        cy.wait(2000)
        cy.scrollTo('bottom')
        cy.get('.m-latestinlineElement > .a-inlineElement').click({ force: true })
    }
    cy.get('#dontGiftTable').click()
})

Then('does not show event number', () => {
    cy.get('.a-checkout__descriptionProduct').contains('Número de evento').should('not.exist')
})

// --- Formas de pago ---

Then('verify that payment method is shown', () => {
    opc.paymentDetail().should('be.visible')
})

// step only to change payment method
Then('select option change payment method', () => {
    cy.get('.mainLoader').should('not.be.visible')
    opc.paymentChange().scrollIntoView().wait(500).click({ force: true })
})

Then('select change payment method', () => {
    cy.get('.mainLoader').should('not.be.visible')
    cy.get('body').then(($body) => {
        if ($body.find('.onePageCheckout-deliveryAddress-detail').length > 0) {
            opc.paymentChange().scrollIntoView().wait(500).click({ force: true })
        } else {
            opc.paymentChange().click()
            cy.get('.mainLoader').should('not.be.visible')
            cy.contains('Tarjetas').click()
            cy.get('[type="radio"]').first().click()
            cy.contains("Continuar").scrollIntoView().wait(500).click({ force: true, multiple: true })
            cy.wait(1000)
            opc.paymentChange().click({ force: true })
        }
    })
})

Then('select add card', () => {
    cy.wait(500)
    opc.addPayment().click({ force: true })
})

Then('add card details', () => {
    // Datos de la tarjeta
    opc.paymentNickName('Random')
    opc.typePaymentFullName('Adebayor')
    opc.typePaymentCard('45328596')
    opc.typePaymentCardExp('0128')
    opc.typePaymentCvv('123')
})

// 👌 deletes only visa cards
Then('select delete card', () => {
    cy.get('.m-infoContainer__textContainer > .image-card[alt="Visa"]').last()
        .parents('.o-singleCardInfo')
        .find('.menuMotion').click();
    cy.wait(500)
    cy.get('.menuMotion > .dropdown-menu').contains('Eliminar').click({ force: true })
    generic.button('Aceptar').click()
    cy.intercept('POST', '/getcreditcards').as('deleteCard')
    cy.wait('@deleteCard').its('response.statusCode').should('eq', 200)
})

Then('select default card', () => {
    cy.get('.credit-cards .menuMotion > #address1 > .icon-more_vert').last().click()
    cy.wait(500)
    cy.get('.menuMotion > .dropdown-menu').last().contains('Seleccionar como predeterminada').click()
})

Then('select paypal as payment method', () => {
    opc.paymentPaypal().click()
    generic.button('Continuar').should('be.visible')
})

Then('select cash as payment method', () => {
    opc.paymentMoneyTranfer().click()
    generic.button('Continuar').click()
})

Then('verify that it does not show the other promotions', () => {
    opc.existPromo()
})

Then('select the three dot menu', () => {
    cy.wait(1000)
    opc.menuAddressThreePoints().first().click({ force: true })
})

Then('select the three dot menu by default', () => {
    opc.menuAddressThreePointsDefault().click()
})

Then('select the three dot menu at random', () => {
    opc.menuAddressThreePointsToAzar()
})

Then('select the three point table menu', () => {
    cy.wait(1000)
    opc.menuAddressThreePointsGift().click({ force: true })
})

Then('select the three dot menu at random tarjeta credito', () => {
    opc.menuAddressThreePointsCreditCardToAzar()
})

Then('verify that it does not show the Delete option', () => {
    opc.verifyOptionDelete()
})

Then('select option within three dots {string}', (option) => {
    opc.selectOptionThreePoints(option)
})

Then('select option within three dots {string} tarjeta credito', (option) => {
    opc.selectOptionThreePointsCreditCard(option)
})

Then('verify that it exists in favorite stores', () => {
    opc.existStore()
})

Then('delete favorite store', () => {
    opc.deleteStore()
})

Then('verify that the store has been selected as default', () => {
    opc.verifyStoreSelected()
})

Then('verify that only shows Edit', () => {
    opc.elementsToMenuThreePointsFormToPay().contains('Editar')
})

Then('select state, delegation or municipality, colony or settlement', () => {
    cy.wait(1000)
    opc.typeState()
    cy.wait(1000)
    cy.get('[name="municipality"]').scrollIntoView().should('be.visible')
    opc.typeMunicipality()
    cy.wait(1000)
    opc.typeColony()
    cy.wait(1000)
})

Then('check for required fields error', () => {
    generic.text('Agregar un alias a tu tarjeta')
    generic.text('El Nombre es requerido.')
    generic.text('CódigoPostal es necesario')
    generic.text('La Calle es requerida.')
    generic.text('El número exterior es requerido.')
})

Then('clear required fields', () => {
    if (isMobile()) {
        opc.clearCampsOpc()
    } else {
        opc.clearCampsOpcDesktop()
    }
    generic.button('Continuar').click({ force: true })
})

Then('check not to modify the opt card number', () => {
    opc.cardOpc()
})

Then('edit required fields', () => {
    if (isMobile()) {
        opc.clearCampsOpc()
    } else {
        opc.clearCampsOpcDesktop()
    }
    opc.paymentNickName('Random')
    opc.typePaymentFullName('Mario Perez')
    // Dirección de envío
    if (isMobile()) {
        opc.typeZip('05348')
        opc.typeStreet('Mario Pani')
        opc.typeNoExt('200')
    } else {
        opc.typeZipDesktop('05348')
        opc.typeStreetDesktop('Mario Pani')
        opc.typeNoExtDesktop('200')
    }

    generic.button('Continuar').click({ force: true })
})

Then('verify that the information has been modified', () => {
    cy.wait(500)
    opc.verifyNewPayment()
})

Then('increases the number of items', () => {
    if (isMobile()) {
        opc.increaseQty()
    } else {
        opc.increaseQtyDesktop()
    }
})

Then('the amount is increased to {string} articles', (value) => {
    if (isMobile()) {
        opc.itemQty(value)
        cy.wait(1000)
    } else {
        opc.itemQtyDesktop(value)
    }
})

Then('decreases the number of items by 1', () => {
    if (isMobile()) {
        opc.decreaseQty()
    } else {
        opc.decreaseQtyDesktop()
    }
})

Then('the total price is updated with quantity of {string} articles', (value) => {
    opc.totalCostVerify(value)
})

Then('elimina un artículo', () => {
    opc.saveTotalCost()
    //opc.buttonDeleteElement()
    generic.button("Aceptar").click({ force: true })
})

Then('verify that the total is updated', () => {
    opc.verifyDifferenceCost()
})

Then('verify that the item can be deleted from the 3-point menu', () => {
    if (isMobile()) {
        opc.menuThreePoints().click()
        opc.itemMenuSelect("Eliminar").should('exist')
    } else {
        cy.contains("Eliminar").should('exist')
    }
})

Then('verify that the item can be deleted from the OPC', () => {
    opc.trashElement().should('exist')
})

Then('eliminate one of the two products', () => {
    if (isMobile()) {
        opc.trashElement().first().click()
    } else {
        opc.trashElementDesktop().first().click()
    }
    generic.button("Aceptar").click()
    cy.get('.loading > .loader > .mainLoader').should('not.be.visible')

})

Then('verify that the item cannot be deleted from the 3-point menu', () => {
    if (isMobile()) {
        opc.menuThreePoints().click()
        opc.itemMenuSelect("Eliminar").should('not.exist')
    } else {
        cy.contains("Eliminar").should('not.exist')
    }
})

Then('verify that the item cannot be deleted from the OPC', () => {
    opc.trashElement().should('not.exist')
})

Then('verify that the subtotal is greater than the total', () => {
    opc.saveTotalCost()
    opc.compareTotalSubTotal()
})

Then('select a country other than Mexico', () => {
    if (isMobile()) {
        opc.selectCountry("Alemania", { force: true })
    } else {
        opc.selectCountryDesktop("Alemania", { force: true })
    }
})

Then('fill in the address information', () => {
    if (isMobile()) {
        opc.typeZip("12345")
        opc.typeStateText("State")
        opc.typeMunicipalityText("Municipality")
        opc.typeColonyText("colonyTest")
        opc.typeStreet("streetTest")
        opc.typeNoExt("12345")
    } else {
        opc.typeZipDesktop("12345")
        opc.typeStateTextDesktop("State")
        opc.typeMunicipalityTextDesktop("Municipality")
        opc.typeColonyTextDesktop("colonyTest")
        opc.typeStreetDesktop("streetTest")
        opc.typeNoExtDesktop("12345")
    }
    generic.button("Continuar").click({ force: true })
})

Then('Verify that it is shown to your home and Click & Collect', () => {
    opc.yourAddressAndCC()
})

Then('Verify that Cards or Wallet, PayPal and Cash and Transfers are displayed', () => {
    opc.elementsWayToPay()
})

Then('check item attributes', () => {
    opc.elementToArticle()
})

Then('select an address for the gift table', () => {
    generic.button('Casa').click({ force: true })
})

Then('select an address for the gift table in C&C', () => {
    cy.get(':nth-child(1) > .opc_store-delivery-addresses_align-items').scrollIntoView().find('.a-radio__input').first().click({ force: true })
})

Then('enter wrong date and CVV', () => {
    if (isMobile()) {
        opc.typeCardExp().type("1225", { force: true })
        opc.typeCvv().type("1234", { force: true })
    } else {
        opc.typeCardExpDesktop().type("1225", { force: true })
        opc.typeCvvDesktop().type("1234", { force: true })
    }
})

Then('verify that asks for the date and CVV', () => {
    if (isMobile()) {
        opc.typeCardExp().should('be.visible')
        opc.typeCvv().should('be.visible')
    } else {
        opc.typeCardExpDesktop().should('be.visible')
        opc.typeCvvDesktop().should('be.visible')
    }
})

Then('select button Checkout', () => {
    cy.wait(2000)
    generic.button('Finalizar compra').click({ force: true })
})

Then('verify the purchase', () => {
    opc.verifyConfirmPurchase()
})

Then('verify error message in opt payment method', () => {
    cy.wait(1000)
    const message = ('La transacción no fue autorizada por el banco emisor.')
    ar.messageCellPhoneRegisterOk(message)
})

Then('select payment type {string}', (pago) => {
    opc.typePay(pago)
    cy.wait(1700)
})

Then('verify that {string} be the payment method', (method) => {
    opc.payMethod().contains(method).should('be.visible')
})

Then('select as default {string}', (method) => {
    opc.selectPayPredeterminate(method)
})

Then('verify sku data', () => {
    opc.verifySkuElements()
})

Then('select the promotions box', () => {
    opc.selectBoxOffers()
})

Then('verify that shows available promotions', () => {
    opc.modalOffers().should('be.visible')
})

Then('verify the promotions one by one', () => {
    opc.verifyAllOffers()
})

Then('check the Default label on {string}', (method) => {
    cy.wait(1000)
    opc.verifyPredeterminate(method)
})



Then('check the Legal Notice', () => {
    opc.legalMoto().should('be.visible')
})

Then('verify the message Your purchases will be associated with your gift table except non-participating categories', () => {
    opc.messageCyC().should('exist')
})

// --- Warranty ---

Then('select lower amount of guarantee in option', () => {
    if (isMobile()) {
        cy.scrollTo('center')
        opc.minusQty().click()
    } else {
        opc.minusQtyDesktop().click()
    }
})

Then('verify quantity button enabled in option', () => {
    opc.disabledQtyButton().should('not.exist')
})

Then('More warranty amount button is disabled', () => {
    cy.scrollTo('center')
    opc.disabledQtyWarrantyOpc().should('be.visible')
})

Then('eliminates warranty on opc', () => {
    if (isMobile()) {
        cy.scrollTo('center')
        opc.menu3pointWarranty().click()
    }
    cy.contains('Cambiar garantía').click({ force: true })
    opc.deleteWarranty()
})

Then('check to be able to return with the back arrow to the previous view', () => {
    if (isMobile()) {
        opc.cancelAddDirection()
    } else {
        cy.contains("Regresar").click()
    }
    cy.get('#opc_container').should('be.visible')
})

Then('Verify that the text is displayed by default Home phone', () => {
    //opc.lada().invoke('attr', 'labeltext').should('include', 'LADA')
    opc.phone().invoke('attr', 'labeltext').should('include', 'Teléfono')
})

Then('verify that item and warranty promotions can be selected separately', () => {
    opc.promoContainer().last().scrollIntoView().wait(500)
    opc.promoContainer().should('have.length', 2)
})

Then('verify that PayPal and Cash & Transfers options are disabled warranty', () => {
    opc.paymentPaypal().should('have.class', 'disable-btn-mkp')
    opc.paymentMoneyTranfer().should('have.class', 'disable-btn-mkp')
})

// --- New feature minimum purchase (mp) ---

Then('write the minimum number of pieces required', () => {
    opc.minimumPurchasePdp()
})

Then('checkout button is enabled', () => {
    opc.finishPurchaseEnabled()
})

Then('write the minimum number of pieces required in chk', () => {
    opc.minimumPurchaseChk()
})

Then('Does not show minimum parts required label', () => {
    opc.warningMinumPurchase()
})

Then('shows warning {string}', (value) => {
    opc.shippingWarningMinimumPurchase(value)
})

Then('does not show legend of minimum purchase x pieces', () => {
    generic.opcVisible().should('exist')
    opc.msgMinimumPurchase().should('not.exist')
})

// --- Sodexo ---

Then('select help icon in CVV', () => {
    cy.get('#whatIsThisCVV').click({ force: true })
})

Then('write expiration date and CVV', () => {
    cy.get('#cardExp').type('0128', { force: true })
    cy.get('#cvv').type('1234', { force: true })
})


Then('enter CVV of the card', () => {
    opc.setcvv("910")
})

Then('select purchased product', () => {
    opc.selectPurchase()
})

Then('select button cancel purchase', () => {
    opc.cancelPurchase()
})

Then('select option I dont need it anymore', () => {
    cy.get('#Ya\\ no\\ lo\\ necesito').click()
    cy.wait(1000)
})

Then('check cancellation', () => {
    opc.verifyCancelPurchase()
})

Then('select button Continue', () => {
    opc.pushContinuar()
})
// --- 