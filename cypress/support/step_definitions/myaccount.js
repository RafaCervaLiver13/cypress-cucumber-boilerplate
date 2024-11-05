import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import myaccountPage from '../pages/myaccountPage'
import genericPage, { isMobile } from '../pages/genericPage'

const mc = new myaccountPage()
const generic = new genericPage()

Then('log in with user erroneo', () => {
    generic.typeEmail("liver.prod31@yopmail.com")
    generic.typePass("error")
    generic.loginBtnClick()
})

Then('verify login elements', () => {
    mc.mcLoginElements()
})

Then('create account with {string}', (error) => {
    switch (error) {
        case "cuenta existente":
            mc.typeEmailToCA("liver.prod31@yopmail.com")
            mc.typePassToCA("Abcd12345")
            break;
        case "correo invalido":
            mc.typeEmailToCA("liver.prod31")
            mc.typePassToCA("Abcd1234")
            break;
        default:
            mc.typeEmailToCA("liver.prod31@yopmail.com")
            mc.typePassToCA("Abcd123")
            break;
    }
    mc.createAccountBtnClick()
})

Then('verify {string} of error', (mensaje) => {
    generic.text(mensaje)
})

Then('check the options in the my account menu', () => {
    mc.menuOptions()
})

Then('change default payment method', () => {
    mc.selectPayForm()
    generic.text("Predeterminada")
})

Then('change default address', () => {
    mc.selectAddress()
    generic.text("Predeterminada")
})

Then('verify default payment change', () => {
    mc.verifyPredeterminate()
})

Then('add container details in my account', () => {
    mc.addressShortNameMc('Random')
    mc.typeFirstNameMc('Mario')
    mc.typeLastNameMc('Perez')
    // Dirección de envío
    mc.typeZipMc('05348')
    cy.wait(1000)
    mc.typeStreetMc('Mario Pani')
    mc.typeNoExtMc('200')
    mc.typeCellPhoneMc('5512345678')
    //mc.typeLadaMc('555')
    mc.typePhoneMc('5512345678')
    mc.typeCityMc('CDMX')
})

Then('select button aceptar', () => {
    cy.get('.order-1 > .a-btn').click({ force: true })
})

Then('add recipient details con {string}', (error) => {
    // Datos del destinatario
    if (error == 'El nombre corto ingresado ya está siendo usado.') {
        mc.addressShortNameMc('sameName')
    }
    mc.typeFirstNameMc('Mario')
    mc.typeLastNameMc('Perez')
    // Dirección de envío
    mc.typeZipMc('05348')
    mc.typeStreetMc('Mario Pani')
    mc.typeNoExtMc('200')
    mc.typeCellPhoneMc('5512345678')
    //mc.typeLadaMc('555')
    mc.typePhoneMc('5512345678')
    mc.typeCityMc('CDMX')
    cy.get('.order-1 > .a-btn').click({ force: true })
})

Then('verify messages {string} in form', (error) => {
    if (error == 'El nombre corto ingresado ya está siendo usado.') {
        mc.messageSameName(error)
    } else {
        mc.messageErrorName()
    }
})

Then('add cp {string} in my account', (value) => {
    mc.typeZipMc(value)
    mc.typeCityMc('CDMX')
})

Then('verify that there are no letters within the CP field', () => {
    mc.typeZipCc().scrollIntoView().wait(500).clear().type("1werty2")
    mc.typeZipCc().should('have.value', '12')
})

Then('select state, delegation or municipality, colony or settlement in my account', () => {
    cy.wait(1000)
    mc.typeStateMc()
    cy.wait(1000)
    cy.get('[name="municipality"]').scrollIntoView().should('be.visible')
    mc.typeMunicipalityMc()
    cy.wait(1000)
    mc.typeColonyMc()
})

Then('removes previously added delivery address in my account', () => {
    mc.addressFindDeleteMc()
    generic.button('Aceptar').click()
})

Then('Validate error alert for invalid cp', () => {
    mc.messageErrorCp()
})

Then('check to remove a non-default delivery address', () => {
    mc.notExistAddress()
})

Then('update personal data', () => {
    mc.updateAccount()
})

Then('verify that information has been updated', () => {
    mc.verifyUpdate()
})

Then('select Update button', () => {
    mc.updateButton()
    cy.wait(1000)
})

Then('add new store', () => {
    mc.selectStore()
})

Then('verify that the store is added', () => {
    mc.compareName()
})

Then('removes previously added click and collect address', () => {
    mc.addressFindDeleteCCMc()
})

Then('verify that you cannot delete a delivery address associated with a gift table', () => {
    mc.verifyGiftNotRemove()
})

Then('Verify that the added cards are displayed', () => {
    mc.verifyExistCards()
})

Then('select button My cards', () => {
    mc.myCards()
    cy.wait(500)
})

Then('select non-default card', () => {
    mc.selectEditCard()
})

Then('select predeterminated card', () => {
    mc.selectEditCardPredeterminated()
})

Then('check the error messages with {string}', () => {
    mc.clearCamps()
    generic.button("Aceptar").click({ force: true })
    generic.text('Agregar un alias a tu tarjeta')
    generic.text('Es nombre completo es requerido')
    generic.text('Ingresa tu calle')
})

Then('check not to modify the card number', () => {
    mc.card()
})

Then('edit all fields on the card', () => {
    mc.clearCamps()
    mc.nickNameCard().type('Random ' + Math.floor(Math.random() * 100))
    mc.fullNameUser().type('Toto Salvio')
    mc.postalCode().type('04510')
    mc.address().type('Ciudad Universitaria')
    mc.exteriorNumber().type('100')
    generic.button("Aceptar").click({ force: true })
})

Then('verify that the card has been updated', () => {
    cy.wait(500)
    mc.updatedCard().should('be.visible')
})

Then('verify that does not show the delete option', () => {
    mc.verifyExistDeleteOption()
})

Then('add {string} in card number field', (bin) => {
    cy.wait(1000)
    mc.creditCardNumber().type(bin)
})

Then('verify {string} card number', (imagenName) => {
    cy.wait(250)
    mc.binCardImage().invoke('attr', 'alt').should('include', imagenName)
})

Then('verify that it does not show the card number image', () => {
    mc.binCardImage().should('not.exist')
})

Then('add new card', () => {
    generic.button('Agregar tarjeta').click({ force: true })
    cy.get('.o-singleCardInfo').should('be.visible')
    mc.typeNickNameCard()
    cy.wait(750)
    mc.creditCardNumber().type('45328596' + Math.floor(10000000 + Math.random() * 89999999))
    cy.wait(250)
    mc.fullNameUser().type('Toto Salvio')
    cy.wait(500)
    cy.contains("Casa").click({ force: true })
    mc.addCardButton()
})

// --- VALES ---

Then('fill card data with bin:{string}', (value) => {
    generic.button('Agregar tarjeta').click({ force: true })
    cy.get('.o-singleCardInfo').should('be.visible')
    mc.typeNickNameCard()
    mc.creditCardNumber().type(value + Math.floor(10000000 + Math.random() * 89999999))

    mc.fullNameUser().type('Toto Salvio')
    cy.contains("Casa").click({ force: true })
})

Then('displays the voucher type icon', () => {
    mc.imgSodexo()
})

// --- ---

Then('fills the card number with a card that is already registered', () => {
    cy.get('.o-singleCardInfo').should('be.visible')
    mc.typeNickNameCard()
    cy.wait(500)
    mc.creditCardNumber().type('4532859612345678')
    cy.wait(250)
    mc.fullNameUser().type('Toto Salvio')
    cy.wait(500)
    cy.contains("Aceptar").first().click({ force: true })
    mc.addCardButton()
})

Then('remove new non-default card', () => {
    mc.cardDelete()
    generic.button("Aceptar").click({ force: true })
})

Then('check deletion of non-default card', () => {
    mc.verifyDeletedCard()
})

Then('check the green mortgage home', () => {
    cy.contains('¿Qué es el crédito Hipoteca Verde', { matchCase: false })
})

Then('select it{string}', (opcion) => {
    cy.url().should('contain', 'https://www.liverpool.com.mx/tienda?s=hipoteca+verde')
    cy.get(':nth-child(2) > .o-blpPictureBrand__content > :nth-child(1) > .row >').contains(opcion).click({ force: true })
})

Then('Select any questions in the Questions section', () => {
    mc.dudaSeccion().scrollIntoView().wait(500)
})

Then('verify that the response is displayed', () => {
    mc.dudaSeccion().trigger('mousedown',)
    //*[@id="__next"]/div/div/section[10]/div/div/ul[6]/li/ul/li/a
    cy.get('#__next > div > div > section:nth-child(10) > div > div > ul:nth-child(7) > li > ul > li > a').should('exist')
})

Then('check option content {string}', (opcion) => {
    switch (opcion) {
        case "¿Qué necesito para comprar?":
            cy.get(':nth-child(5) > .o-blpPictureBrand__content > .col-12')
            break
        case "¿Cuáles son los requisitos?":
            cy.get(':nth-child(7) > .o-blpPictureBrand__content > .col-12')
            break
        default:
            cy.get(':nth-child(9) > .o-blpPictureBrand__content > .col-12')
            break
    }
})

Then('verify the Infonavit home redirection', () => {
    cy.url().should('contain', 'https://portalmx.infonavit.org.mx/')
})

// --- Dashboard ---

Then('The elements are displayed on the my account dashboard', () => {
    mc.getBannerContainer().should('be.visible')
    mc.getAddressContainer().should('be.visible')
    mc.getGiftRegistryContainer().should('be.visible')
    mc.getQuickAccessContainer().should('be.visible')
    mc.getWalletContainer().should('be.visible')
    mc.getWishlistContainer().should('be.visible')
})

Then('is correctly redirected to each container', () => {
    mc.menuOptionsHome()
})

Then('icon and active event shown when you have a gift table', () => {
    mc.grEventIcon().should('be.visible')
    mc.grActiveGreenLabel().should('be.visible')
})

Then('quick access buttons are displayed', () => {
    mc.quickAccesButtons()
})

Then('the default payment method is shown', () => {
    mc.containerCard()
})

Then('address and title of the default address are displayed', () => {
    mc.containerAddress()
})

Then('redirects to add address option', () => {
    mc.addressUrl()
})

Then('redirects to the add card option', () => {
    mc.addCardUrl()
})

Then('two orders are shown in my purchases card', () => {
    mc.orderDetails().should('have.length', 2)
})

Then('recent purchases card is not shown', () => {
    cy.wait(500)
    mc.recentOrdersContainer().should('not.exist')
})

Then('My account icon shown with pink shading', () => {
    mc.iconMyAccount()
    mc.bgColorItemSelect()
})

Then('enter email and password', () => {
    mc.email()
    mc.pass().type('Password99')
})

Then('select button create account', () => {
    mc.btnCreateAcc().click()
})

Then('enter user data', () => {
    cy.get('#input-user__name').type('Chanconcle')
    cy.get('#input-user__apaterno').type('Ruvalcaba')
    mc.datePick()
    cy.get('#male').check()
})

// --- Shipping Address --- 

// This only clicks a button element
When('select button {string} in my account', (name) => {
	cy.contains('button', name, { matchCase: false }).click({ force: true })
})