import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import navigationPage from '../pages/navigationPage'
import genericPage, { isMobile, isStore } from '../pages/genericPage'

const generic = new genericPage()
const nav = new navigationPage()
let store = Cypress.env('STORE');
let site = Cypress.env('SITE');

Then('check the menu redirect {string}', (opcion) => {

    const menu = cy.contains(opcion)
    menu.click({ force: true })

    if (opcion == 'Direcciones de Entrega') {
        nav.validarDireccionesEntrega().should('be.visible')
    }
    else if (opcion == 'Mi cartera') {
        nav.validarFormasDePago().should('be.visible')
    }
})

Then('select option menu help in {string}', (opcion) => {
    cy.wait(2000)
    if (opcion == 'Sostenibilidad') {
        if (isMobile()) {
            generic.button('Acerca de ').click({ force: true })
        }
        const menu = cy.get('#\\#collapseAboutUss').contains(opcion).wait(200)
        menu.click()
    } else if (opcion == 'Facturación' && isStore("suburbia")) {
        if (isMobile()) {
            generic.button('Nuestros Servicios').click({ force: true })
        }
        const menu = cy.get('#\\#collapseRefundAndCancel').contains(opcion).wait(200)
        menu.click()
    } else if (opcion == 'Facturación' && !isStore("liverpool") && !isStore("suburbia")) {
        if (isMobile()) {
            generic.button('Servicios').click({ force: true })
        }
        const menu = cy.get('#\\#collapseSupport').contains(opcion).wait(200)
        menu.click()
    } else {
        if (isMobile()) {
            generic.button('Soporte al cliente').click({ force: true })
        }
        const menu = cy.get('#\\#collapseSupport').contains(opcion).wait(200)
        menu.click()
    }
})

Then('check the menu redirection help {string}', (opcion) => {

    switch (opcion) {
        case "Facturación":
            nav.validarFacturacion().should('be.visible')
            break
        case "Ayuda":
            cy.contains(opcion)
            break
        case "Garantía Liverpool":
            nav.validarGarantiaLiver().should('be.visible')
            break
        case "Sostenibilidad":
            isStore("liverpool") ? cy.url().should('contain', 'https://' + site + '.' + store + '.com.mx/tienda/sostenibilidad') : nav.validarSostenibilidadSb().should('be.visible')
            break
        default:
            break
    }
})

Then('verify images Liverpool Guarantee and Click&Collect', () => {
    if (isStore("liverpool")) {
        cy.scrollTo('bottom')
        cy.wait(1000)
        nav.validarImagenesGarantia().should('be.visible')
    } else {
        cy.scrollTo('bottom')
        nav.validarImagenesGarantiaSb().should('be.visible')
    }
})

Then('verify that shows message Sorry', () => {
    nav.validarLabelLoSentimos()
})

Then('verify that shows the tips', () => {
    if (isMobile()) {
        nav.touchLinkAyuda().click()
        nav.validarQueMuestranLosConsejos().should('be.visible')
    } else {
        nav.validarQueMuestranLosConsejosdesktop().should('be.visible')
    }
})

Then('valid images in clp', () => {
    cy.wait(1500)
    cy.get('body').then(($body) => {
        if ($body.find('.clp_body').length > 0) {
            generic.clpVisible()
        } else {
            generic.plpVisible()
        }
    })
})

Then('check the Categories label', () => {
    //generic.waitPage("https://serviciosliverpoolsadecv.us-4.evergage.com/api2/event/liverpool")
    cy.contains("Categorías")
})

Then('search by word {string}', (palabra) => {
    generic.typeStore().type(palabra)
    generic.searchClick()
    cy.wait(1000)
})

Then('check store matches {string}', (palabra) => {
    nav.verifyMatchStore(palabra)
})

Then('select state {string} from Stores', (estado) => {
    nav.selectState(estado)
    cy.wait(1000)
})

Then('verify that se actualice el mapa', () => {
    cy.wait(3000)
})

Then('verify image contebio', () => {
    if (isMobile()) {
        nav.verifyImageContebio()
    } else {
        nav.verifyImageContebioDesktop()
    }
})

Then('select image contebio', () => {
    if (isMobile()) {
        nav.selectImageContebio()
    } else {
        nav.selectImageContebioDesktop()
    }
})

Then('check contebio carousel', () => {
    cy.scrollTo('center')
    nav.verifyCarruselContebio().should('be.visible')
})

Then('select an article from the contebio carousel', () => {
    cy.wait(2000)
    cy.scrollTo('center')
    nav.selectCarruselContebio()
})

Then('select a subcategory of contebio', () => {
    cy.scrollTo('center')
    nav.contebio()
})

Then('select the popup We hear you', () => {
    nav.voiceClient()
})

Then('check the label We want to improve for you!', () => {
    nav.isMobileFrameNav().contains("¡Queremos mejorar para tí!")
})

Then('select button here', () => {
    nav.isMobileFrameNav().contains("aquí.").invoke('attr', 'target', '_parent').click({ force: true })
})

Then('complete the required fields', () => {
    nav.isMobileFrameNav().find('.rating-label.nine > input[name="rating"]').first().check()
    nav.isMobileFrameNav().find('#84fb-9d73-35b9-78f2-5cc7-e51a-b2a9-e2b2').select("Comprar un producto")
    nav.isMobileFrameNav().contains("Aún no termino").click({ force: true })
})

Then('select Send', () => {
    nav.isMobileFrameNav().contains("Enviar").click({ force: true })
})

Then('verify text {string} in We listen to you', (mensaje) => {
    nav.isMobileFrameNav().contains(mensaje).should('exist')
})

Then('select {string} in completing the objective', (opcion) => {
    cy.wait(1000)
    if (isStore("liverpool") && opcion == "Sí") {
        opcion = "Si"
    }
    nav.isMobileFrameNav().contains(opcion).click({ force: true })
})

Then('select {string} in the reason option {string}', (motivo, opcion) => {
    cy.wait(1000)
    if (opcion == "de la visita") {
        nav.isMobileFrameNav().find('._1FGlSZ-XuP6a_WzPyMjJXy').select(motivo)
    } else {
        nav.isMobileFrameNav().contains("No").click({ force: true })
        if (!isStore("liverpool") && !(motivo=='Otro')) {
            motivo = "No pude encontrar el producto que deseo"
        }
        nav.isMobileFrameNav().find('._1FGlSZ-XuP6a_WzPyMjJXy').eq(1).select(motivo)
    }
})

Then('verify that no text exists {string} in We listen to you', (mensaje) => {
    nav.isMobileFrameNav().contains(mensaje).should('not.be.exist')
})

Then('select trip type {string}', (tipo) => {
    if (tipo == "Viajes Liverpool") {
        cy.get(':nth-child(1) > .a-category__listElement').click({ force: true })
    } else {
        cy.get(':nth-child(2) > .a-category__listElement').click({ force: true })
    }
})

Then('check the Packages label on {string}', (opcion) => {
    if (opcion == "Viajes Liverpool") {
        cy.url().should('contain', 'https://viajestr.' + store + '.com.mx/')
    } else {
        cy.url().should('contain', 'https://viajesci.' + store + '.com.mx/')
        generic.text("paquetes")
    }
})

Then('check the label Get your insurance quote!', () => {
    cy.url().should('contain', 'https://miseguro.' + store + '.com.mx/')
    generic.text("¡Cotiza tu seguro!")
})

Then('check the interior design label', () => {
    cy.url().should('contain', 'https://' + site + '.' + store + '.com.mx/tienda/paginas/diseno-interiores')
    cy.get('.o-blpMainContent').should('be.visible')
})

Then('select {string} the interior', (option) => {
    switch (option) {
        case "Contáctanos":
            nav.contactanosButton()
            break
        default:
            nav.citaButton()
    }
})

Then('check the redirection to form', () => {
    //cy.url().should('contain', 'https://' + site + '.' + store + '.com.mx/tienda/paginas/cdi/formulario')
    cy.get('.footer > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1)')
    cy.get('.footer > :nth-child(1) >').should('exist')
})

Then('select safe{string}', (seguro) => {
    if (isStore("liverpool")) {
        cy.contains(seguro).click({ force: true })
    } else {
        if (seguro == "Seguro de Auto") {
            nav.seguroAuto()
        } else {
            nav.seguroCel()
        }
    }
    cy.wait(1000)
})

Then('check the redirection to home insurance {string}', (seguro) => {
    if (seguro == "Seguro de Auto") {
        if (isStore("liverpool")) {
            cy.url().should('contain', 'https://cotizadorauto.' + store + '.com.mx/')
        } else {
            cy.url().should('contain', 'https://cotizador.' + store + '.com.mx/')
        }
    } else if (seguro == "Seguro para Mascota") {
        cy.url().should('contain', 'https://seguromascotas.' + store + '.com.mx/')
        generic.text("Mi seguro de mascotas")
    } else {
        //cy.url().should('contain', 'https://care.' + store + '.com.mx/')
        if (isStore("liverpool")) {
            generic.text("Cotiza aquí tu Plan Sin Deducible")
        } else {
            generic.text("Conoce la protección que tenemos para tus dispositivos:")
        }
    }
})

Then('verify that shows the privacy notice', () => {
    cy.url().should('include', 'https://assetspwa.liverpool.com.mx/ayuda/')
})

Then('check the carousel Best sellers when searching for an invalid word', () => {
    if (isStore("liverpool")) {
        cy.get('#perso_nullLookups_carrusel').should('exist').should('be.visible')
    } else if (isStore("suburbia")) {
        cy.get('#carouselNS-1').should('exist').should('be.visible')
    }
})

Then('select an item from the carousel', () => {
    nav.carouselMore()
})

Then('check the explore by categories section', () => {
    nav.carouselCategorias().should('be.visible').find('.o-blpMainContent-titulo').should('be.visible')
})

Then('select a category', () => {
    nav.exploraCategorias().last().click({ force: true })
})

Then('view the page', () => {
    nav.viewCategoria().should('be.visible')
})

Then('check the carousel trending articles', () => {
    nav.tendencia().scrollIntoView().wait(500).should('be.visible')
})

Then('select an item from the carousel in trends', () => {
    nav.tendencia().find('.item > a > .card').first().click({ force: true })
})

When('select button {string} of categories', (name) => {
    cy.wait(500)
    if (isMobile()) {
        cy.get('.a-header__navMobileLink').contains(name).click({ force: true })
    } else {
        cy.get('#categories-sidebarMenu > div > > li > a').contains(name).click()
    }
})

Then('verify that the search is found {string} in the history', (busqueda) => {
    cy.wait(500)
    generic.searchBar().click().wait(500)
    nav.searchHistory().should('be.visible')
    nav.searchHistory().contains(busqueda)
})

Then('delete history', () => {
    cy.wait(500)
    generic.searchBar().click().wait(500)
    if (isMobile()) {
        nav.searchHistory().contains('Borrar todo').click()
    } else {
        nav.searchHistory().find('#buttonDeleteSearchbar').click()
    }

})

Then('verify that only the list of trends is shown', () => {
    nav.searchHistory().should('not.exist')
    nav.searchTrends().should('be.visible')
})

Then('verify that the last search history is shown at the top', () => {
    cy.wait(500)
    generic.searchBar().click().wait(500)
    nav.searchHistory().find('.a-sayt__typeaheadLink').first().contains('Playera')
})

Then('eliminate {string} of history', (palabra) => {
    cy.wait(500)
    generic.searchBar().click().wait(500)
    nav.searchHistory().contains(palabra).parent().find('#buttonDeleteSearchbar').click()
})

Then('verify that the search is not found {string} in the history', (palabra) => {
    cy.wait(500)
    generic.searchBar().click()
    nav.searchHistory().contains(palabra).should('not.exist')
})

Then('verify that it is only removed per line', () => {
    cy.wait(500)
    generic.searchBar().click()
    nav.searchHistory().contains('Borrar todo').should('not.exist')
    nav.searchHistory().find('#buttonDeleteSearchbar').should('exist')
    nav.searchHistory().find('#buttonDeleteSearchbar').should('be.visible')
})

Then('select {string} of history', (palabra) => {
    cy.wait(500)
    generic.searchBar().wait(500).click().clear({ force: true })
    nav.searchHistory().contains(palabra).click()
})

Then('check the redirection to {string} of history of {string}', (tipo, palabra) => {
    if (tipo == "plp") {
        cy.url().should('contain', 'https://' + site + '.' + store + '.com.mx/tienda?s=')
        cy.get('.o-container__secondary').should('be.visible')
        cy.get('.card-title').contains(palabra)
    } else {
        cy.url().should('contain', 'https://' + site + '.' + store + '.com.mx/tienda/pdp/')
        cy.get('.o-product__description').should('be.visible')
        cy.get('.product-header-container').contains(palabra)
        /* if (isMobile()) {
            cy.get('.product-header-container').contains(palabra)
        } else {
            cy.get('.m-product__information--code').contains(palabra)
        } */
    }
})

Then('select product from the trend list in the search engine', () => {
    cy.wait(500)
    generic.searchBar().click().wait(500)
    nav.searchTrends().find('.a-sayt__typeaheadLink').last().then(($name) => {
        const text = $name.text()
        cy.wrap(text).as('nameItem')
        cy.wrap($name).click()
    })
})

Then('verify direction to the chosen product', () => {
    cy.get('@nameItem').then((name) => {
        cy.log(name)
        let nameParsed = '';
        const trimmedStr = name.trim();
        // Split the string by spaces
        const words = trimmedStr.split(/\s+/);
        // Check the length of the resulting array and log the result
        if (words.length === 1) {
            //if has a one word dont replace the space that has
            nameParsed = name;
        } else {
            cy.log('nmae', name )
            //replace all space if the word is is greater than one.  
            nameParsed = name.replaceAll(" ", "+");
            let lastChar = nameParsed.trim().slice(0, -1) + ''; // Get the last character
            nameParsed = lastChar;
        }
        let url = "https://" + site + "." + store + ".com.mx/tienda?s=" + nameParsed;
        cy.url().should('contain', url.replace(" ", ""))
    });
})

// --- SEARCH ---

Then('Search for the word {string} matches the expected results', (word) => {
    nav.searchedWord2(word)
})

Then('Delete search through the X icon', () => {
    nav.crossSearchIcon().click()
})

Then('verify show magnifying glass', () => {
    nav.lensSearchIcon().should('be.visible')
})

Then('verify that the search entry is empty', () => {
    nav.inputSearch().should('be.empty')
})

Then('the search component must be opened completely', () => {
    nav.modalSearch().should('be.visible')
})
