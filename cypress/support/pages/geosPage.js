/// <reference types="cypress" />

import genericPage, { isMobile } from "../pages/genericPage.js"
const generic = new genericPage()

let store;

class geosPage {

    zipcode(cp) {
        return cy.get('#CP').type(cp)
    }

    store(store) {
        return cy.get('input[type="radio"]').check(store)
    }

    storeName(store) {
        if (isMobile()) {
            return cy.get('#a-edd-modal__btn .selected_Store').contains(store)
        } else {
            return cy.get('.a-header__strongLink > .m-navDesktop__selectstore > :nth-child(2) > .selected_Store').contains(store)
        }
    }

    closeCookies() {
        if (isMobile()) {
            return cy.get('.cookiesMessage-container > .icon-close').click()
        }
    }

    currentLocation() {
        return cy.get('.select-geoLoation').click()
    }

    storeSelect() {
        cy.get('.stores-list').then(($store) => {
            const randomIndex = Cypress._.random(0, $store.length - 1);
            const selectRandom = $store.eq(randomIndex);
            const label = selectRandom.text().trim(); // Trim any leading/trailing whitespaces
            store = label.replace('-', '').replace('Ver detalles', '').trim();
            cy.log(store)

            selectRandom.find('input[type="radio"]').click();
        })
    }

    selectedStore() {
        cy.get('#a-edd-modal__btn .selected_Store')
            .then(($myStore) => {
                const remove = $myStore.text().trim();
                store = store.replace(/\s+/g, ' ');
                const cleanMyStore = remove.replace(/\s+/g, ' ');

                expect(cleanMyStore).to.include(store);
            });
    }

    selectDetail() {
        cy.get('.view-link').then(($detail) => {
            const randomIndex = Cypress._.random(0, $detail.length - 1);
            const selectRandom = $detail.eq(randomIndex);
            selectRandom.click()
        })
    }

    storeInfo() {
        return cy.get('#filters-storeLocator-storeInformation > .modal-dialog > .modal-content').should('be.visible')
    }

    storeLabel(value) {
        cy.get('.GeoHead').contains(value)
    }

    shippingAddressName() {
        return cy.get('.GeoStoreName')
    }

    shippingAddressTime() {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();

        // Log the current hour
        cy.log(`Current hour: ${currentHour.toLocaleString()}`);

        cy.get(':nth-child(3) > .GeoLocationCard .GeoBodyHead').last().scrollIntoView().then(($shipping) => {
            const text = $shipping.text();
            cy.log(text);
            // Check if the current hour is before 1 pm (13:00)
            if (currentHour < 13) {
                const edd1 = text.includes('Recibe a domicilio');
                const edd2 = text.includes('Recibe hoy');
                const edd3 = text.includes('Recibe mañana');

                expect(edd1 || edd2 || edd3).to.be.true;

            } else if (currentHour >= 13 && currentHour < 18) {
                const edd1 = text.includes('Recoge en tienda');
                const edd2 = text.includes('Recoge en 2 horas');
                const edd3 = text.includes('Recibe mañana');

                expect(edd1 || edd2 || edd3).to.be.true;

            } else {
                // Handle other cases if needed
            }
        });
    }

    clickCollectTime() {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();

        // Log the current hour
        cy.log(`Current hour: ${currentHour.toLocaleString()}`);

        cy.get(':nth-child(1) > .GeoLocationCard .GeoBodyHead').first().scrollIntoView().then(($shipping) => {
            const text = $shipping.text();
            cy.log(text);
            // Check if the current hour is before 1 pm (13:00)
            if (currentHour < 13) {
                const edd1 = text.includes('Recoge en tienda');
                const edd2 = text.includes('Recoge en 2 horas');

                expect(edd1 || edd2 ).to.be.true;

            } else if (currentHour >= 13 && currentHour < 18) {
                const edd1 = text.includes('Recoge en tienda');
                const edd2 = text.includes('Recoge en 2 horas');
                //const edd3 = text.includes('Recibe mañana');

                expect(edd1 || edd2 ).to.be.true;

            } else {
                // Handle other cases if needed
            }
        });
    }

    deliverToday(value) {
        cy.get('.o-product__productInfo').should('not.include.text', value)
    }

    ccLabels() {
        cy.get('.GeoLocationCard .GeoBodyText').first().scrollIntoView().then(($edd) => {
            const text = $edd.text()

            const edd1 = text.includes('Recoge entre el')
            const edd2 = text.includes('Comprando antes de')
            const edd3 = text.includes('Recoge a partir de')

            expect(edd1 || edd2 || edd3).to.be.true
        })
    }

    displayedStore() {
        cy.get('.o-product__productInfo').scrollIntoView().then(($geo) => {
            const text = $geo.text()

            const edd1 = text.includes('Exhibido en')
            const edd2 = text.includes('Sin disponibilidad')

            expect(edd1 || edd2).to.be.true
        })
    }

    opcDelivery() {
        cy.get('.delivery-date-mobile > .opc_deliveryType').scrollIntoView().then(($opc) => {
            const text = $opc.text()
            const edd1 = text.includes('Entrega estimada')
            const edd2 = text.includes('Recoge mañana')
            const edd3 = text.includes('Recoge en 2 horas')

            expect(edd1 || edd2 || edd3).to.be.true
        })
    }

    opcShippingAddress() {
        cy.get('.delivery-date-mobile > .opc_deliveryType').scrollIntoView().then(($opc) => {
            const text = $opc.text()

            const edd1 = text.includes('Entrega estimada')
            const edd2 = text.includes('Recibe hoy')
            const edd3 = text.includes('Recibe mañana')

            expect(edd1 || edd2 || edd3).to.be.true
        })
    }
}

export default geosPage;