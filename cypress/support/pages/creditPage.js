/// <reference types="cypress" />

import { isMobile, isStore } from "./genericPage"
let store = Cypress.env('STORE');

class creditPage {

    containerMoves() {
        return cy.get('.MsPO4STLG0ptEd5UrRji')
    }

    mainCard() {
        return cy.get('.l6kLOGLOekNBgNZCw8Ka').first()
    }

    medCard() {
        return cy.get(':nth-child(2) > .WgC4_p_MitJHD7e3h48b > ._DC1j_OzQEL_N6DblBXy')
    }

    containerPays() {
        return cy.get('._0qOiRiuRd6_g2WDQoVv')
    }

    containerPaysSb() {
        return cy.get('#billers')
    }

    modalVerifyAutentication() {
        return cy.get('#modal-fist-touch > .modal-dialog > .modal-content')
    }

    filterMoves() {
        return cy.get(':nth-child(2) > .vW6aeRqjslQGuVzbQE_Z > .OCbiNv4zl1A_QhsbullL')
    }

    filterMovesSb() {
        return cy.get('.flex-row-reverse > .dropdown > .text-primary-suburbia')
    }

    filterMovesOptions() {
        return cy.get('.aEvY8p0hLxovXgna3cas >')
    }

    filterPeriod() {
        return cy.get(':nth-child(1) > .vW6aeRqjslQGuVzbQE_Z > .OCbiNv4zl1A_QhsbullL')
    }

    filterPeriodSb() {
        return cy.get('.flex-row > .dropdown > .text-primary-suburbia')
    }

    filterPeriodOptions() {
        return cy.get('.aEvY8p0hLxovXgna3cas > ')
    }

    creditPaymentArea() {
        return cy.get('.ygCf_Zt6MxtGMOkPeRLr')
    }

    optionMovesCard() {
        return cy.get('.LKtN5idquqCGmJ0_i5bO')
    }

    modalDetails() {
        return cy.get('.Modal-module_modalBody__5rqpS')
    }

    modalOffCard() {
        return cy.get('.Modal-module_content__U221l')
    }

    selectDilisaCard() {
        cy.get('button.owl-next').click({ force: true })
    }

    selectDigitalCard() {
        cy.get('button.owl-next').click({ force: true })
    }

    mainCardOptions() {
        return cy.get('.main-card')
    }

    modalDigitalCard() {
        cy.get('.Modal-module_content__U221l').should('be.visible')
    }

    numberCard(number) {
        cy.wait(1000)
        cy.get('#cardNumber').focus().type(number)
    }

    cardOnOff() {
        if (isStore("liverpool")) {
            cy.get('.SwitchInput-module_slider__c6crp').click()
        } else {
            cy.get('.SwitchInput-module_sliderSbb__w2HI-').click()
        }
    }

    cvvCard() {
        cy.wait(500)
        if (isStore("liverpool")) {
            cy.wait(1000)
            cy.get('.CvvValidator-module_container__GxL-i').find('#GoodThru').focus().type("0628")
            cy.get('.CvvValidator-module_container__GxL-i').find('#CVV').focus().type("716")
        } else {
            cy.get('#CVV').focus().type("253")
        }

    }

    addcvvCard() {
        cy.wait(500)
        cy.get('#GoodThru').focus().type("0628")
        cy.get('#CVV').focus().type("716")
    }

    nextButton() {
        cy.get('.CvvValidator-module_container__GxL-i').find('#btnNext').click()
    }

    movesCard() {
        return cy.get('.MsPO4STLG0ptEd5UrRji >')
    }
    verifyCard() {
        cy.get('.FirstTouch-module_body-message__ASVpf')
    }

    finishVerifyCard() {
        cy.get('.Button-module_main__axOoQ').click()
    }

    allPromos() {
        return cy.get('#seo-promociones > p')
    }

    detailsPromoSelected() {
        cy.wait(250)
        cy.get('.Modal-module_content__U221l').should('be.visible')
        cy.wait(250)
        cy.get('.Modal-module_header__oCJm4').find("button > img").click()
    }

    cardSb(number) {
        cy.get('#cardNumber').type(number)
    }

    rfcCardSb(rfc) {
        cy.get(':nth-child(2) > .material-style').type(rfc)
    }

    cardInformation() {
        //saldo actual, credito disponible
        cy.get('.g5vP_ScinRapKdXWAAuv').find(':nth-child(1)').should('be.visible')
        cy.get('.g5vP_ScinRapKdXWAAuv').find(':nth-child(2)').should('be.visible')
        cy.get('.g5vP_ScinRapKdXWAAuv').find(':nth-child(3)').should('be.visible')
        //Pago minimo, pago intereses y fecha limite
        cy.get('.g5vP_ScinRapKdXWAAuv').find(':nth-child(4)').should('be.visible')
        cy.get('.g5vP_ScinRapKdXWAAuv').find(':nth-child(6)').should('be.visible')
        ///monedero electronico
        cy.get('.qzxzfJVP6kP_FvZDmE54').should('be.visible')
    }

    validarBannerPrincipalMiCredito() {
        return cy.get('.NJQbTVPYJXTou2bPvaGk')
    }

    cardRequest() {
        return cy.get('._1WNjWkkdRSL10G_VMxn')
    }

    touchSolicitarTarjetaDepartamental() {
        if(isMobile()){
            return cy.get('[data-index="3"] > .DnkaxPBP8TWLmulWqWkO > .XvAJcrNQ5PSnG2aBfonj > ._lLtJpogf_W743qI_PF7 > .UeqwIi82VQCBQSmupdwm')
        }else{
            return cy.get(':nth-child(1) > .XvAJcrNQ5PSnG2aBfonj > ._lLtJpogf_W743qI_PF7 > .UeqwIi82VQCBQSmupdwm')
        }   
    }

    touchSolicitarTarjetaVisa() {
        if(isMobile()){
            return cy.get('[data-index="4"] > .DnkaxPBP8TWLmulWqWkO > .XvAJcrNQ5PSnG2aBfonj > ._lLtJpogf_W743qI_PF7 > .UeqwIi82VQCBQSmupdwm')
        }else{
            return cy.get(':nth-child(2) > .XvAJcrNQ5PSnG2aBfonj > ._lLtJpogf_W743qI_PF7 > .UeqwIi82VQCBQSmupdwm')
        }     
    }


    validarPageSolicitaTar(tarjeta) {
        switch (tarjeta) {
            case 'Departamental':
                cy.url().should('contain', 'https://micredito.' + store + '.com.mx/card-request/dilisa')
                break;
            case 'Visa':
                cy.url().should('contain', 'https://micredito.' + store + '.com.mx/card-request/visa')
                break;
            default:
                console.log('Error, no se encuentra el tipo de tarjeta:' + tarjeta);
        }
        cy.get('.zLZ5nmbisbKXOypBoldX').should('be.visible')
    }

    validarVerMasTarDeskop(tarjeta) {
        switch (tarjeta) {
            case 'Departamental':
                cy.get(':nth-child(1) > .XvAJcrNQ5PSnG2aBfonj').contains('Ver más información').click({ force: true })
                break;
            case 'Visa':
                cy.get(':nth-child(2) > .XvAJcrNQ5PSnG2aBfonj').contains('Ver más información').click({ force: true })
                break;
            case 'Universitaria':
                cy.get(':nth-child(3) > .XvAJcrNQ5PSnG2aBfonj').contains('Ver más información').click({ force: true })
                break;
            default:
                console.log('Error, no se encuentra el tipo de tarjeta:' + tarjeta);
        }
    }

    validarVerMasTar(tarjeta) {
        cy.wait(500)
        switch (tarjeta) {
            case 'Departamental':
                cy.get('[data-index="3"] > ').contains('Ver más información').click({ force: true })
                break;
            case 'Visa':
                cy.get('[data-index="4"] >').contains('Ver más información').click({ force: true })
                break;
            case 'Universitaria':
                cy.get('[data-index="5"] >').contains('Ver más información').click({ force: true })
                break;
            default:
                console.log('Error, no se encuentra el tipo de tarjeta:' + tarjeta);
        }
    }

    touchVerTodasPromos() {
        cy.get('#seo-promociones > p').click()
        cy.get('#content-credit > .cardBox').contains('Promociones').click()
    }

    validarVerLasPromos() {
        return cy.get('#content-credit > .cardBox')
    }

    TouchFiltro() {
        if(isMobile()){
            return cy.get('input')
        }else{
            return cy.get('a > input')
        }
    }

    touchPagoServicios() {
        return cy.get('.ijBZ_MW0CaQuiGiV5WTB').click()
    }

    touchMenuMicredito() {
        return cy.get('.ilGU4njag_mNmbGOepe7').click()
    }

    validarMiCredito() {
        return cy.get('#content-credit > :nth-child(1)')
    }

    validarPromociones() {
        if(isStore('liverpool')){
            return cy.get('.j6Vf1VqqxVW7ywqv3lr8')
        }else{
            return cy.get('.IEVw0AvalwMBOlI3qZqn')
        }
    }

    validarPuntosRosas() {
        return cy.get('.NFuVU0dFDLwNkve5Iwnm')
    }

    validarTarjetaLiver() {
        return cy.get('#content-credit > :nth-child(1)')
    }
}

export default creditPage;