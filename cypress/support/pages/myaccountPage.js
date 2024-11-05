/// <reference types="cypress" />

import { isMobile, isStore } from '../pages/genericPage'

let newAddress, gender, selectStore, newCard
let store = Cypress.env('STORE');
let site = Cypress.env('SITE');

class myaccountPage {
    mcLoginElements() {
        //login button
        cy.contains('Iniciar sesión')
        //Create account
        cy.contains('Crear cuenta')
        //Facebook login
        cy.contains('Continuar con Facebook')
        //Apple ID
        cy.contains('Continuar con Apple')
    }

    typeEmailToCA(value) {
        const email = cy.get('#email');
        email.type(value);
        return this;
    }

    typePassToCA(value) {
        const pass = cy.get('#password');
        pass.type(value);
        return this;
    }

    createAccountBtnClick() {
        const button = cy.get('button:contains("Crear cuenta")');
        button.click();
    }

    selectPayForm() {
        //cy.get('.menuMotion > #address1').first().click({force : true})
        cy.get('.menuMotion > .a-box__actionAddress > .icon-more_vert').first().click({ force: true })
        cy.wait(500)
        cy.contains('Marcar como predeterminado').click({ force: true })
        //y.get('.a-menuMotion__link').first().click({force : true})
    }

    // --- 👍 ---

    menuOptions() {
        if (isStore('liverpool')) {
            this.selectMenuOption('Datos y preferencias')
            this.selectMenuOption('Mi cartera')
            this.selectMenuOption('Direcciones')
            //this.selectMenuOption('Mis compras')
            this.selectMenuOption('Wishlist')
        } else {
            //this.selectMenuOption('Mis compras')
            this.selectMenuOption('Cupones')
            this.selectMenuOption('Mi cartera')
            this.selectMenuOption('Direcciones')
        }

    }

    selectMenuOption(option) {
        if (isMobile()) {
            if (isStore('liverpool')) {
                cy.get('.container-mobile-account').contains(option, { matchCase: false }).click()
            } else {
                cy.get('.col-lg-3').contains(option, { matchCase: false }).click()
            }
        } else {
            if (isStore('liverpool')) {
                //cy.get('.asideAcount').contains(option, { matchCase: false }).click()

                if (!isMobile()) {
                    cy.get('.item-menu-container').contains(option, { matchCase: false }).click()
                } else {
                    cy.contains(option, { matchCase: false }).click()
                }
            } else {
                cy.get('.col-lg-3').contains(option, { matchCase: false }).click()
            }

        }
        this.urlOptions(option)
    }

    urlOptions(option) {
        switch (option) {
            case "Datos y preferencias":
                if (isMobile()) {
                    cy.url().should('equal', 'https://' + site + '.' + store + '.com.mx/tienda/users/myAccountDetails')
                    cy.get('.icon-back').click()
                } else {
                    cy.get('[href="/tienda/users/updateProfile"]').should('be.visible')
                    cy.get('[href="/tienda/users/confirmChangePassword"]').should('be.visible')
                }
                break

            case "Mi cartera":
                if (isMobile()) {
                    cy.url().should('equal', 'https://' + site + '.' + store + '.com.mx/tienda/users/defaultsPayments')
                    cy.get('.icon-back').click()
                } else {
                    cy.url().should('equal', 'https://' + site + '.' + store + '.com.mx/tienda/users/defaultsPayments')
                }
                break

            case "Direcciones":
                if (isMobile()) {
                    cy.url().should('equal', 'https://' + site + '.' + store + '.com.mx/tienda/users/addressBook')
                    cy.get('.m-menuBack').click()
                } else {
                    cy.url().should('equal', 'https://' + site + '.' + store + '.com.mx/tienda/users/addressBook')
                }
                break

            case "Mis compras":
                if (isMobile()) {
                    cy.url().should('equal', 'https://' + site + '.' + store + '.com.mx/tienda/users/miscompras')
                    cy.get('.icon-back').click()
                } else {
                    cy.url().should('equal', 'https://' + site + '.' + store + '.com.mx/tienda/users/miscompras')
                }
                break

            case "Wishlist":
                if (isMobile()) {
                    cy.url().should('equal', 'https://' + site + '.' + store + '.com.mx/tienda/users/wishlist')
                    cy.get('.icon-back').click()
                } else {
                    cy.url().should('equal', 'https://' + site + '.' + store + '.com.mx/tienda/users/wishlist')
                }
                break

            case "Beneficios":
            case "Cupones":
                if (isMobile()) {
                    cy.url().should('equal', 'https://' + site + '.' + store + '.com.mx/tienda/users/coupons')
                    cy.get('.icon-back').click()
                } else {
                    cy.url().should('equal', 'https://' + site + '.' + store + '.com.mx/tienda/users/coupons')
                }
                break

            default:
                break
        }
    }

    // --- ---

    selectAddress() {
        const addressSelected = cy.get('.menuMotion > #address1').first()
        addressSelected.parents('#opc_myAccount_cards >').find('.a-cards__titleCard').within(($name) => {
            selectStore = $name.text()
        })
        addressSelected.click({ force: true })
        cy.wait(200)
        cy.get('.a-menuMotion__link').first().click({ force: true })
    }

    verifyPredeterminate() {
        cy.contains("Predeterminada").parents(".col-11").contains(selectStore)
    }

    addressShortNameMc(value) {
        if (value == 'sameName') {
            newAddress = value
        } else {
            newAddress = value + Math.floor(Math.random() * 100)
        }

        cy.get('#addressChain-alias').clear().type(newAddress)
    }

    typeFirstNameMc(value) {
        cy.get('#name').clear().type(value)
    }

    typeLastNameMc(value) {
        cy.get('#lastName').clear().type(value)
    }

    typeZipMc(value) {
        //cy.get('#cp').type(value)
        cy.get('#addressChain-zipCode').clear().type(value)
    }

    typeZipCc() {
        return cy.get('#postalCode')
    }

    typeCityMc(value) {
        cy.get('#city').type(value)
    }

    typeStreetMc(value) {
        cy.get('#street').type(value)
    }

    typeNoExtMc(value) {
        cy.get('#numext').type(value)
    }

    typeLadaMc(value) {
        cy.get('#lada').type(value)
    }

    typePhoneMc(value) {
        cy.get('[name="phone"]').type(value)
    }

    typeCellPhoneMc(value) {
        cy.get('#cellphone').type(value)
    }

    typeStateMc() {
        cy.get('[name="country"]').select(Math.floor(Math.random() * 32))
    }

    typeMunicipalityMc() {
        cy.get('[name="municipality"]').select(1)
    }

    typeColonyMc() {
        cy.get('[name="colony"]').select(1)
    }

    messageSameName(error) {
        cy.contains(error).should('be.visible')
    }
    messageErrorName() {
        cy.get('.m-input-helper__text > #helper-text-id').should('be.visible')
    }

    addressFindDeleteMc() {
        cy.wait(1000)
        cy.scrollTo('center')
        cy.contains(newAddress).parents("#opc_myAccount_cards >").within(($name) => {
            cy.get('.menuMotion > #address1 > .icon-more_vert').click()
            cy.contains('Eliminar').click()
        })
    }

    addressFindDeleteCCMc() {
        cy.wait(1000)
        cy.scrollTo('center')
        cy.contains(selectStore).parents("#opc_myAccount_cards >").within(($name) => {
            cy.get('.menuMotion > #address1 > .icon-more_vert').click()
            cy.contains('Eliminar').click()

        })
        cy.wait(500)
        cy.get('#opc_addressdeleteStore').click()
    }

    addressCloseMc() {
        return cy.get('button.close > .icon-close').click()
    }

    messageErrorCp() {
        cy.get('.-warning > > .m-mdc__snackbarLabel').should('be.visible')
    }

    notExistAddress() {
        cy.get(newAddress).should('not.exist')
    }

    updateAccount() {
        cy.get("input[name='gender']:checked").invoke('val')
            .then(value => {
                gender = value
                cy.log(value)
                if (value == "female")
                    cy.get('#male').check()
                else
                    cy.get('#female').check()
            });
    }

    verifyUpdate() {
        cy.get('#' + gender).should('not.be.checked')
    }

    updateButton() {
        cy.get('.order-1 > .a-btn').click({ force: true })
    }

    selectStore() {
        const selected = Math.floor(Math.random() * 32)
        cy.get('#o-myAccount__addStore--input').select(selected)
        cy.get("input[name='storeSelection']:checked").parents(".o-myAccount__addStore--store--container > .align-items-center").children(".col-10").within(($name) => {
            selectStore = $name.text()
            cy.log($name.text())
        })
        cy.log(selectStore)
    }

    compareName() {
        cy.wait(1000)
        cy.contains(selectStore)
    }

    verifyGiftNotRemove() {
        cy.wait(2000)
        return cy.get('.m-flag-item').parents("#opc_myAccount_cards >").within(($name) => {
            cy.get('.menuMotion > #address1 > .icon-more_vert').click()
            cy.contains('Eliminar').should('not.exist')
        })
    }

    verifyExistCards() {
        cy.get('.m-box').should('exist')
    }

    myCards() {
        cy.wait(500)
        cy.get('#opc_myCards').click()
    }

    selectEditCard() {
        cy.wait(1000)
        cy.get('#address1 > .icon-more_vert').last().click()
        cy.wait(500)
        const button = cy.get('.dropdown-menu').last().contains("Editar")
        button.click({ force: true })
    }

    selectEditCardPredeterminated() {
        cy.wait(1000)
        cy.get('#address1 > .icon-more_vert').first().click()
        cy.wait(500)
    }

    verifyExistDeleteOption() {
        const button = cy.get('.dropdown-menu').first().contains("Eliminar").should('not.exist')
    }

    nickNameCard() {
        return cy.get('.m-inputText > #nickname').last()
    }

    typeNickNameCard() {
        newCard = 'Random ' + Math.floor(Math.random() * 100)
        this.nickNameCard().type(newCard)
    }
    fullNameUser() {
        return cy.get('.m-inputText > #fullNameUser').last()
    }

    postalCode() {
        return cy.get('#postalCode')
    }

    address() {
        return cy.get('#address1')
    }

    exteriorNumber() {
        return cy.get('#exteriorNumber')
    }

    clearCamps() {
        this.nickNameCard().clear({ force: true })
        this.fullNameUser().clear({ force: true })
        this.postalCode().clear({ force: true })
        this.address().clear({ force: true })
        this.exteriorNumber().clear({ force: true })
    }

    card() {
        cy.get('.col-lg-12').first().get('.menuMotion > #address1 > .icon-more_vert').should('not.exist')
    }

    updatedCard() {
        return cy.get('.-success > .m-mdc__snackbarSurface > .m-mdc__snackbarLabel')
    }

    binCardImage() {
        return cy.get('.img-card__position')
    }

    creditCardNumber() {
        return cy.get('#creditCardNumber')
    }

    addCardButton() {
        cy.get('.order-1 > .a-btn').click({ force: true })
    }

    cardDelete() {
        cy.wait(1000)
        cy.scrollTo('center')
        cy.contains(newCard).parents(".m-box").within(() => {
            cy.get('.menuMotion > #address1 > .icon-more_vert').click()
            cy.contains('Eliminar').click()
        })
    }

    verifyDeletedCard() {
        cy.contains(newCard).should('not.exist')
    }

    dudaSeccion() {
        return cy.get('.col-12 > :nth-child(6) > :nth-child(1) > :nth-child(1)')
    }

    // --- Vales Card ---

    imgSodexo() {
        cy.get('.img-card__position').invoke('attr', 'src').then((text) => {
            expect(text).to.include('pluxee');
        });
    }

    getBannerContainer() {
        return cy.get('.bannerContainer')
    }

    getAddressContainer() {
        return cy.get('.containerNoData')
    }

    getWalletContainer() {
        return cy.get('.containerWallet')
    }

    getWishlistContainer() {
        return cy.get('.containerWishlist > .headerWishlist')
    }

    getGiftRegistryContainer() {
        return cy.get('.containerGift > .headerWishlist')
    }

    getQuickAccessContainer() {
        return cy.get('.containerGift > .headerWishlist')
    }

    menuOptionsHome() {
        this.getAddressContainer().contains('Agregar dirección').click()
        cy.url().should('contain', 'https://' + site + '.' + store + '.com.mx/tienda/users/addAddress')
        cy.get('.item-menu-container').contains('Mi cuenta').click()
        this.getWalletContainer().contains('Gestionar formas de pago').click()
        cy.url().should('contain', 'https://' + site + '.' + store + '.com.mx/tienda/users/defaultsPayments')
        cy.get('.item-menu-container').contains('Mi cuenta').click()
        this.getWishlistContainer().contains('Crear lista').click({ force: true })
        cy.url().should('contain', 'https://' + site + '.' + store + '.com.mx/tienda/users/wishlist')
        cy.get('.item-menu-container').contains('Mi cuenta').click()
        this.getGiftRegistryContainer().contains('Ver todas').click()
        cy.url().should('contain', 'https://mesaderegalos.liverpool.com.mx/')
    }

    // --- Dashboard ---
    containerCard() {
        cy.get('.containerWallet [src="/static/images/myAccount/card_general.svg"]').should('be.visible')
    }

    containerAddress() {
        cy.get('.containerAddress .titleAddress').should('be.visible')
        cy.get('.containerAddress .nameAddress').should('be.visible')
    }

    grEventIcon() {
        if (isMobile()) {
            return cy.get(':nth-child(4) > .mobile-account-menu .icons-color-mobile')
        } else {
            return cy.get('.justify-content-center > .d-flex')
        }
    }

    grActiveGreenLabel() {
        if (isMobile()) {
            return cy.get('.color-arrow-style > .containerLabelGift')
        } else {
            return cy.get('.gift > .containerLabelGift')
        }
    }

    quickAccesButtons() {
        cy.get('[index="0"] .quick-access-text').should('contain', 'Datos personales')
        cy.get('[index="1"] .quick-access-text').should('contain', 'Beneficios')
        cy.get('[index="2"] .quick-access-text').should('contain', 'Ayuda')
        cy.get('[index="3"] .quick-access-text').should('contain', 'Garantías y devoluciones')
    }

    addressUrl() {
        cy.url().should('contain', 'https://' + site + '.' + store + '.com.mx/tienda/users/addAddress')
    }

    addCardUrl() {
        cy.url().should('contain', 'https://' + site + '.' + store + '.com.mx/tienda/users/myAccount')
    }

    orderDetails() {
        return cy.get('.orderDetails')
    }

    recentOrdersContainer() {
        return cy.get('.recentOrdersContainer')
    }

    iconMyAccount() {
        cy.get('img.icons-color').invoke('attr', 'src')
            .then((src) => {
                // Log the src to the console or perform assertions
                cy.log('Image src:', src)
                expect(src).to.equal('/static/images/myAccount/iconsMenu/myAccount.svg')
            });
    }

    bgColorItemSelect() {
        cy.get('.container-item-select')
            .invoke('css', 'background-color')
            .then((bgColor) => {
                cy.log('Background color:', bgColor)
                expect(bgColor).to.equal('rgb(252, 230, 245)')
            });
    }

    email() {
        const generateRandomEmail = () => {
            const randomString = Math.random().toString(36).substring(2, 10);
            return `${randomString}@eliminarcorreo.com`;
        };

        const randomEmail = generateRandomEmail();
        cy.get('#email').type(randomEmail);
        return randomEmail; // Return the email if needed
    }   

    pass() {
        return cy.get('#password')
    }

    datePick() {
        cy.get('#daySelectorLabel').select('1')
        cy.get('#monthSelectorLabel').select('Ene')
        cy.get('#yearSelectorLabel').select('2024')
    }

    btnCreateAcc() {
        return cy.get('button:contains("Crear cuenta")')
    }
}

export default myaccountPage;