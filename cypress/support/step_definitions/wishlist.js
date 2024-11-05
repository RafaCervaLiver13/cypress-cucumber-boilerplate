import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import wishlistPage from '../pages/wishlistPage'
import genericPage, { isMobile } from '../pages/genericPage'

const wl = new wishlistPage()
const generic = new genericPage()

Then('select button Wishlist', () => {
    cy.wait(2000)
    //generic.waitPage('https://ogngcpe.liverpool.com.mx/tienda/users/myAccount')
    generic.button('Wishlist').click({ force: true })
})

Then('return to wishlist menu', () => {
    cy.wait(1000)
    if (isMobile()) {
        cy.get('.icon-back').click({ force: true })
    } else {
        generic.button('Wishlist').click({ force: true })
    }
    cy.wait(1000)
})

Then('fill out the required fields', () => {
    wl.nameWishList()
    wl.buttonCreateWishList().click({ force: true })
})

Then('verify the message {string} from wishlist', (message) => {
    generic.text(message)
})

Then('delete list', () => {
    wl.deleteWishList()
})

Then('rename list', () => {
    wl.renameList()
    wl.buttonCreateWishList().click({ force: true })
})

Then('check the new name on the wishlist', () => {
    generic.text('Cambiaste el nombre de la lista exitosamente')
})

Then('select the button Move an item to bag', () => {
    cy.wait(1500)
    wl.moveElementFromWishList()
})

Then('select the Buy Now button for an item', () => {
    cy.wait(1500)
    wl.buynowElementFromWishList()
})

Then('check redirection to OPC', () => {
    cy.contains('Confirma tu compra')
})

Then('select {string} from wishlist', (option) => {
    wl.selectOptionElement(option)
})

Then('select {string} from my bag', (option) => {
    wl.resetTemp()
    wl.selectElementsWithoutWishlist(option)
})

Then('verify the message Item on Wishlist', () => {
    if (isMobile()) {
        wl.verifyElementsInWishlist()
    } else {
        wl.verifyElementsInWishlistDesktop()
    }
})

Then('select another Wishlist', () => {
    cy.wait(2500)
    wl.selectElementInto()
    cy.wait(2000)
})

Then('select WishList with items', () => {
    wl.selectWishlistWithElements()
})

Then('select the heart', () => {
    //generic.waitPage('/fetchDeliveryDetailsForPDP*', 'svg > g > g:nth-child(2)', true)
    cy.wait(1500)
    if (isMobile()) {
        wl.selectHeart()
    } else {
        wl.selectHeartDesktop()
    }

})

Then('check redirection to wishlist', () => {
    generic.text('Wishlist')
})

Then('select wishlist item', () => {
    wl.selectElement()
})

Then('check the Save to Wishlist label', () => {
    cy.wait(1000)
    wl.heartSelected()
})