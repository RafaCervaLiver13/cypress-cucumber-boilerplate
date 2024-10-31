import {
  Given,
  When,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";

import opcPage from "../step_definitions/opcPage.js"
import genericPage, { isMobile, isStore } from "../step_definitions/genericPage"

const opc = new opcPage()

const generic = new genericPage()
const usrJson = new genericPage().getUser();
const skuJson = new genericPage().getSku();
const navJson = new genericPage().getNav();

let site = Cypress.env('SITE');
let store = Cypress.env('STORE');

let user, sku, nav, pdpQty, userOrder

beforeEach(() => {
  cy.fixture(usrJson).then((select) => {
    user = select
  })

  cy.fixture(skuJson).then((select) => {
    sku = select
  })

  cy.fixture(navJson).then((select) => {
    nav = select
  })
})

Given("visit the liverpool page", () => {
  cy.visit("https://www.liverpool.com.mx/");
});

When('search for {string} with type {string}', (subtype) => {
  //const random = Cypress._.random(nav[store][subtype].length - 1)
  //generic.search2(nav[store][subtype][random].nombre)
  cy.get('#mainSearchbar').type('1057099824{enter}')
  cy.wait(4000)

})

Then('write the minimum number of pieces required', () => {

  cy.get('body').then(($body) => {
    if ($body.find('.m-product__listingPlp').length > 0) {
      // size ok
      cy.get('#img_0').click()
      cy.wait(1000)
      cy.log('iff')
    } else {
      cy.log('else')
    }
  })
  cy.get('.Container__pieces').then(($mp) => {
    const minimumPurchase = $mp.text().trim() // Trim to remove any leading/trailing spaces
    const qty = minimumPurchase.split(' ')[2] // Split by space and get the third element (index 2)
    cy.log(qty)
    // set minimum
    cy.get('.o-product__description').scrollIntoView().wait(500)
    cy.get('#a-stickyBarPdp__inputQty').clear({ force: true }).type(qty, { force: true });
  })
})

When('select buy now on pdp', () => {
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
    cy.wait(2000)
  })
})

Then('select buy now at home in pdp', () => {
  cy.scrollTo('center')
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
})

When('log in with user {string} from opt', (type) => {
  //const random = Cypress._.random(user[type].length - 1)
  generic.typeEmail('autom2024.cy.cPruchases@yopmail.com')
  generic.typePass('Liverpool2024')
  generic.loginBtnClick()
  cy.wait(3000)
  cy.url().should('contain', 'https://' + site + '.' + store + '.com.mx/tienda/oneCheckout')
  /*if (isStore("suburbia")) {
    cy.wait(1000).contains('Lo sentimos...', { timeout: 500 }).should('not.exist')
  } else {
    cy.wait(500)
    //generic.waitPage('/getConfiguration', '.loadingContainerStyle >', false)
    cy.contains('Lo sentimos...', { timeout: 500 }).should('not.exist')
  }*/
  cy.get('body').then(($body) => {
    if ($body.find('.mobile-indicator__content__wrapper').length > 0) {
      cy.get('.mobile-indicator__content__wrapper > div.close >').click({ force: true })
    }
  })
})


Then('enter CVV of the card', () => {
  opc.setcvv("910")
})

Then('select button Checkout', () => {
  cy.wait(2000)
  generic.button('Finalizar compra').click({ force: true })
})

Then('verify the purchase', () => {
  opc.verifyConfirmPurchase()
})

When('select button {string}', (name) => {
  if (isMobile() && name == "Electrónica") {
    cy.contains(name).click({ force: true })
  } else if (isStore("suburbia") && name == "Ver detalle") {
    cy.contains("Detalle de compra").click({ force: true })
  } else {
    cy.wait(2500)
    generic.button(name).click({ force: true })
  }
  cy.wait(1000)
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

Then('select button Continue', () => {
  opc.pushContinuar()
})

Then('check cancellation', () => {
  opc.verifyCancelPurchase()
})