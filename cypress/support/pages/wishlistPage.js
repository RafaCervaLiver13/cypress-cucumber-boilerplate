/// <reference types="cypress" />

let newWishList, numbertry = 0
let bandTemp = 0
let secBandTemp = 0

class wishlistPage {
    nameWishList() {
        newWishList = 'Random' + Math.floor(Math.random() * 100)
        cy.get('#nameWishList').clear()
        cy.wait(500)
        cy.get('#nameWishList').type(newWishList)
    }

    buttonCreateWishList() {
        return cy.get('.CreateWishListModal__SaveButton-sc-1izaw7m-2')
    }

    deleteWishList() {
        cy.contains(newWishList).click({ force: true })
        cy.get('.icon-more_vert').click()
        cy.contains('Eliminar').click()
        cy.contains('Aceptar').click()
        cy.wait(1500)
    }

    renameList() {
        cy.contains(newWishList).click({ force: true })
        cy.get('.icon-more_vert').click()
        cy.contains('Renombrar').click()
        this.nameWishList()
    }

    moveElementFromWishList() {
        cy.get('.wishlistdetail__ProductWrapper-sc-9ud4sx-10').contains('Mover a la bolsa').then(($items) => {
            const item = $items.toArray()
            return Cypress._.sample(item).click({ force: true })
        })
    }

    buynowElementFromWishList() {
        cy.get('.wishlistdetail__ProductWrapper-sc-9ud4sx-10').contains('Comprar ahora').then(($items) => {
            const item = $items.toArray()
            return Cypress._.sample(item).click({ force: true })
        })
    }

    selectOptionElement(option) {

        cy.get('.wishlistdetail__KebabMenuWrapper-sc-9ud4sx-20 > > > .icon-more_vert').then(($items) => {
            const item = $items.toArray()
            Cypress._.sample(item).click({ force: true })
            cy.get('.wishlistdetail__KebabMenuWrapper-sc-9ud4sx-20 > > .dropdown-menu.show > ').contains(option).first().click({ force: true })
        })
    }

    selectElement() {
        cy.get('.wishlistdetail__ImageProdcut-sc-9ud4sx-13').then(($items) => {
            const item = $items.toArray()
            Cypress._.sample(item).click({ force: true })
        })
    }

    selectElementInto() {
        cy.get('.ItemsWishListModal__CardWrapper-sc-j0fupm-2').then(($items) => {
            const item = $items.toArray()
            return Cypress._.sample(item).click({ force: true })
        })
    }

    selectWishlistWithElements() {
        cy.get('.wishlist__CardsContainer-sc-2hhw51-0 >').then(($items) => {
            const item = $items.toArray()
            const ele = Cypress._.sample(item).getElementsByClassName('wishlist__NumProducts-sc-2hhw51-6')
            const text = ele[0].innerText
            const number = parseInt(text.slice(0, 1))
            cy.log(text)
            if (number == 0 && numbertry < 5) {
                numbertry++
                this.selectWishlistWithElements()
            } else {
                ele[0].click({ force: true })
            }
        })
    }

    resetTemp() {
        secBandTemp = 0
    }

    selectElementsWithoutWishlist(option) {
        cy.wait(2000)
        cy.get('.menuMotion > #address0 > .icon-more_vert').then(($items) => {
            const item = $items.toArray()
            const ele = Cypress._.sample(item)
            ele.scrollIntoView()
            ele.click()
            cy.get(".dropdown-menu.show").children().then(($child) => {
                bandTemp = 0
                secBandTemp++
                cy.log("intento " + secBandTemp + " de 5")
                const item = $child.toArray()
                for (let i = 0; i < item.length; i++) {
                    if (item[i].innerText == option) {
                        bandTemp = 1
                        secBandTemp = 0
                        item[i].click({ force: true })
                        break;
                    }
                }
                if (bandTemp == 0 && secBandTemp < 5) {
                    ele.click()
                    this.selectElementsWithoutWishlist()
                }
            })
        })
    }

    verifyElementsInWishlist() {
        cy.wait(500)
        cy.get('.menuMotion > #address0 > .icon-more_vert').then(($items) => {
            const item = $items.toArray()
            const ele = Cypress._.sample(item)
            ele.scrollIntoView()
            ele.click()
            cy.get(".dropdown-menu.show").children().then(($child) => {
                bandTemp = 0
                secBandTemp++
                cy.log("intento " + secBandTemp + " de 5")
                const item = $child.toArray()
                for (let i = 0; i < item.length; i++) {
                    if (item[i].innerText == "Artículo en Wishlist") {
                        bandTemp = 1
                        secBandTemp = 0
                        cy.get(".dropdown-menu.show").contains("Artículo en Wishlist").should('be.visible')
                        break;
                    }
                }
                if (bandTemp == 0 && secBandTemp < 5) {
                    cy.log(secBandTemp)
                    ele.click()
                    this.verifyElementsInWishlist()
                }
                if (secBandTemp == 5) {
                    cy.log(secBandTemp + " intentos fallidos")
                    cy.get(".dropdown-menu.show").contains("Artículo en Wishlist").should('be.visible')
                }
            })
        })
    }

    verifyElementsInWishlistDesktop() {
        cy.wait(500)
        cy.get('.menuMotion > #address0 > .icon-more_vert').then(($items) => {
            const item = $items.toArray()
            const ele = Cypress._.sample(item)
            ele.scrollIntoView()
            ele.click()
            cy.get(".m-latestinlineElement__block").children().then(($child) => {
                bandTemp = 0
                secBandTemp++
                cy.log("intento " + secBandTemp + " de 5")
                const item = $child.toArray()
                for (let i = 0; i < item.length; i++) {
                    if (item[i].innerText == "Artículo en Wishlist") {
                        bandTemp = 1
                        secBandTemp = 0
                        cy.get(".m-latestinlineElement__block").contains("Artículo en Wishlist").should('be.visible')
                        break;
                    }
                }
                if (bandTemp == 0 && secBandTemp < 5) {
                    cy.log(secBandTemp)
                    ele.click()
                    this.verifyElementsInWishlist()
                }
                if (secBandTemp == 5) {
                    cy.log(secBandTemp + " intentos fallidos")
                    cy.get(".m-latestinlineElement__block").contains("Artículo en Wishlist").should('be.visible')
                }
            })
        })
    }

    selectHeart() {
        cy.get('#wishlist-heart').click({ force: true })
    }

    selectHeartDesktop() {
        cy.get('.m-product__addToWishListTxt').click({ force: true })
    }

    heartSelected() {
        cy.get('svg > g > g:nth-child(2)').should('have.attr', 'style').should('contain', 'display: block;')
    }
}

export default wishlistPage;