/// <reference types="cypress" />

import { isMobile } from "../../support/pages/genericPage"

let celebrated, newEventName, search, groupName
let elementCount, elementCountAfter

const random = Math.floor(Math.random() * 100);
const randomCharacters = Math.random().toString(36).replace(/[^a-z]+/g, '').slice(0, 5);

class giftregistryPage {

    menuClick() {
        const menu = cy.get('.a-header__hamburger')
        menu.click()
        return this;
    }

    menu(value) {
        return cy.contains(value, { matchCase: false })
    }

    menuGiftRegistryMobile() {
        return cy.get('.icon-menu_mobile')
    }

    radioData() {
        return cy.get('#btnRadioForData').check()
    }

    searchData() {
        return cy.get('#btnHandleSearch').click()
    }

    typeName(value) {
        return cy.get('#txtName').type(value)
    }

    typeLastName(value) {
        return cy.get('#txtLastName').type(value)
    }

    searchResults() {
        //return cy.get('.tableResults')
        return cy.get('.contentTable')
    }

    giftList() {
        //cy.get('.tableResultsContainer .outlineSeeMore').then(($elements) => {
        if (isMobile()) {
            cy.get("div[style*='align-items: center'] > svg").then(($elements) => {
                // Get the number of elements
                const numElements = $elements.length;
    
                // Generate a random index
                const randomIndex = Math.floor(Math.random() * numElements);
    
                // Select the random element
                const randomElement = $elements[randomIndex];
    
                // Click on the random element or perform any action you want
                cy.wrap(randomElement).click();
            });
    
        } else {
            cy.get("button[class*='outlineSeeMore']").then(($elements) => {
                // Get the number of elements
                const numElements = $elements.length;
    
                // Generate a random index
                const randomIndex = Math.floor(Math.random() * numElements);
    
                // Select the random element
                const randomElement = $elements[randomIndex];
    
                // Click on the random element or perform any action you want
                cy.wrap(randomElement).click();
            });
    
        }
    }

    viewGiftProduct() {
        return cy.get('.product_0')
    }

    selectGiftProduct() {
        //return cy.get('.product')
        cy.get('[class^="product_"]').then($products => {
            const randomIndex = Math.floor(Math.random() * $products.length);
            cy.wrap($products).eq(randomIndex).click({ force: true });
        });

        return this;
    }

    giftRadio() {
        return cy.get('#productModal > .modal-dialog > .modal-content > .modal-body .radio')
    }

    giftRadioSelect() {
        cy.wait(1500)
        cy.get('#productModal .radio').then($radio => {
            const randomIndex = Math.floor(Math.random() * $radio.length)
            const selectedRadio = $radio.eq(randomIndex)
            cy.wrap(selectedRadio).find('input[type="radio"]').click({ force: true })
            cy.wait(2000)
            
            // Get the text of the selected radio button
            celebrated = selectedRadio.text().trim()

            cy.log(`Festejado: ${celebrated}`)

        })
    }

    /*
    selectCelebratedDesktop() {
        cy.get('#selectedPersonName').select(0)
    }
    */

    // --- Create gift registry ---

    typeBigDate() {
        if (isMobile()) {
            return cy.get(':nth-child(3) > .logoContent > a > picture > img')
        } else {
            return cy.get('.logoContentCelebration')
        }
    }

    typeAllOccasions() {
        if (isMobile()) {
            return cy.get(':nth-child(4) > .logoContent > a > picture > img')
        } else {
            return cy.get('.logoContentCelebration')
        }
    }

    dropdownCelebration() {
        return cy.get('#selectTypeCelebration')
    }

    // Festejado 1
    dropdownCelebrated() {
        return cy.get('#title')
    }
    inputMotherLastName() {
        return cy.get('#middlename')
    }

    // Fetejado 2
    dropdownCelebrated2() {
        return cy.get('#id')
    }

    inputFirstName2() {
        return cy.get('#firstname1')
    }

    inputLastName2() {
        return cy.get('#lastname1')
    }

    inputMotherLastName2() {
        return cy.get('#motherName1')
    }

    inputCalendar() {
        cy.get('#calendar1').click()
        cy.get(':nth-child(1) > .react-calendar__decade-view__years__year').click()
        cy.get(':nth-child(1) > .react-calendar__year-view__months__month').click()
        cy.get(':nth-child(1) > .react-calendar__month-view__days__day').click()
    }

    // Datos del evento
    eventDate() {
        cy.get('#txtEventDate').click()
        cy.get('.react-calendar__navigation__label').click()
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get(':nth-child(1) > .react-calendar__year-view__months__month').click()
        cy.get(':nth-child(1) > .react-calendar__month-view__days__day').click()
    }

    eventName(name) {
        //const random = Math.floor(Math.random() * 100);
        cy.get('#txtEventName').type(`${name}${random}`);
    }

    selectState() {
        return cy.get('#selectState')
    }

    selectStore() {
        return cy.get('#selectStore')
    }

    radiobuttonAddress() {
        return cy.get('[type="radio"]')
        //return cy.get('.oneAddress')
    }

    checkboxAddress() {
        return cy.get('[type="checkbox"]')
    }

    addressPriority() {
        return cy.get('#addressPriority')
    }

    contract() {
        return cy.get('#contract')
    }

    contractDesktop() {
        return cy.get('.pdfContent')
    }

    // -- Event info ---

    adminInfo() {
        return cy.get('.adminInfo')
    }

    eventInfo() {
        return cy.get('.eventInfo > > > .icon-flecha_lightsvg_derecha')
    }

    modifyEventName() {
        const random = Math.floor(Math.random() * 100);
        newEventName = `Evento${random}`
        cy.get('#eventName').clear().type(newEventName);
    }

    compareEventName() {
        if (isMobile()) {
            cy.get('.col-xs-7 > h3').then(($name) => {
                const text = $name.text()
                cy.log(text)
                expect(newEventName).to.equal(text)
            })
        } else {
            cy.get('.displayInline').then(($name) => {
                const text = $name.text()
                cy.log(text)
                expect(newEventName).to.equal(text)
            })
        }
    }

    eventDetailsDesktop() {
        return cy.get('.icon-datos_de_mi_evento')
    }

    editNameDesktop() {
        return cy.get('.editNameIcon')
    }

    // --- Tarjeta de festejado ---

    celebratedGift() {
        return cy.get('.celebratedGift')
    }

    celebratedNumber() {
        return cy.get('.celebratedNumber')
    }

    barcode() {
        return cy.get('.barcode')
    }

    // --- OPC Gift Registry ---

    celebratedName() {
        cy.get('.a-inlineElement--giftTableName').then(($name) => {
            const text = $name.text()
            cy.log(text)
            expect(celebrated).contain(text)
        })
    }

    // --- Preferencia de regalo ---

    dropdownEvent() {
        return cy.get('#select-gr__id')
    }

    radioButtonGift(value) {
        cy.get('[type="radio"]').check(value)
    }

    addButtonGR() {
        return cy.get('#addGRButton')
    }

    // --- GIFT LIST ---

    iconRight() {
        return cy.get('.tableRegisteredGifts .iconRight')
    }

    favIcon() {
        return cy.get('.form-group > .contentFavGift > .select')
    }

    favIconDesktop() {
        return cy.get('.favouriteGift').first().scrollIntoView()
    }

    giftCheckbox() {
        if (isMobile()) {
            cy.get('.tableRegisteredGifts > tbody > tr > .selectRegister > .checkbox').then(($elements) => {
                elementCount = $elements.length
                cy.log(elementCount)
                cy.wrap($elements.eq(0)).click();
            });
        } else {
            cy.get('.tableRegisteredGifts .checkbox').then(($elements) => {
                elementCount = $elements.length
                cy.log(elementCount)
                cy.wrap($elements.eq(0)).click();
            });
        }
    }

    acceptBtnModal() {
        cy.intercept('POST', '/api/getRegalosRegistrados').as('waitGifts')
        if (isMobile()) {
            cy.contains('Aceptar', { matchCase: false }).click()
        } else {
            cy.get('.modal_buttons > .btnPrimaryAction').click()
        }
        cy.wait('@waitGifts')//.its('response.statusCode').should('satisfy', (statusCode) => statusCode === 200 || statusCode === 304);
    }

    verifyDeletedItem() {
        //cy.wait(500)
        cy.get('.tableRegisteredGifts .checkbox').then(($elements) => {
            elementCountAfter = $elements.length
            expect(elementCount).to.not.equal(elementCountAfter)
        });
    }

    deleteItem() {
        if (isMobile()) {
            return cy.get('.deletebarItem')
        } else {
            return cy.get('.col-sm-2 > .editButtons')
        }
    }

    searchItem(value) {
        search = value
        cy.get('#searchArea').type(`${search}{enter}`)
    }

    // ---  ---

    matchResult() {
        return cy.get('.tableRegisteredGifts').contains(search, { matchCase: false })
    }

    giftMode(value) {
        if (isMobile()) {
            cy.get('#menu_chooseParent1').click()
            cy.get(`[data-value=${value}] > a`).click()
        } else {
            cy.get('.noBorder > #chooseParent').then(($select) => {
                cy.wrap($select.eq(0)).select(value);
                cy.wait(500)
                cy.get($select).eq(0).invoke('val').should('eq', value)
            });
        }
    }

    editMap() {
        if (isMobile()) {
            return cy.get('.table-name')
        } else {
            return cy.get('.editMesa')
        }
    }

    editList() {
        return cy.get('.subtitleModule')
    }

    titleList() {
        if (isMobile()) {
            return cy.get('.titleList')
        } else {
            return cy.get('.titleSection')
        }

    }

    addInvited() {
        if (isMobile()) {
            return cy.get('.btnPrimarySpecial')
        } else {
            return cy.get('.specialLink')
        }

    }

    invitedName() {
        cy.get('[name="firstname"]').first().type('Invitado')
        cy.get('[name="lastName"]').first().type(`${randomCharacters}`)
    }

    saveInvited() {
        if (isMobile()) {
            cy.get('.mainContent .btnSecondary').filter(':contains(Guardar)').last().click()
        } else {
            cy.get('.addGuestFormButton .btnPrimaryAction').filter(':contains(Guardar)').first().click()
        }

    }

    editInvited() {
        if (isMobile()) {
            cy.get('.guestList .icon-flecha_gruesa_derecha').eq(2).click()
        } else {
            cy.scrollTo('bottom')
            cy.get('tbody .menuIcon > .icon-menu_puntos').last().click()
            cy.get('[style="display: block;"] [data-target="#editGroup"]').click()
        }
    }

    checkInvited() {
        return cy.get('.checkContent [type="checkbox"]')
    }

    deleteInvited() {
        if (isMobile()) {
            cy.get('.icon-basura').click()
            cy.get('.btnPrimaryAction').contains('Eliminar').click()
        } else {
            cy.scrollTo('bottom')
            cy.get('tbody .menuIcon > .icon-menu_puntos').last().click()
            cy.get('[style="display: block;"] [data-target="#deleteGroup"]').click()
            cy.get('.modal-content .btnPrimaryAction').contains('Eliminar').click()
        }
    }

    addCompanion() {
        if (isMobile()) {
            return cy.get('[data-target="#guestModal"]')
        } else {
            return cy.get('.addCompanion')
        }
    }

    modalFirstName() {
        const guest = `Acompañante ${randomCharacters}`
        if (isMobile()) {
            cy.get('.modal-body [name="firstname"]').first().type(guest)
            cy.get('.btnSecondary').contains('Guardar').click()
            cy.get('.mainContent > .btnSecondary').contains('Guardar').click()
            cy.contains(guest)
        } else {
            cy.get('.panel-collapse [name="firstname"]').first().type(guest)
            cy.get('.addGuestFormButton').contains('Guardar').click()
            cy.contains(guest)
        }

    }

    editCompanion() {
        cy.contains('Editar').click()
    }

    selectCompanion() {
        if (isMobile()) {
            cy.get('#loading-image').should('not.be.visible')
            cy.scrollTo('center')
            cy.wait(3000)
            cy.get('.checkContent [data-type="guest"]').first().parents().children('.icon-flecha_gruesa_derecha').click()
            cy.wait(3000)
        } else {
            cy.wait(3000)
            cy.scrollTo('center')
            cy.wait(3000)
            cy.get("[class*='menuIcon']").first().click()
            cy.wait(3000)
        }
    }

    editModalLastName() {
        cy.get("input[name='lastName']").clear().type(`${randomCharacters}`)
    }

    editModalSave() {
        cy.get("[class*='addGuestFormButton']").contains('Guardar').click()
    }

    deleteCompanion() {
        if (isMobile()) {
            return cy.contains('Eliminar')
        } else {
            return cy.get("[data-toggle='modal'] .icon-basura").first()
        }
    }

    // --- Grupos ---

    groups() {
        return cy.get('.groupsDiv > .icon-flecha_lightsvg_derecha')
    }

    typeGroup() {
        groupName = `Grupo ${randomCharacters}`
        cy.get('#newGroupName_Modal').type(groupName)
    }

    createGroup() {
        cy.get('.createGroupCont').filter(':contains(Crear)').click()
    }

    validateGroupName() {
        return cy.contains(groupName)
    }

    editGroup() {
        return cy.get('.groupList >')
    }

    editGroupName() {
        groupName = `Grupo ${randomCharacters}`
        cy.get('#txtGroupName_Modal').clear().type(groupName)
    }

    saveEditGroupName() {
        return cy.get('[name="edit Group"]')
    }

    deleteGroupName() {
        return cy.get('.modal-body > .btnSecondarySpecialCustom')
    }

    acceptDelete() {
        return cy.get('.mainContent .btnPrimaryAction')
    }

    selectGroup() {
        cy.get('#groupModal [type="radio"]').first().click()
        cy.wait(500)
        cy.get('.groupTable tr').first().then(($group) => {
            groupName = $group.text()
            cy.log(groupName)
            cy.contains(groupName).should('be.visible')
        })
    }

    selectGiftRegistry() {
        cy.get('body').then(($body) => {
            if ($body.find('.changeWeddingOn').length > 0) {
                cy.get('.changeWeddingOn').last().click({ force: true })
            }
        })
    }

    // Create New Event

    coOwnerFirtsName() {
        return cy.get('#coOwner_firstname')
    }

    coOwnerLastName() {
        return cy.get('#coOwner_lastname')
    }

    coOwnerMotherName() {
        return cy.get('#coOwner_motherName')
    }

    celebratedCalendar() {
        cy.get(':nth-child(6) > #datetimepicker2 #calendar').click()
        cy.get(':nth-child(4) > .react-calendar__decade-view__years__year').click()
        cy.get(':nth-child(4) > .react-calendar__year-view__months__month').click()
        cy.get(':nth-child(4) > .react-calendar__month-view__days__day').click()
    }

    celebrated2Calendar() {
        cy.get('#calendar1').click()
        cy.get(':nth-child(4) > .react-calendar__decade-view__years__year').click()
        cy.get(':nth-child(4) > .react-calendar__year-view__months__month').click()
        cy.get(':nth-child(4) > .react-calendar__month-view__days__day').click()
    }

    infoEvent() {
        cy.get('#txtEventDate').click()
        cy.get('.react-calendar__navigation__label').click()
        //cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__year-view__months__month')
            .filter((index, element) => {
                return !Cypress.$(element).attr('disabled')
            }).last().click()
        cy.get('.react-calendar__month-view__days__day')
            .filter((index, element) => {
                return !Cypress.$(element).attr('disabled')
            }).last().click()
    }

    buttonDownload() {
        return cy.get('.br > .basicLinks')
    }

    verifyDownload() {
        const nombreArchivoDescargado = 'cypress/downloads/giftList.pdf';

        cy.readFile(nombreArchivoDescargado).then((archivo) => {
            expect(archivo).to.have.length.above(0);
        });
    }

}

export default giftregistryPage;