import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import myordersPage from "../pages/myordersPage.js"
import genericPage, { isMobile, isStore } from '../pages/genericPage'

const generic = new genericPage()

const myorders = new myordersPage()


// [ REV ]

When('select filter menu in my purchases', () => {
  if (isMobile()) {
    cy.wait(500)
    myorders.menuFilters().click({ force: true })
  } else {
    myorders.menuFiltersDesktop().click()
  }
})

When('select filter {string} in my purchases', (value) => {
     if (value == "En internet" || value == "En tienda") {

      cy.contains('Tipo de compra').click({ force: true })
      cy.wait(500)
      myorders.optionFilter(value)

    } else if (value != 'Fecha de compra' || 'Estatus del pedido' || 'Tipo de compra') {

      cy.get('.middle').contains(value).click({ force: true })
      cy.wait(500)

    } else {
      myorders.optionFilter(value)
      cy.wait(500)

    }
})

When('select button filter', () => {
  myorders.buttonFilter().click()
})

Then('view purchase made', () => {
  if (isMobile()) {
    myorders.shippingCard().should('be.visible')
  } else {
    myorders.shippingCardDesktop().should('be.visible')
  }
})

Then('select order tracking', () => {
  if (isMobile()) {
    myorders.shippingCard().click()
  } else {
    myorders.shippingCardDesktop().click()
  }
})

Then('display billing code', () => {
  myorders.invoicing().should('be.visible')
})

Then('select invoice purchase', () => {
  myorders.invoiceNow()
})

Then('select purchase image', () => {
  if (isMobile()) {
    myorders.orderImage().first().click()
  } else {
    myorders.orderImageDesktop().first().click()
  }
})

Then('select image in purchase detail', () => {
  myorders.imgDetailOrder().click({ force: true })
})

When('search word {string} in my purchases', (busqueda) => {
  myorders.orderSearch(busqueda)
})

Then('order should not be shown', () => {
  myorders.shippingCard().should('not.exist')
})

Then('select Where do I find my order number on the ticket?', () => {
  myorders.helpOrder().click({ force: true })
})

Then('order help modal sample', () => {
  myorders.helpOrderTicket().should('be.visible')
})

Then('must show more than two purchases', () => {
  cy.wait(1000);
  cy.scrollTo('center');

  const getOrderCount = () => (isMobile() ? myorders.shippingCard() : myorders.shippingCardDesktop());

  getOrderCount().then((elem) =>
    expect(Cypress.$(elem).length).to.be.greaterThan(1)
  );
});

Then('select delivery tracking', () => {
  if (isMobile()) {
    myorders.deliveryTracking().first().click()
  } else {
    myorders.deliveryTrackingDesktop().first().click()
  }
})

Then('display delivery address', () => {
  myorders.deliveryAddress().should('be.visible')
})

Then('select button See detail', () => {
  isStore("suburbia") ? cy.contains("Detalle de compra").click({ force: true }) : generic.button('Ver detalle').click({ force: true })
  cy.wait(1000)
})

// [ END ]