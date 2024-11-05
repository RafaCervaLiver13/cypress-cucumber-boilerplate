import { Given, When, Then, attach } from "@badeball/cypress-cucumber-preprocessor";
import genericPage, { isMobile, isStore } from "../../support/pages/genericPage"
import { utility } from "../../support/utility"

const generic = new genericPage()
const usrJson = new utility().getUser();
const skuJson = new utility().getSku();
const navJson = new utility().getNav();

let store = Cypress.env('STORE');
let site = Cypress.env('SITE');
let user, sku, nav, pdpQty, userOrder

beforeEach(() => {
	cy.fixture(usrJson).then((select) => {
		user = select
	})

	cy.fixture(skuJson).then((select) => {
		sku = select
	})

	cy.fixture(navJson).then((select) => {
		nav = select
	})
})

// --- ---

Given('visit the liverpool page', () => {
	generic.openUrl()
})

Given('visit gift table in liverpool', () => {
	//cy.visit('https://mesaderegalosqa2.liverpool.com.mx/')
	cy.visit('https://ogncmr.liverpool.com.mx')
})

Given('select gift table gap', () => {
	cy.visit('https://mesaderegalosqa2.gap.com.mx/')
})

Given('visit gift table at potterybarn', () => {
	//cy.visit('https://mesaderegalosqa.potterybarn.com.mx/')
	cy.visit('https://ogncmr.potterybarn.com.mx')
})

Given('visita mesa de regalos en toyrus', () => {
	//cy.visit('https://mesaderegalosqa.potterybarn.com.mx/')
	cy.visit('https://ogncmr.toysrus.com.mx/ ')
})

// --- Menu selection ---

When('selectmenu hamburguesa', () => {
	if (isMobile()) {
		generic.menuHam()
	}
})

When('select menu log in', () => {
	if (isMobile()) {
		generic.menuHam()
	}
	generic.menuOption('Iniciar Sesión')
})

When('log out', () => {
	if (isMobile()) {
		generic.menuHam()
		generic.menuOption('Salir de aquí')
	} else {
		generic.menuUser('Cerrar sesión')
	}

	cy.wait(1500)
})

When('Check the Login button', () => {
	if (isMobile()) {
		generic.menuHam()
	}
	cy.contains('Iniciar Sesión', { matchCase: false }).should('be.visible')
})

// --- User in json users.x.json ---

When('log in with user {string}', (type) => {
	if (type == "credito" && isStore("suburbia")) {
		type = "creditoSB"
	}

	if (type == "compras") {
		const loginCompras = {
			liverpool: "comprasLiv",
			suburbia: "comprasSb",
			potterybarn: "comprasPb",
			gap: "comprasGap",
			toysrus: "comprasToys"
		};
		type = loginCompras[store]
		userOrder = type
	}

	const random = Cypress._.random(user[type].length - 1)

	let siteqa = "www"
	switch (site) {
		case "pwaqa":
			siteqa = "login-qa1"
			break;
		case "dtaqa":
			siteqa = "login-qa2"
			break;
		default:
			siteqa = "login"
	}
	cy.intercept('POST', 'https://' + siteqa + '.liverpool.com.mx/oauth/token').as('wait')
	generic.typeEmail(user[type][random].email)
	generic.typePass(user[type][random].pass)
	generic.loginBtnClick()

	cy.wait('@wait').its('response.statusCode').should('satisfy', (statusCode) => statusCode === 200 || statusCode === 304);
	cy.get('@userlog').then((user) => {
		cy.get('@passlog').then((pass) => {
			attach('User: ' + user + '"\nPass: ' + pass + '');
		})
	})
	cy.get(".loader").should(($element) => {
		expect($element.length === 0 || !$element.is(':visible')).to.be.true;
	});
})

When('log in with user {string} from opt', (type) => {
	const random = Cypress._.random(user[type].length - 1)
	generic.typeEmail(user[type][random].email)
	generic.typePass(user[type][random].pass)
	generic.loginBtnClick()
	cy.url().should('contain', 'https://' + site + '.' + store + '.com.mx/tienda/oneCheckout')
	/*if (isStore("suburbia")) {
		cy.wait(1000).contains('Lo sentimos...', { timeout: 500 }).should('not.exist')
	} else {
		cy.wait(500)
		//generic.waitPage('/getConfiguration', '.loadingContainerStyle >', false)
		cy.contains('Lo sentimos...', { timeout: 500 }).should('not.exist')
	}*/
	cy.get('body').then(($body) => {
		if ($body.find('.mobile-indicator__content__wrapper').length > 0) {
			cy.get('.mobile-indicator__content__wrapper > div.close >').click({ force: true })
		}
	})
})

// --- SKU in json skus.x.json  --- // stype[0] = (sl) | stype[1] = (regalo)

// --- Specific word in json nav.x.json ---

When('search for {string}', (subtype) => {
	const random = Cypress._.random(nav[store][subtype].length - 1)
	generic.search2(nav[store][subtype][random].nombre)
})

When('perform key word search {string}', (busqueda) => {
	cy.intercept('GET', '/getSearchFacadeService?**').as('waitSearch')
	generic.search2(busqueda)
	cy.wait('@waitSearch').its('response.statusCode').should('satisfy', (statusCode) => statusCode === 200 || statusCode === 304);
})

When('perform invalid key word search {string}', (busqueda) => {
	cy.intercept('GET', '/getSearchFacadeService?**').as('waitSearch')
	generic.search2(busqueda)
	cy.wait('@waitSearch').its('response.statusCode').should('satisfy', (statusCode) => statusCode === 404 || statusCode === 504);
})

// --- Input number event ---

When('enter event number', () => {
	const random = Cypress._.random(user['giftregistry'].length - 1)
	generic.giftRegistryEvent(user['giftregistry'][random].evento)
})

When('enter event number from opt', () => {
	const random = Cypress._.random(user['giftregistry'].length - 1)
	generic.giftRegistryEventOpc(user['giftregistry'][random].evento)
})

// --- Select or verify button by name ---

When('select button {string}', (name) => {
	if (isMobile() && name == "Electrónica") {
		cy.contains(name).click({ force: true })
	} else if (isStore("suburbia") && name == "Ver detalle") {
		cy.contains("Detalle de compra").click({ force: true })
	} else {
		cy.wait(2500)
		generic.button(name).click({ force: true })
	}
	cy.wait(1000)
})

Then('display button {string}', (name) => {
	generic.button(name).should('be.visible')
})

// --- Verify text ---

Then('verify text {string}', (txt) => {
	generic.text(txt)
})

Then('no text is displayed {string}', (txt) => {
	//cy.get('.mainLoader').should('not.be.visible')
	cy.scrollTo('center')
	generic.textNotExist(txt)
})

// --- View pages ---

Then('visualize pdp', () => {
	generic.pdpVisible().should('exist')
})

Then('visualize blp', () => {
	generic.blpVisible().should('exist')
})

Then('visualiza clp', () => {
	generic.clpVisible().should('exist')
})

Then('visualize plp', () => {
	generic.plpVisible().should('exist')
})

Then('display options', () => {
	generic.opcVisible().should('exist')
})

// --- Add SKU ---

When('select button add to my bag', () => {
	generic.randomSize()
	generic.pdpAddCart()
	cy.get('.-success > .m-mdc__snackbarSurface > .m-mdc__snackbarActions > .icon-close').click({ force: true })
	generic.warrantyModal()
})

When('Add product with guarantee to the bag', () => {
	generic.randomSize()
	generic.pdpAddCart()
})


Then('valid confirmation message when adding a product to the bag', () => {
	generic.pdpAddCartMsg()
})

When('select buy now on pdp', () => {
	generic.pdpPurchaseNow()
})

Then('select buy now at home in pdp', () => {
	cy.scrollTo('center')
	generic.pdpPurchaseNowAddress()
})

When('select my bag', () => {
	generic.miniBag().click({ force: true })
	cy.wait(1500)
})

Then('select the heart from my bag', () => {
	if (isMobile()) {
		generic.heart().click({ force: true })
	} else {
		generic.heartDesktop().click({ force: true })
	}
})

// [ REV. ]

// 👌 (pendiente cambiar nombre realizo por realiza)
When('search for {string} with type {string}', (searchType, skuType) => {
	cy.intercept('GET', 'https://static.www.turnto.com/sitedata/**').as('waitPdp')

	// Split the skuType string and fetch the necessary data
	const [type, subtype] = skuType.split(',');
	const jsonData = sku[store][type][0][subtype];

	// Select a random item from the json data
	const random = Cypress._.random(jsonData.length - 1);
	const selectedSku = jsonData[random][searchType];

	// Perform the search with the selectedSku
	cy.url().then((currentUrl) => { //The searcher does not appear in my bag for the version wap
		const targetPath = 'tienda/cart'; 
		if (isMobile() && currentUrl.includes(targetPath)) {
			cy.go('back'); //return to the previous page
			cy.wait(500)
			generic.search(selectedSku, [subtype]);
		} else {
			generic.search(selectedSku, [subtype]);

		}
	})
	cy.get('@skulog').then((sku) => {
		attach(`sku: ${sku}`);
	});

	if ([subtype] != "coleccion") {
		// Wait for the interception to complete and check the response status code
		cy.wait('@waitPdp').its('response.statusCode').should('satisfy', (statusCode) => statusCode === 200 || statusCode === 304);
	}
	cy.wait(1000)
});

When('modify quantity to {string} and add to the bag', (qty) => {
	if (isMobile()) {
		cy.scrollTo(0, 500)
	}
	generic.randomSize()
	generic.pdpModifyQty(qty)
	generic.pdpAddCart()
	generic.warrantyModal()
	pdpQty = qty
	cy.get('.-success > .m-mdc__snackbarSurface > .m-mdc__snackbarActions > .icon-close').click()
})

When('modify quantity to {string} in pdp', (qty) => {
	if (isMobile()) {
		cy.wait(1000)
		cy.scrollTo(0, 600).wait(500)
	}
	generic.randomSize()
	cy.wait(500)
	generic.pdpModifyQty(qty)
	pdpQty = qty
	cy.wait(750)
})

Then('quantity of the item in my bag is equal to the one entered in pdp', () => {
	generic.myBagModifyQty().last().should('have.value', pdpQty)
})

When('select option {string} at home', (value) => {
	if (isMobile()) {
		generic.menuHam()
		switch (value) {
			case "Mis Compras":
				cy.contains(new RegExp(/^Hola \w+/)).should('exist')
				break
		}
		generic.menuOption(value)
	} else {
		switch (value) {
			case "Mis Compras":
				cy.contains(new RegExp(/^Hola \w+/)).should('exist')
				cy.wait(2500)
				generic.menuHello(value)
				break
		}
	}
})

// [ MY BAG ]

Then('remove items in my bag', () => {
	if (isMobile()) {
		generic.deleteItems()
	} else {
		generic.deleteItemsDesktop()
	}

	cy.get('body').then(($body) => {
		if ($body.find('.-success > .m-mdc__snackbarSurface > .m-mdc__snackbarLabel').length > 0) { //pop-up alert delete articles
			cy.wait(1000)
			cy.get('.-success > .m-mdc__snackbarSurface > .m-mdc__snackbarActions > .icon-close').click({ force: true })
		}
	});
})

// [ Text visualization ]

Then('text is displayed {string}', (page) => {
	cy.contains(page, { matchCase: false }).should('exist')
})

// [ Orders ]

let shippNum

When('search by order number {string}', (key) => {
	shippNum = user[userOrder][0][key]
	cy.log(`${key}:`, shippNum);

	if (isMobile()) {
		generic.searchOrder(shippNum);
	} else {
		generic.searchOrderDesktop(shippNum)
	}
})

Then('display order number', () => {
	cy.intercept('POST', '/getCartHeaderDetails').as('details');
	cy.wait('@details')
	cy.scrollTo('bottom')
	cy.contains(shippNum)
})

When('perform order search by word {string}', (word) => {
	cy.intercept('POST', '/cancelRefundInfo').as('wait');

	if (isMobile()) {
		generic.searchOrder(word)
		cy.wait('@wait')
	} else {
		generic.searchOrderDesktop(word)
		cy.wait('@wait')
	}
})

Then('select product at random', () => {
	generic.selectProduct()
	cy.intercept('GET', 'https://static.www.turnto.com/**').as('waitCarousel')
	cy.wait('@waitCarousel').its('response.statusCode').should('satisfy', (statusCode) => statusCode === 200 || statusCode === 304);
})

Then('select a random size', () => {
	generic.randomSize()
})

// [ End Orders ]

// [ END ]
