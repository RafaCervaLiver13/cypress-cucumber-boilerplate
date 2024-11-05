import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import checkoutPage from '../pages/checkoutPage';
import genericPage, { isMobile } from '../pages/genericPage'

const chk = new checkoutPage()
const generic = new genericPage()

// ----- My bag -----

Then('select image of item in bag', () => {
    cy.get('.a-myBagImageProduct').first().click()
})

// ----- Saved -----

When('select my bag icon', () => {
    chk.bag()
})

/*
When('verifica la etiqueta {string}', (text) => {
    chk.bagText(text).should('exist')
})
*/

When('select save tab', () => {
    cy.wait(2000)
    chk.savedTab()
})

When('selecttab mi bolsa', () => {
    cy.wait(1000)
    chk.myBagTab()
})

Then('check the added article', () => {
    chk.imgItem().should('exist')
})

When('select the button {string} in my bag', (text) => {
    chk.buttonClick(text)
})

Then('select save for later', () => {
    cy.wait(2000)
    if (isMobile()) {
        chk.menuItemTabSaved()
    }
    cy.wait(500)
    chk.menuItemSave()
})

When('select delete', () => {
    if (isMobile()) {
        chk.menuItemTabSaved()
    }
    chk.menuItemDelete()
})

When('select move to your bag', () => {
    if (isMobile()) {
        chk.menuItemTabSaved()
    }
    cy.wait(500)
    chk.menuItemMove()
})

When('select buy now in saved', () => {
    if (isMobile()) {
        chk.menuItemTabSaved()
    }
    chk.menuItemBuy()
    cy.wait(1000)
})

// ----- My Bag -----

Then('select buy now from menu three points', () => {
    if (isMobile()) {
        chk.menuItemTabMyBag()
    }
    chk.menuItemBuy()
    cy.wait(500)
    cy.get('#opc_container').should('be.visible')
})

Then('verify tag This item cannot be associated with a gift table', () => {
    if (isMobile()) {
        chk.menuItemTabMyBag()
    }
    chk.menuItemNoGiftRegistry()
})

Then('clean my bag', () => {
    cy.get(".loader").should('not.be.visible')
    if (isMobile()) {
        generic.deleteItems()
    } else {
        generic.deleteItemsDesktop()
    }
})

Then('clean saved', () => {
    cy.wait(2000)
    chk.savedTab()
    cy.wait(2000)
    if (isMobile()) {
        generic.deleteItems()
    } else {
        generic.deleteSavedDesktop()
    }
    cy.wait(1000)
    chk.closeMessage()
    chk.myBagTab()
})

Then('the quantity should not be 1', () => {
    cy.wait(500)
    cy.get('.m-stickyBar__qtyInputs-OCP > #mainSearchbar')
        .invoke('val') // Retrieve the value property
        .then((value) => {
            cy.log(value);
            // You can also use the value in your test assertions or perform other actions
            cy.wrap(value).should('not.eq', '1');
        });
})

Then('select I no longer want to give away from checkout', () => {
    if (isMobile()) {
        generic.menuThreePointsGeneric().click()
        generic.itemMenuSelectGeneric('Ya no quiero regalar').click()
    }
    else {
        cy.wait(2000)
        cy.get('.m-latestinlineElement__block > .-gift').click({ force: true })
    }
    cy.get('#dontGiftTable').click()
})

// --- Warranty ---

Then('select warranty', () => {
    chk.select1stWarranty()
})

Then('display change warranty', () => {
    if (isMobile()) {
        chk.menu3points().last().click()
    }
    cy.contains('Cambiar garantía')
})

Then('quantity button is disabled on my bag', () => {
    cy.scrollTo('center')
    chk.disabledQtyButton().should('exist')
})

Then('increase item quantity', () => {
    chk.increaseQtyChk()
})

Then('warranty service quantity button is activated', () => {
    chk.disabledQtyButton().should('not.exist')
})

Then('check quantity button enabled', () => {
    chk.disabledQtyButton().should('not.exist')
})

Then('select lowest quantity in guarantee', () => {
    chk.minusQty().click()
})

Then('removes warranty', () => {
    chk.trashWarranty()
    chk.warrantyItem().should('not.exist')
})

Then('select change warranty', () => {
    if (isMobile()) {
        chk.menu3points().last().click()
    }
    cy.contains('Cambiar garantía').click({ force: true })
    chk.changeWarranty()
})

Then('select delete warranty', () => {
    if (isMobile()) {
        chk.menu3points().last().click()
    }
    cy.contains('Cambiar garantía').click({ force: true })
    chk.deleteWarranty()
})

// --- Moto ---

Then('select change delivery en checkout', () => {
    chk.changeAddress().click()
})

Then('verify message {string}', (txt) => {
    chk.msj(txt)
})

// [ REV. ]

// [ MY BAG ]

Then('the gift amount is updated', () => {
    chk.myBagGiftQty()
})

Then('visualize color, size, texture, materials', () => {
    chk.details()
})

Then('modify quantity to {string} in my bag', (value) => {
    chk.numberElementsChk(value)
    cy.get('.m-product__qty > .row').click('bottomRight')
})

// [ CHECKOUT ]

Then('display event number at checkout', () => {
    cy.get('.o-myBag__description').contains('Número de evento').should('exist')
})

Then('event number is not displayed at checkout', () => {
    cy.get('.o-myBag__description').contains('Número de evento').should('not.exist')
})

// [ MULTISELECTOR ]

Then('does not show select items button', () => {
    chk.multiselectorBtn().should('not.exist')
})

Then('shows select items button', () => {
    chk.multiselectorBtn().should('exist')
})

Then('select button seleccionar artículos', () => {
    chk.multiselectorBtn().click()
})

Then('select checkbox all', () => {
    chk.todoChk().check()
    chk.mlsCount()
})

Then('all checkboxes are selected', () => {
    chk.checkboxColumns().should('be.checked')
})

Then('alert with message is displayed {string}', (page) => {
    chk.deletionMsg().contains(page, { matchCase: false })
})

Then('the same items selected from my bag are displayed', () => {
    chk.mlsCountCheckout()
})

Then('a single checkbox is selected', () => {
    chk.mlsRandom()
    chk.mlsCount()
})

Then('the move to wishlist option is not shown', () => {
    if (isMobile()) {
        chk.menu3points().should('not.exist')
    } else {
        cy.get('.m-latestinlineElement__block').should('not.exist')
    }
})

// [ END ]
