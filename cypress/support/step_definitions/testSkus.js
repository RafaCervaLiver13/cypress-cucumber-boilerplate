import { Then } from "@badeball/cypress-cucumber-preprocessor";
import genericPage from "../pages/genericPage.js"
import testSkusPage from "../pages/testSkusPage.js";

const skus = new testSkusPage()
const generic = new genericPage()
import { utility } from "../utility.js";
const skuJson = new utility().getSku();
let site = Cypress.env('SITE');
let sku

beforeEach(() => {

	cy.fixture(skuJson).then((select) => {
		sku = select
	})

})

Then('verifico existencia de sku', () => {
    /*var skus = []; // Arreglo para almacenar los SKUs
    let skuInfo
    // Recorriendo el objeto
    for (var tienda in sku) {
        // Iterando sobre los elementos de la tienda
        for (var categoria in sku[tienda]) {
            // Iterando sobre los elementos de la categoría
            for (var i = 0; i < sku[tienda][categoria].length; i++) {
                // Iterando sobre los elementos generales

                for(var subtype in sku[tienda][categoria][i]){
                    for (var j = 0; j < sku[tienda][categoria][i][subtype].length; j++) {
                        // Agregando el SKU al arreglo
                        skuInfo = {
                            store : tienda,
                            tipo : categoria,
                            subtipo : subtype,
                            sku : sku[tienda][categoria][i][subtype][j].sku,
                            //nombre : sku[tienda][categoria][i][subtype][j].nombre
                        }
                        skus.push(skuInfo);
                    }
                }   
            }
        }
    }*/
    const skus = Object.entries(sku).flatMap(([tienda, categorias]) =>
        Object.entries(categorias).flatMap(([categoria, elementos]) =>
            elementos.flatMap(elemento =>
                Object.entries(elemento).flatMap(([subtype, subelementos]) =>
                    subelementos.map(subelemento => ({
                        store: tienda,
                        tipo: categoria,
                        subtipo: subtype,
                        sku: subelemento.sku
                        //nombre: subelemento.nombre
                    }))
                )
            )
        )
    );
    let skusNoExistentes = []
    
    const miPromise = new Promise((resolve, reject) => {
        skus.forEach((sku) => {
            cy.request('GET', 'https://' + site + '.' + sku.store + '.com.mx/typeahead?query=' + sku.sku + '&type=all')
            .then((response) => {
                expect(response.body).to.have.property('products');
                const elemento = response.body.products;
                cy.wrap(elemento).then(($element) => {
                    if($element.length == 0){
                        skusNoExistentes.push(sku)
                        cy.log("No existe Sku")
                    }  
                });
            });
        })
        resolve('¡La Promise se resolvió!');
    })
    cy.wrap(miPromise).then(resultado => {
        cy.log(JSON.stringify(skusNoExistentes));
    })
})

Then('verifico existencia de sku v2', () => {

    //const [type, subtype] = skuType.split(',');
	//const jsonData = sku[store][type][0][subtype];
    var skus = []; // Arreglo para almacenar los SKUs
    let skuInfo
    let skusNoExistentes = []
    const miPromise = new Promise((resolve, reject) => {
        // Recorriendo el objeto
        for (var tienda in sku) {
            // Iterando sobre los elementos de la tienda
            for (var categoria in sku[tienda]) {
                // Iterando sobre los elementos de la categoría
                for (var i = 0; i < sku[tienda][categoria].length; i++) {
                    // Iterando sobre los elementos generales

                    for(var subtype in sku[tienda][categoria][i]){
                        for (var j = 0; j < sku[tienda][categoria][i][subtype].length; j++) {
                            // Agregando el SKU al arreglo
                            skuInfo = {
                                store : tienda,
                                tipo : categoria,
                                subtipo : subtype,
                                sku : sku[tienda][categoria][i][subtype][j].sku,
                                //nombre : sku[tienda][categoria][i][subtype][j].nombre
                            }
                            skus.push(skuInfo);
                            cy.request('GET', 'https://www.' + tienda + '.com.mx/typeahead?query=' + sku[tienda][categoria][i][subtype][j].sku + '&type=all')
                            .then((response) => {
                                // verify that la respuesta tenga el código de estado 200
                                //expect(response.status).to.eq(200);

                                //expect(response.body).to.have.property('products');

                                // Accede al elemento dentro de la respuesta
                                const elemento = response.body.products;
                                cy.wrap(elemento).then(($element) => {
                                    if($element.length == 0){
                                        skusNoExistentes.push(skus[skus.length - 1])
                                        cy.log("No existe Sku")
                                    }  
                                    //expect($element).to.not.be.empty;
                                });
                            });
                        }
                    }   
                }
            }
        }
        resolve('¡La Promise se resolvió!');
    })

    cy.wrap(miPromise).then(resultado => {
        cy.log(JSON.stringify(skusNoExistentes));
    })
})