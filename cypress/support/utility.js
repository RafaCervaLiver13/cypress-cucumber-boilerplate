export class utility {

    getBaseUrl() {
        let site = Cypress.env('SITE') // Get the value of environment variable
        let store = Cypress.env('STORE')

        const url = ['https://', site, '.', store, '.com.mx/'].join('')
        return url
    }

    getUser() {
        let env = Cypress.env('ENV')

        const usrProd = "users.prod.json"
        const usrQa = "users.qa.json"

        switch (env) {
            case 'prod':
                return usrProd
            case 'qa':
            case 'qa2':
            case 'qa3':
                return usrQa
        }
    }

    getSku() {
        let env = Cypress.env('ENV')

        const skuProd = "skus.prod.json"
        const skuQa = "skus.qa.json"

        switch (true) {
            case ["qa", "qa2", "qa3"].includes(env):
                return skuQa
            default:
                return skuProd
        }
    }

    getNav() {
        let env = Cypress.env('ENV')

        const navProd = "nav.prod.json"
        const navQa = "nav.qa.json"

        switch (true) {
            case ["qa", "qa2", "qa3"].includes(env):
                return navQa
            default:
                return navProd
        }
    }
}
