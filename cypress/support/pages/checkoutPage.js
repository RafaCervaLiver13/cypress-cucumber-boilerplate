/// <reference types="cypress" />

import { isMobile } from "./genericPage"

let warrantyStr, checkboxSelection

class checkoutPage {

    // [ REV. ]

    // [ GWP ]

    myBagGiftQty() {
        cy.wait(500)
        cy.get('.m-breakdownExpenses__description > :nth-child(1) > .a-inlineElement').then(($gift) => {
            const giftQty = $gift.text().split('( ')[0].trim() //takes first two digits, if doesnt have second digit, with trim clean
            cy.log("cantidad regalo: " + giftQty)

            cy.get('.m-stickyBar__qtyInputs-OCP > #mainSearchbar')
                .should('have.value', parseInt(giftQty))
        })
    }

    details() {
        cy.get('.description-attribute').should('be.visible')
    }

    // [ END ]

    // ----- Saved tab -----

    bag() {
        cy.intercept('GET', '/tienda/getCartDetails').as('loadCart');
        cy.get('.a-header__bag > span').click({ force: true })
        cy.wait('@loadCart')
    }

    bagText(value) {
        return cy.contains(value)
    }

    savedTab() {
        return cy.get('#mdc-tab-2').click({ force: true })
    }
    myBagTab() {
        return cy.get('#mdc-tab-1').click({ force: true })
    }

    buttonClick(value) {
        return cy.get(`button:contains("${value}")`).click()
    }

    menuItemTabSaved() {
        return cy.get('.icon-more_vert').first().click()
    }

    menuItemTabMyBag() {
        return cy.get('.icon-more_vert').last().click()
    }

    menuItemSave() {
        return cy.contains('Guardar para más tarde').first().click({ force: true })
    }

    menuItemDelete() {
        return cy.contains('Eliminar').first().click({ force: true })
    }

    menuItemMove() {
        return cy.contains('Mover a tu bolsa').first().click({ force: true })
    }

    menuItemBuy() {
        return cy.contains('Comprar ahora').first().click({ force: true })
    }

    // --- My bag ---

    menuItemNoGiftRegistry() {
        return cy.contains('No se puede asociar a mesa de regalo').should('exist')
    }

    imgItem() {
        return cy.get('.a-myBagImageProduct')
    }

    increaseQtyChk() {
        cy.get('.m-product__qty').find('.btn-qty.-add').first().scrollIntoView().click({ force: true })
        cy.wait(2000)
    }

    decreaseQtyChk() {
        cy.get('.m-product__qty').find('.btn-qty.-minus').first().scrollIntoView().click({ force: true })
        cy.wait(2000)
    }

    numberElementsChk(value) {
        cy.get('.m-stickyBar__qtyInputs-OCP > #mainSearchbar').clear().type(value)
        //cy.get('.m-stickyBar__qtyInputs-OCP > #mainSearchbar').type(value)
    }

    numberElementsDesktopChk(value) {
        cy.get('.d-none').find("#mainSearchbar").clear()
        cy.wait(500)
        cy.get('.d-none').find("#mainSearchbar").type(value)
    }

    increaseQtyDesktopChk() {
        cy.get('.d-none >.m-product__qty').find(':nth-child(3) > .a-btn').scrollIntoView().click({ force: true })
        cy.wait(2000)
    }

    decreaseQtyDesktopChk() {
        cy.get('.d-none > .m-product__qty').find(':nth-child(1) > .a-btn').scrollIntoView().click({ force: true })
        cy.wait(2000)
    }
    continueBuying() {
        return cy.get('.t-myBag__continueToBuy > .a-btn').click()
    }

    closeMessage() {
        cy.get('body').then(($body) => {
            if ($body.find('.cart-alert-top > .-alert > .undefinedm-mdc__snackbarSurface > .m-mdc__snackbarActions > .icon-close').is(":visible")) {
                cy.get('.cart-alert-top > .-alert > .undefinedm-mdc__snackbarSurface > .m-mdc__snackbarActions > .icon-close').click()
            } else {
                console.log("Guardados está limpio")
            }
        })
    }

    // --- Warranty ---

    select1stWarranty() {
        cy.get('.ComplementoryServiceCard [type="radio"]').first().check({ force: true })
    }

    menu3points() {
        return cy.get('.icon-more_vert')
    }

    disabledQtyButton() {
        return cy.get('.disable-btn-mkp')
    }

    minusQty() {
        return cy.get('.o-myBag-garantia-sku .-minus')
    }

    trashWarranty() {
        cy.get('.col-10 > .a-btn').click({ force: true })
    }

    warrantyItem() {
        return cy.get('.o-myBag-garantia-sku')
    }

    changeWarranty() {
        cy.get(':nth-child(2) > .garantia-modal-serviceCoverage').then(($name) => {
            let str = $name.text()
            warrantyStr = str.slice(0, -2);
            cy.log(warrantyStr)
            cy.get('.a-checkout_promoList > :nth-child(2) [type="radio"]').check()
            cy.get('.col-12 > .a-btn').click({ force: true })
            cy.contains(warrantyStr)
        })
    }

    deleteWarranty() {
        cy.get('.a-checkout_promoList > :nth-child(2) [type="radio"]').check()
        cy.get('.col-12 > .a-btn').click({ force: true })
    }

    // --- Moto ---

    changeAddress() {
        return cy.get('#opc_addressButton_select')
    }

    msj(value) {
        cy.contains(value)
    }

    // [ MULTISELECTOR ]

    multiselectorBtn() {
        return cy.get('.stickyMyBag-multiselector-label')
    }

    todoChk() {
        if (isMobile()) {
            return cy.get('.multiselector-mobile-section-checkbox > .m-checkbox > .a-checkbox__input')
        } else {
            return cy.get('.my-bag-header-all > .w-auto > .m-checkbox > .a-checkbox__input')
        }
    }

    checkboxColumns() {
        return cy.get('.myBag-checkbox-multiselector-column > .m-checkbox > .a-checkbox__input')
    }

    deletionMsg() {
        return cy.get('.-success > .m-mdc__snackbarSurface > .m-mdc__snackbarLabel')
    }

    mlsCount() {
        cy.get('.m-checkbox > .a-checkbox__input').filter(':checked').parents('.o-myBag').then($elements => {
            checkboxSelection = $elements.length;
            //expect(checkboxSelection).to.be.greaterThan(0);
        });
    }

    mlsCountCheckout() {
        cy.intercept('POST', '/summary').as('loadChk')
        cy.wait('@loadChk')
        cy.get('.opc_articlesPromotions_title').scrollIntoView()
        cy.get('.opc_products >').should('have.length', checkboxSelection)
    }

    mlsRandom() {
        cy.get('.o-myBag__checkbox-column .m-checkbox > .a-checkbox__input').then($check => {
            const randomIndex = Math.floor(Math.random() * $check.length);
            const randomCheckbox = $check.eq(randomIndex);
            cy.wrap(randomCheckbox).check().should('be.checked');
        });
    }

}

export default checkoutPage;