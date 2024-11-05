# language: en
@chk @regression

Feature: Checkout

    Background: Visit liverpool.com
        Given visit the liverpool page

    # pide verificación de seguridad
    @liv @p0 @IAT-12528 @ignore
    Scenario: Purchase and cancellation of item.
        When search for "sku" with type "sl,compraMinima"
        And write the minimum number of pieces required
        And select buy now on pdp
        And log in with user "creditoPurchases" from opt
        And enter CVV of the card
        And select button Checkout
        Then verify the purchase
        And select button "Mis compras"
        And select purchased product
        And select button cancel purchase
        And select option I dont need it anymore
        And select button Continue
        And select button "Confirmar cancelación"
        Then check cancellation