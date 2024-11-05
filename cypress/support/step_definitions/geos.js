import { Then } from "@badeball/cypress-cucumber-preprocessor";
import geosPage from "../pages/geosPage.js"

const geos = new geosPage()

// --- Geos ---

Then('enter cp {string} in geos', (cp) => {
  geos.closeCookies()
  cy.get('#CP').clear()
  switch (cp) {
    case "válido":
      geos.zipcode('15270')
      break
    case "no válido":
      geos.zipcode('012345')
      break
    case "válido diferente":
      geos.zipcode('07300')
      break
    default:
  }
})

Then('select the Liverpool store {string}', (store) => {
  cy.wait(500)
  switch (store) {
    case "Centro":
      geos.store('store-1')
      break
    case "Lindavista":
      geos.store('store-83')
      break
    default:
  }
})

Then('check the store {string}', (store) => {
  geos.storeName(store).should('be.visible')
})

Then('select button search by my current location', () => {
  geos.closeCookies()
  cy.wait(500)
  geos.currentLocation()
})

Then('select store by current location', () => {
  geos.storeSelect()
})

Then('check selected store', () => {
  cy.wait(1000)
  geos.selectedStore()
})

Then('search by word {string} from geos', (word) => {
  cy.get('#CP').clear()
  geos.zipcode(word)
  cy.get('.mdc-button').click({ force: true })
})

Then('select see store details', () => {
  geos.selectDetail()
})

Then('verify store details', () => {
  geos.storeInfo()
})

Then('verify geo tag {string}', (label) => {
  geos.storeLabel(label)
})

Then('verify label send free to home', () => {
  geos.shippingAddressName()
})

Then('verify geo tag receive today', () => {
  geos.shippingAddressTime()
})

Then('the geo tag is shown pick up in 2 hrs', () => {
  geos.clickCollectTime()
})

Then('does not show label {string}', (option) => {
  cy.scrollTo('center')
  geos.deliverToday(option)
})

Then('view delivery label for c&c', () => {
  geos.ccLabels()
})

Then('sample label displayed', () => {
  geos.displayedStore()
})

Then('sample label pick up in 2 hrs on option', () => {
  geos.opcDelivery()
})

Then('sample label receive today in opt', () => {
  geos.opcShippingAddress()
})

Then('select a store', () => {
  cy.get('.modal-content [type="radio"]').first().check()
})

// --- ---
