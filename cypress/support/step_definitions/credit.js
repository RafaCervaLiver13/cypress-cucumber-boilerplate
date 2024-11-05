import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import creditPage from '../pages/creditPage'
import genericPage, { isMobile, isStore } from '../pages/genericPage'

const cr = new creditPage()
const generic = new genericPage()
let store = Cypress.env('STORE');

Then('check card movements', () => {
    cy.url().should('contain', 'https://micredito.' + store + '.com.mx/mis-tarjetas/movements-history')
    cr.containerMoves().should('be.visible')
    cy.wait(1000)
    cy.get('body').then(($body) => {
        if ($body.find('.MsPO4STLG0ptEd5UrRji >').length > 0) {
            cy.get('.MsPO4STLG0ptEd5UrRji >').its('length').then((length) => {
                cy.log(`Número de elementos encontrados: ${length}`);
                cy.wrap(length).as('numberMoves')
            });
        }else{
            cy.wrap(0).as('numberMoves')
        }
    })
})

Then('select main card', () => {
    cy.wait('@waitCredit').its('response.statusCode').should('satisfy', (statusCode) => statusCode === 200 || statusCode === 304);
    cy.get('.bg-light-gray > div > img').should('not.exist')
    cy.get('.Loading-module_imageWrapperStyle__LlecN > img').should('not.exist')
    cy.wait(500)
    cr.mainCard().click('center').wait(250)
})

Then('selecttarjeta med', () => {
    cy.wait(500)
    cy.wait('@waitCredit').its('response.statusCode').should('satisfy', (statusCode) => statusCode === 200 || statusCode === 304);
    cy.get('.bg-light-gray > div > img').should('not.exist')
    cr.medCard().click()
    cy.wait(500)
})

Then('select {string} of credit', (option) => {
    cy.wait(500)
    if (option == "Transferir a mi monedero digital") {
        generic.button(option).click({ force: true })
    } else {
        cy.get('.Ldy2kj7WQM6z6sGMXHWY').should('not.exist')
        cr.mainCardOptions().contains(option).click()
        cy.wait(3000)
        cy.get('body').then(($body) => {
            if ($body.find('.CvvValidator-module_modalBody__Rko3-').length > 0) {
                //cy.wait(1000)
                cy.intercept("https://pro-api." + store + ".com.mx/api/v2/card-validator").as('validator')
                cr.cvvCard()
                cr.nextButton()
                cy.wait(1000)
                //if (isStore("liverpool")) {
                //    cy.wait('@validator').its('response.statusCode').should('satisfy', (statusCode) => statusCode === 200 || statusCode === 304);
                //    cr.verifyCard().should('exist')
                //}
                cr.finishVerifyCard()
                cr.mainCardOptions().contains(option).click()
            }
        })
    }
})

Then('select Pay my credit card', () => {
    cy.get('.BW_6BLz6MtaPawV_yjxP').contains("Pagar tarjeta").click({ force: true })
    cy.wait(500)
    cy.get('body').then(($body) => {
        if ($body.find('.CvvValidator-module_modalBody__Rko3-').length > 0) {
            cr.cvvCard()
            cr.nextButton()
            cy.wait('@waitCredit').its('response.statusCode').should('satisfy', (statusCode) => statusCode === 200 || statusCode === 304);
            cy.get('.bg-light-gray > div > img').should('not.exist')
            cr.verifyCard().should('exist')
            cr.finishVerifyCard()
            cy.get('.BW_6BLz6MtaPawV_yjxP').contains("Pagar tarjeta").click({ force: true })
        }
    })
})

Then('verifica el formulario de monedero electrónico', () => {
    cr.modalDigitalCard()
})

Then('verify the display of the card landing', () => {
    cy.wait('@waitCredit').its('response.statusCode').should('satisfy', (statusCode) => statusCode === 200 || statusCode === 304);
    cy.get('.bg-light-gray > div > img').should('not.exist')
    cy.get('.GVfInq0eKF5WT3Hcdp2U').should('be.visible')
})

Then('verfiy the Enter my account button', () => {
    cy.get('.bg-light-gray > div > img').should('not.exist')
    cy.contains("Ingresa a mi cuenta").should('be.visible')
})

Then('fills the card number with false data', () => {
    cr.numberCard("1234567891234567")
})

Then('select button Add card', () => {
    cy.wait('@waitCredit').its('response.statusCode').should('satisfy', (statusCode) => statusCode === 200 || statusCode === 304);
    cy.get('.bg-light-gray > div > img').should('not.exist')
    generic.button("Agregar tarjeta").click({ force: true })
})

Then('select Turn off card temporarily', () => {
    cr.cardOnOff()
})

Then('filter by {string}', (option) => {
    cy.wait(1000)

    switch (option) {
        case "Cargos":
            cr.filterMoves().click()
            if (store == "liverpool") {
                cy.intercept("https://micredito." + store + ".com.mx/api/v1/customers/22207322/cards/22826760/balances/cycle/1/filterBy/1").as('filter')
            } else {
                cy.intercept("https://micredito." + store + ".com.mx/api/v1/customers/13910/cards/1205508/balances/cycle/1/filterBy/1").as('filter')
            }

            cr.filterMovesOptions().contains(option).click()
            break
        case "Abonos":
            cr.filterMoves().click()
            if (store == "liverpool") {
                cy.intercept("https://micredito." + store + ".com.mx/api/v1/customers/22207322/cards/22826760/balances/cycle/1/filterBy/2").as('filter')
            } else {
                cy.intercept("https://micredito." + store + ".com.mx/api/v1/customers/13910/cards/1205508/balances/cycle/1/filterBy/2").as('filter')
            }
            cr.filterMovesOptions().contains(option).click()
            break
        case "Periodo anterior":
            cr.filterPeriod().click()
            if (store == "liverpool") {
                cy.intercept("https://pro-api." + store + ".com.mx/api/v2//transactions/722324?period=S").as('filter')
            } else {
                cy.intercept("https://pro-api.suburbia.com.mx/api/v2//transactions/2516?period=S").as('filter')
            }
            cr.filterPeriodOptions().contains(option).click()
            break
        case "Periodos previos":
            cr.filterPeriod().click()
            if (store == "liverpool") {
                cy.intercept("https://pro-api." + store + ".com.mx/api/v2//transactions/722324?period=P").as('filter')
            } else {
                cy.intercept("https://pro-api.suburbia.com.mx/api/v2//transactions/2516?period=P").as('filter')
            }
            cr.filterPeriodOptions().contains(option).click()
            break
        default:
            cr.filterPeriod().click()
            if (store == "liverpool") {
                cy.intercept("https://pro-api." + store + ".com.mx/api/v2//transactions/722324?period=A").as('filter')
            } else {
                cy.intercept("https://pro-api.suburbia.com.mx/api/v2//transactions/2516?period=A").as('filter')
            }
            cr.filterPeriodOptions().contains(option).click()
            break

    }
})

Then('verify the update of the movements by period {string}', (filtro) => {
    cy.wait('@filter')
})

Then('display button {string} account statement', (opcion) => {
    cy.get('._1_gGISDLWl0Sc3s9X0r').contains(opcion)
})

Then('verify the update of the movements by {string}', (filtro) => {
    cr.movesCard().its('length').then((length) => {
        cy.get('@numberMoves').should('be.greaterThan', length)
    });
})


Then('check payments for available services', () => {
    cy.url().should('contain', 'https://micredito.' + store + '.com.mx/service-payments')
    if (store == "liverpool") {
        cr.containerPays().should('be.visible')
    } else {
        cr.containerPaysSb().should('be.visible')
    }
})

Then('verify the card shutdown alert message', () => {
    cr.modalOffCard().should('be.visible')
})

Then('select the button See all', () => {
    cy.wait('@waitCredit').its('response.statusCode').should('satisfy', (statusCode) => statusCode === 200 || statusCode === 304);
    cy.get('.bg-light-gray > div > img').should('not.exist')
    cy.wait(1000)
    cr.allPromos().click({ force: true })
    cy.wait(1500)
    cy.scrollTo('bottom').wait(500)
    cy.wait(1500)
})

Then('validate tag details on each promotion', () => {
    cy.get('.vks_hhMj_rE2bUzOHLE0').each(($promo) => {
        cy.wait(500)
        cy.wrap($promo).find(".Button-module_baseButton__T4u-B.Button-module_fontPinkBrand__73gdk").click()
        cr.detailsPromoSelected()
    })
})

Then('check the expiration date label', () => {
    cr.creditPaymentArea().should('be.visible')
})

Then('select the three dot menu in one motion', () => {
    cr.movesCard().first().find('[alt="Opciones de movimiento"]').click().wait(500)
    cr.movesCard().first().find('[alt="Opciones de movimiento"]').click().wait(250)
    cr.optionMovesCard().contains("Ver detalle").click({ force: true })
})

Then('verify movement details', () => {
    cr.modalDetails().should('be.visible')
})

Then('fill the card number with a card that is already registered', () => {
    if (store != "suburbia") {
        cr.numberCard("4178490032777063")
        cr.addcvvCard()
        generic.button("Registrar Tarjeta").click({ force: true })
    } else {
        cy.wait(500)
        cr.cardSb("1400005918637458")
        cy.wait(500)
        cr.cvvCard()
        generic.button("Registrar Tarjeta").click({ force: true })
    }
})

Then('verify card information', () => {
    cy.wait(500)
    cr.cardInformation()
})

Then('select button Enter my account in my credit to log in', () => {
    cy.wait(500)
    cy.get('.FkYsd6hdQ84guhsSEwoi').click()
  })
  
  Then('select button Solicitar tarjeta en mi credito to log in', () => {
    cy.wait(200)
    cy.get('._1WNjWkkdRSL10G_VMxn').click()
  })
  
  Then('select button Solicítala ahora en mi credito', () => {
    cy.url().should('contain', 'https://micredito.' + store + '.com.mx/credit-cards')
    cy.wait(500)
    cy.get('[data-index="3"] > ._jg3BgOhfjBvqxehJ0Ed > .jP6WSlueGBdzRTweZ2IE > ._6f_32yN80e7ANwrVz8b > .d_Ka7cGtbKXRNcIfW4ZW').click({ force: true })
  })


Then('check my credit main banner', () => {
    cr.validarBannerPrincipalMiCredito().should('be.visible')
})

Then('select Apply now in the Liverpool section {string}', (tarjeta) => {
    cy.wait(500)
    switch (tarjeta) {
        case 'Departamental':
            cr.touchSolicitarTarjetaDepartamental().click({ force: true })
            break;
        case 'Visa':
            cr.touchSolicitarTarjetaVisa().click({ force: true })
            break;
        default:
            console.log('Error, no se encuentra el tipo de tarjeta:' + tarjeta);
    }
})

Then('verify the operation of the Request Now button {string}', (tarjeta) => {
    cr.validarPageSolicitaTar(tarjeta)
})

Then('select button request card', () => {
    cr.cardRequest().click()
})

Then('select See more information now in the Liverpool section {string}', (tarjeta) => {
    if (isMobile()) {
        cr.validarVerMasTar(tarjeta)
    } else {
        cr.validarVerMasTarDeskop(tarjeta)
    }
})

Then('verify the label Know your Liverpool card {string}', (tarjeta) => {
    switch (tarjeta) {
        case 'Departamental':
            cy.url().should('contain', 'https://micredito.' + store + '.com.mx/detail-card/dilisa')
            break;
        case 'Visa':
            cy.url().should('contain', 'https://micredito.' + store + '.com.mx/detail-card/visa')
            break;
        case 'Universitaria':
            cy.url().should('contain', 'https://micredito.' + store + '.com.mx/detail-card/livertu')
            break;
        default:
            console.log('Error, no se encuentra el tipo de tarjeta:' + tarjeta);
    }
    cy.get('#content-credit').should('be.visible')
})

Then('select the button Consult terms and conditions', () => {
    cy.get('.J_Njzqq4Q5pK0qS9g3if').click()
})

Then('check the promotions carousel', () => {
    cy.get('.KoR9bNug5breL8ghq6W8 > .react-multi-carousel-list > .react-multi-carousel-track').should('be.visible')
})

Then('selectuna promocion', () => {
    cr.touchunaPromo()
})

Then('select see all liverpool promotions', () => {
    cr.touchVerTodasPromos()
})

Then('verify the label Other promotions', () => {
    cr.validarVerLasPromos().should('be.visible')
})

Then('select filter {string}', (filter) => {
    cr.TouchFiltro().click()
    cy.get('ul > > span').contains(filter).click()
})

Then('select get more information about how to pay for your services', () => {
    cr.touchPagoServicios()
})

Then('select the button {string}', (boton) => {
    cy.wait(1000)
    if (isMobile()) {
        cr.touchMenuMicredito()
    }
    cy.get('#inner-menu > .cardBox').contains(boton).click({ force: true });
})

Then('verify the redirect to {string}', (opcion) => {

    if (opcion == 'Mi crédito') {
        cr.validarMiCredito().should('be.visible')
    } else if (opcion == 'Promociones') {
        cr.validarPromociones().should('be.visible')
    }
    else if (opcion == 'Puntos Rosas') {
        cr.validarPuntosRosas().should('be.visible')
    }
    else if (opcion == 'Conoce Crédito Liverpool') {
        cr.validarTarjetaLiver().should('be.visible')
    }
})

Then('verify the service payment label', () => {
    cy.contains('¿Dónde puedo pagar mis servicios?').should('be.visible')
})
