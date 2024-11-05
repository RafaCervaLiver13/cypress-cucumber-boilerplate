/// <reference types="cypress" />
import { isStore } from '../pages/genericPage'

class myordersPage {

	// [ REV ]

	menuFilters() {
		return cy.get('.filter-span.tracking-filter-parentesis')
	}

	menuFiltersDesktop() {
		return cy.get('.miscompras__dropdownFilter__dropButton')
	}

	optionFilter(value) {
		cy.contains(value).click({ force: true })

	}

	buttonFilter() {
		return cy.contains('Mostrar resultados')
	}

	selectFilterDateDesktop() {
		return cy.contains('20')
	}

	shippingCard() {
		if (!isStore("suburbia")) {
			return cy.get('.MisComprasContainer > .row')
		} else {
			return cy.get('.o-order__container__products >')
		}
	}

	shippingCardDesktop() {
		if (!isStore("suburbia")) {
			return cy.get("[class*='MisComprasContainer'][class*='desktop'] [class*='alignmentOrderStatus']")
		} else {
			return cy.get('.o-order__container__products >')
		}
	}

	invoicing() {
		return cy.get('.Detalles_BoldBlack')
	}

	invoiceNow() {
		cy.get('.m-orderDetail__address .linkElement')
			.invoke('removeAttr', 'target').click();
	}

	orderImage() {
		return cy.get('.a-order__product__image')
	}

	orderImageDesktop() {
		if (!isStore("suburbia")) {
			return cy.get('.col-xs-2 .a-order__product__image')
		} else {
			return cy.get('.a-order__product__image')
		}

	}

	imgDetailOrder() {
		if (isStore("suburbia")) {
			return cy.get(' .a-order__product__image')
		} else {
			return cy.get('img[loading="lazy"]').first()
		}
	}

	orderSearch(value) {
		let order

		if (isStore("suburbia")) {
			order = cy.get('#searchInput').find('#mainSearchbar')
		} else {
			order = cy.get('#miscompras_SearchInput_Mobile')
		}

		order.type(value + '{enter}', { force: true })
	}

	helpOrder() {
		return cy.get('.miscompras__link > a')
	}

	helpOrderTicket() {
		return cy.get('.modal-content')
	}

	deliveryTracking() {
		return cy.get('.d-block > .MisComprasOrderStatusBlocks')
	}

	deliveryTrackingDesktop() {
		return cy.get('.clickIcon')
	}

	deliveryAddress() {
		return cy.get('.shppingDetails')
	}

	// [ END ]

}

export default myordersPage;