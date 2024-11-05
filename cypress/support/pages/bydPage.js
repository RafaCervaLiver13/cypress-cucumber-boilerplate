/// <reference types="cypress" />

import genericPage, { isMobile } from "../pages/genericPage.js"
const generic = new genericPage()

let store;
let site = Cypress.env('ENV') != "qa" ? "autos" : "autos-qa";;

class bydPage {

    homeByd() {
        //site = "pwaqa" ? "autos" : "autos-qa";
        cy.url().should('contain', 'https://' + site + '.liverpool.com.mx/')
        if (isMobile()) {
            cy.get('.swiper-slide-visible >').should('exist').and('be.visible')
        } else {
            cy.get('.HomeContent_container_nameCard_desktop__838Hx').should('exist').and('be.visible')
        }
    }

    menuByd() {
        return cy.get('.Hamburger_checkbox__qm_Lp')
    }

    menuOption(opcion) {
        if (isMobile()) {
            return cy.get('.SidebarMenu_sidebarMenu_side__DQtKS').contains(opcion)
        } else {
            return cy.get('.Megamenu_button_group_container__9wUHn').contains(opcion)
        }

    }

    selectOption(opcion) {
        if (isMobile()) {
            return cy.get('.HomeContent_imgContainer_mobile__m_5EF').contains(opcion)
        } else {
            return cy.get('.slick-active > :nth-child(1) > .HomeContent_imgContainer__6C2UM > .HomeContent_container_nameCard_desktop__838Hx > .HomeContent_buttons_desktop__0YQZA').contains(opcion)
        }
    }

    selectOptionMenu(opcion) {
        return cy.get('.nav-mobile-menu >').contains(opcion)
    }

    homeModelo(modelo) {
        cy.url().should('contain', 'https://'+ site +'.liverpool.com.mx/modelos/' + modelo.toLowerCase().replaceAll(' ', '-'))
        cy.get('.PerformanceInfo_containerPerformanceInfo__3efq7').should('exist').and('be.visible')
    }

    homeOpcion(opcion) {
        let url = "https://"+ site +".liverpool.com.mx/"
        let element = ""

        switch (opcion) {
            case "Reserva tu prueba de manejo":
                url = url + "reserva-tu-prueba-de-manejo"
                element = ".DriveTest_main__ItnKC"
                break;
            case "Prueba de manejo":
                url = url + "reserva-tu-prueba-de-manejo"
                element = ".DriveTest_main__ItnKC"
                break;
            case "Sobre Nosotros":
                url = url + "acerca-de-byd"
                element = ".AboutBYD_title__wgn0O"
                break;
            case "Visita el Showroom":
                url = url + "visita-el-showroom"
                element = ".Showroom_containerFixed__MTys0 > img"
                break;
            case "Preguntas frecuentes":
                url = url + "faqs"
                element = "[class*='Faqs_containerFaqs']"
                break;
            case "Suscríbete al Newsletter":
                url = url + "suscribete-al-newsletter"
                element = ".BannerNewsletter_bydTitle__NPifr"
                break;
            default:
                url = url + "Aparta-en-linea"
                element = ".ApartCar_main__nuaJg"
        }

        cy.url().should('contain', url)
        cy.get(element).should('exist').and('be.visible')
    }

    footerByd() {
        return cy.get('.Footer_container_nav__ehsGG')
    }

    carouselHome() {
        if (isMobile()) {
            return cy.get('.slick-active > :nth-child(1) > .HomeContent_imgContainer__6C2UM > [alt="BYD"]')
        } else {
            return cy.get('.HomeContent_imgContainer_mobile__m_5EF')
        }
    }

    carouselPromos() {
        return cy.get('.slick-active > > .PromotionCarousel_promotionSlide__y7mv3')
    }

    newsletter() {
        return cy.get('#newsletter')
    }

    selectCarModel() {
        this.newsletter().find('.mx-3 > #checked-checkbox').then(($car) => {
            const randomIndex = Cypress._.random(0, $car.length - 1);
            const selectRandom = $car.eq(randomIndex);
            selectRandom.click();
        })
    }

    selectTermCond() {
        this.newsletter().find('.mx-0 > #checked-checkbox').each(($element) => {
            cy.wrap($element).click()
        })
    }

    completeFormNewsletter() {
        this.newsletter().scrollIntoView().wait(500)
        this.selectCarModel()
        this.newsletter().find('[name=nombre]').type('Pedro')
        this.newsletter().find('[name=primerApellido]').type('Gomez')
        this.newsletter().find('[name=segundoApellido]').type('Gomez')
        this.newsletter().find('[name=celular]').type('5534567878')
        this.newsletter().find('[name=email]').type('test@yopmail.com')
        this.selectTermCond()
        if (isMobile()) {
            this.newsletter().find('.FormNewsletter_btnSuscribeMobile__7ZBWu').should('be.visible')
        } else {
            this.newsletter().find('.FormNewsletter_btnSuscribe__T2dCU').should('be.visible')
        }
    }

    firstQuadrant() {
        if (isMobile()) {
            return cy.get('.PerformanceInfo_containerPerformanceInfo__3efq7')
        } else {
            return cy.get('.PerformanceInfo_cardImage_container___KDcV')
        }
    }

    verifyElementCar() {
        this.firstQuadrant().find('img').should('be.visible')
        if (isMobile()) {
            this.firstQuadrant().find('.xs\\:block').should('be.visible')
        } else {
            this.firstQuadrant().find('.PerformanceInfo_info_item_container__fj256').should('be.visible')
        }
    }

    sectionExterior() {
        return cy.get('.bg-white > :nth-child(2)')
    }

    sectionInterior() {
        return cy.get('.bg-white > :nth-child(3)')
    }

    sectionTechnology() {
        return cy.get('.bg-white > :nth-child(4)')
    }

    verifySectionExterior() {
        +
        this.sectionExterior().scrollIntoView().wait(500)
        this.sectionExterior().find(':nth-child(1)').should('be.visible')
        this.sectionExterior().find('.CarouselHome_imgContainer__Cb3LU > img').should('be.visible')
        this.sectionExterior().find(':nth-child(3)').should('be.visible')
        this.sectionExterior().find('.xxs\\:mt-0').should('be.visible')
        this.sectionExterior().find('.xxs\\:mt-6').should('be.visible')
    }

    verifySectionInterior() {
        this.sectionInterior().scrollIntoView().wait(500)
        this.sectionInterior().find(':nth-child(1)').should('be.visible')
        this.sectionInterior().find('.CarouselHome_imgContainer__Cb3LU > img').should('be.visible')
        this.sectionInterior().find(':nth-child(4) > :nth-child(1)').should('be.visible')
    }

    veryfyTechnology() {
        this.sectionTechnology().scrollIntoView().wait(500)
        this.sectionTechnology().find(':nth-child(1)').should('be.visible')
        this.sectionTechnology().find('.CarouselHome_imgContainer__Cb3LU > img').should('be.visible')
        this.sectionTechnology().find(':nth-child(4) > :nth-child(1)').should('be.visible')
        cy.get('.DownloadPDF_container_DownloadPdf__jSSpe').should('be.visible')
    }

    selectRandomModel() {
        if (isMobile()) {
            cy.get('.SidebarMenu_sidebarMenu_side__DQtKS').find('.nav-mobile-menu > :nth-child(2) >').find('.hover\\:text-secondaryColor').then(($car) => {
                const randomIndex = Cypress._.random(1, $car.length - 1);
                const selectRandom = $car.eq(randomIndex);
                cy.log(selectRandom)
                cy.wrap(selectRandom).click()
            })
        } else {
            cy.get(':nth-child(2) > .flex > .DropDownMenu_container_menu__XFLS0').find('.DropDownMenu_dropdown_menu__2X89s').find('.hover\\:text-secondaryColor').then(($car) => {
                const randomIndex = Cypress._.random(1, $car.length - 1);
                const selectRandom = $car.eq(randomIndex);
                cy.log(selectRandom)
                cy.wrap(selectRandom).click()
            })
        }
    }

    buttonQuadrant() {
        return cy.get('.BasicButton_destructivePrimaryBtn___1EfG')
    }

    modalQuadrant() {
        return cy.get('.swiper-slide-visible > .DetailsInformation_main_body__FRpdK')
    }

    bydModelo() {
        return cy.get('.FloatButtons_containerWithoutTitle__IfUdJ > .flex')
    }

    selectShowRoom() {
        return cy.get('.undefined > .DropDown_container_select___csCH > select')
    }

    selectModel() {
        cy.get('.Carousel_carouselItems__plIxW > *').then(($car) => {
            const randomIndex = Cypress._.random(0, $car.length - 1);
            const selectRandom = $car.eq(randomIndex);
            selectRandom.click();
        })
    }

    selectDate() {
        cy.get("button[class*='month-view__days']").filter((index, element) => {
            return !Cypress.$(element).attr('disabled');
        })
            .then(($day) => {
                const randomIndex = Cypress._.random(0, $day.length - 1);
                const selectRandom = $day.eq(randomIndex);
                selectRandom.click();
            })
    }

    selectHour() {
        return cy.get('.px-2 > .DropDown_container_select___csCH > select')
    }

    resume() {
        return cy.get('.ResumeDrive_gray__PZfxf')
    }

    contact() {
        return cy.get('.sm\\:block > :nth-child(1)')
    }
}

export default bydPage;
