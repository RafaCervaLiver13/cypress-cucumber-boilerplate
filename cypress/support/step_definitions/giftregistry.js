import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import giftregistryPage from "../pages/giftregistryPage.js"
import genericPage, { isMobile } from "../../support/pages/genericPage"

const gr = new giftregistryPage()
const store = Cypress.env('STORE')
const generic = new genericPage()

// --- Gift Registry ---

// [ REV. ]

When('select gift table', () => {
    if (isMobile()) {
        generic.menuHam()
        //gr.menuClick()
        if (store === 'potterybarn' || store === 'gap') {
            gr.menu('Mesa de regalos').click({ force: true })
        } else {
            gr.menu('Servicios').click()
            gr.menu('Mesa de regalos').click({ force: true })
            cy.wait(3000)
        }
    } else {
        // desktop
        gr.menu('Mesa de regalos').click()
    }
    gr.selectGiftRegistry()
    cy.get('#loading-image').should('not.be.visible')
})

Then('select menu hamburger on gift table', () => {
    if (isMobile()) {
        gr.menuGiftRegistryMobile().click()
    }
})

// --- Gift list ---

Then('select next in gift table results', () => {
    if (isMobile()) {
        cy.contains('Siguiente', { matchCase: false })
    } else {
        // desktop
        cy.get('.start > .icon-flecha_gruesa_derecha').click()
    }
})

Then('select first gift', () => {
    cy.wait(1000)
    cy.get('.titleProduct').first().click()

})

Then('select celebrated', () => {
    gr.giftRadioSelect()
})

Then('select option {string} at the gift table', (menu) => {
    if (isMobile()) {
        cy.contains(menu).click()
    } else {
        gr.eventDetailsDesktop().click()
        cy.contains(menu).click()
    }
    cy.contains('Selecciona el tipo de mesa de regalos')
})

Then('select checkbox for a gift', () => {
    gr.giftCheckbox()
})

Then('select delete from gift list', () => {
    gr.deleteItem().click()
})

Then('select button accept in modal', () => {
    gr.acceptBtnModal()
})

Then('the gift is removed', () => {
    gr.verifyDeletedItem()
})

Then('select search by product or category', () => {
    if (isMobile()) {
        cy.contains('Buscar artículo', { matchCase: false }).click()
    } else {
        // Nothing
    }
})

// --- Update event name ---

Then('select my event data', () => {
    if (isMobile()) {
        gr.adminInfo().click()
        cy.contains('Datos de mi evento').click()
        //gr.saveEventName()
        gr.eventInfo().click()
    } else {
        gr.eventDetailsDesktop().click()
        gr.editNameDesktop().click()
    }
})

Then('modify event name', () => {
    gr.modifyEventName()
})

Then('update event name', () => {
    cy.wait(1000)
    gr.compareEventName()
})

Then('select save on event name', () => {
    if (isMobile()) {
        cy.contains('Guardar').click()
    } else {
        cy.get('.editEventNameButtons > .btnPrimaryAction').click()
    }
})

// --- ---

Then('select notifications at the gift table', (option) => {
    if (isMobile()) {
        cy.contains('Notificaciones').click()
    } else {
        cy.get('.notificationLogo').click()
    }
})

// --- END ---

Then('select in event menu {string}', (menu) => {
    if (isMobile()) {
        gr.adminInfo().click()
    } else {
        gr.eventDetailsDesktop().click()
    }
    cy.contains(menu).click()
})

// --- Tarjeta festejado

Then('verify celebration card', () => {
    gr.celebratedGift().should('be.visible')
    gr.celebratedNumber().should('be.visible')
    gr.barcode().should('be.visible')
})

// --- Contrato ---

Then('the contract is visible', () => {
    if (isMobile()) {
        gr.contract().should('be.visible')
    } else {
        gr.contractDesktop().should('be.visible')
    }
})


// --- Crear Mesa ---

Then('select the type of event {string}', (type) => {
    if (type == "Gran Día") {
        gr.typeBigDate().click()
    } else {
        gr.typeAllOccasions().click()
    }

})

When('select event type {string}', (type) => {
    gr.dropdownCelebration().select(type)
    cy.contains('Siguiente paso').click()
})

Then('enter party details', () => {
    // Festejado 1
    gr.dropdownCelebrated().select('Novio')
    gr.inputMotherLastName().type('Maradiaga')

    // Fetejado 2
    gr.dropdownCelebrated2().select('Novia')
    gr.inputFirstName2().type('Eiza')
    gr.inputLastName2().type('Gonzales')
    gr.inputMotherLastName2().type('Maradiaga')
    gr.inputCalendar()

    cy.contains('Siguiente paso').click()
})

Then('enter event data', () => {
    cy.intercept('POST', 'https://mesaderegalos.liverpool.com.mx/**').as('wait')
    cy.wait('@wait').its('response.statusCode').should('satisfy', (statusCode) => statusCode === 200);
    gr.eventDate()
    gr.eventName()
    gr.selectState().select('CDMX/Zona Metropolitana')
    gr.selectStore().select('Liverpool Santa Fe')
    cy.contains('Siguiente paso').click()
})

Then('enter where do you want to receive your gifts?', () => {
    cy.get('body').then(($body) => {
        if ($body.find('[type="radio"]').length > 0) {
            gr.checkboxAddress().first().check({ force: true })
        } else {
            gr.radiobuttonAddress().first().click()

            cy.get('body').then(($body) => {
                if ($body.find('#addressPriority').length > 0) {
                    cy.get('#addressPriority').select(1, { force: true })
                }
            })
        }
    })

    cy.contains('Siguiente paso').click()
})

Then('view contract in step 4', () => {
    //gr.contract().should('be.visible')
    cy.contains('Contrato')
    cy.contains('Termina Registro').should('be.visible')
})

// --- ---

Then('write name {string} and last name {string}', (name, lastname) => {
    gr.radioData()
    gr.typeName(name)
    gr.typeLastName(lastname)
})

Then('select the button search in data of the celebrated', (name, lastname) => {
    gr.searchData()
    cy.wait(1500)
})

Then('select search type of event {string}', (type) => {
    
    cy.get('#filterEvent').select(type)
})

Then('shows search results on gift table', () => {
    gr.searchResults().should('be.visible')
})

Then('select button view list', () => {
    gr.giftList()
})

Then('visualiza lista de regalos', () => {
    gr.viewGiftProduct().should('be.visible')
})



Then('shows the selected party in option', () => {
    gr.celebratedName()
})

Then('select button add to my bag at the gift table', () => {
    cy.get('.btnPrimarySpecial').click()
})

Then('shows error message when there are no events for the search criteria', () => {
    //cy.contains('No existen eventos para los criterios de búsqueda proporcionados, revisa tus datos e intenta nuevamente').should('be.visible')
    cy.contains('Sin resultados encontrados. Rectifica los datos ó ingresa una nueva búsqueda de mesa de regalos').should('be.visible')
})

// --- Notificación ---

Then('shows message no notifications exist', () => {
    cy.contains('No existen notificaciones').should('be.visible')
})

// --- Add to gr from pdp ---

Then('select event and radio button {string}', (type) => {
    gr.dropdownEvent().trigger('mousemove').select(1)
    gr.radioButtonGift(type)
    gr.addButtonGR().click()
})

Then('shows message you added a product to your table', () => {
    cy.contains('Agregaste 1 producto a tu mesa de regalos').should('be.visible')
})

// --- ---

Then('shows account statement', () => {
    if (isMobile()) {
        cy.get('.accountState').should('be.visible')
    } else {
        cy.get('.adminAccountStateContainer').should('be.visible')
    }
})

Then('select gift list item', () => {
    if (isMobile()) {
        gr.iconRight().first().click()
    }
})

Then('shows a star on the article', () => {
    if (isMobile()) {
        gr.favIcon().should('be.visible')
    } else {
        gr.favIconDesktop().should('be.visible')
    }
})

Then('search word {string}', (value) => {
    gr.searchItem(value)
})

Then('shows matches', () => {
    gr.matchResult()
})

Then('shows search message with 0 results', () => {
    cy.contains('Tu lista de regalos está vacía').should('be.visible')
})

Then('select gift mode {string}', (value) => {
    gr.giftMode(value)
})

// --- Invitados ---

Then('shows edit table map button', () => {
    gr.editMap().click({ force: true })
    cy.contains('Editar mesa').should('be.visible')
})

Then('display button edit list', () => {
    gr.editList().should('be.visible')
})

Then('view guest list', () => {
    gr.titleList().should('have.text', 'Lista de Invitados')
})

Then('select button add guest to guest list', () => {
    gr.addInvited().first().click()
})

Then('complete required fields', () => {
    gr.invitedName()
})

Then('guest guard', () => {
    gr.saveInvited()
})

Then('display guest message added to list', () => {
    cy.contains('Tu invitado se ha agregado correctamente a la lista').should('be.visible')
})

Then('guest edit', () => {
    //cy.intercept('POST', '**/api/fetchGuestList').as('wait')
    //cy.wait('@wait').its('response.statusCode').should('satisfy', (statusCode) => statusCode === 200);
    gr.editInvited()
})

Then('select guest', () => {
    if (isMobile()) {
        gr.checkInvited().last().check()
    }
})

Then('select delete in guests', () => {
    gr.deleteInvited()
})

Then('select add companion', () => {
    gr.addCompanion().click()
})

Then('write name of companion', () => {
    gr.modalFirstName()
})

Then('edit companion', () => {
    gr.editCompanion()
})

Then('select companion', () => {
    gr.selectCompanion()
})



Then('modify last name', () => {
    gr.editModalLastName()
    gr.editModalSave()
})

Then('remove companion', () => {
    gr.deleteCompanion().click()
    cy.contains('Eliminar').click()
})

// --- Grupos ---

Then('select groups', () => {
    gr.groups().click()
})

Then('select create a new group', () => {
    cy.get('.btnPrimaryAdd').click()
    gr.typeGroup()
    gr.createGroup()
})

Then('create new group', () => {
    cy.wait(500)
    gr.validateGroupName().should('be.visible')
})

Then('select Edit group', () => {
    gr.editGroup().first().click()
})

Then('edit the group name', () => {
    gr.editGroupName()
    gr.saveEditGroupName().click()
})

Then('edit group', () => {
    cy.wait(500)
    gr.groups().click()
    gr.validateGroupName().should('be.visible')
})

Then('delete group', () => {
    gr.deleteGroupName().click()
    gr.acceptDelete().first().click()
})

Then('assign group to guest', () => {
    cy.get('.mainContent').find('.groupsDiv').first().click()
})

Then('select group', () => {
    gr.selectGroup()
})

Then('search name {string} on guest list', (invited) => {
    cy.get('.serachIconGuestList > .input-group > #mount-point').type(invited)
    cy.wait(500)
    cy.get('.guestList').contains(invited)
})

Then('select filter', () => {
    cy.contains('Filtrar').click()
})

Then('sample filter {string}', (value) => {
    cy.get('#filter-modal-assist .modal-body').contains(value).click()
})

// Crear nueva mesa con un evento existente

When('log in with {string} and {string}', (email, pass) => {
    generic.typeEmail(email)
    generic.typePass(pass)
    generic.loginBtnClick()
    cy.get(".loader").should(($element) => {
        expect($element.length === 0 || !$element.is(':visible')).to.be.true;
    });
})

When('create new table', () => {
    cy.wait(1000)
    cy.get('body').then(($body) => {
        if ($body.find('.adminInfo').length > 0) {
            if (isMobile()) {
                gr.menuGiftRegistryMobile().click()
            }
            cy.contains("Crear nueva mesa").click({ force: true })
        } else {
            cy.contains("Crear Mesa de Regalos").click({ force: true })
        }
    })
})

When('select celebration: {string}', (celeb) => {
    gr.dropdownCelebration().select(celeb)
    cy.contains('Siguiente paso').click()

    switch (celeb) {
        case 'Primera Comunión':
        case 'XV años':
        case 'Otras Ceremonias Religiosas':
            // Tutor
            //gr.inputMotherLastName().type('Heinz')

            // Festejado
            gr.coOwnerFirtsName().type('test')
            gr.coOwnerLastName().type('test')
            gr.coOwnerMotherName().type('test')
            gr.celebratedCalendar()

            cy.contains('Siguiente paso').click()
            break

        case 'Open House':
            // Administrador
            gr.dropdownCelebrated().select('Festejado')
            //gr.inputMotherLastName().type('Heinz')

            cy.contains('Siguiente paso').click()
            break

        case 'Aniversario':
            // Festejado1
            gr.dropdownCelebrated().select('Esposa')
            // Festejado2
            gr.dropdownCelebrated2().select('Esposo')
            gr.inputFirstName2().type('test')
            gr.inputLastName2().type('test')
            gr.inputMotherLastName2().type('test')
            gr.celebrated2Calendar()

            cy.contains('Siguiente paso').click()
            break

        default:
            break;
    }

})

Then('Enter event details {string}', (name) => {
    gr.infoEvent()
    gr.eventName(name)
    gr.selectState().select('CDMX/Zona Metropolitana')
    gr.selectStore().select('Liverpool Santa Fe')
    cy.contains('Siguiente paso').click()
})

Then('accept the contract and finish registration', () => {
    //gr.contract().should('be.visible')
    cy.get('#checkboxAceptTerm').check()
    cy.contains('Termina Registro').click()
})

Then('click the download button', () => {
    gr.buttonDownload().click()
}) 

Then('verify that the file has been downloaded', () => {
    gr.verifyDownload()
})