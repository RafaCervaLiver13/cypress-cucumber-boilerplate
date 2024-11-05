# language: en
@gr @regression

Feature: Gift Registry

    Background: Visit liverpool.com
        Given visit the liverpool page

    # ALL TEST MOBILE 👌 🔥

    # 👍
    @gr-01 @IAT-12694 @p1 @liv @pb @gap
    Scenario: Search gift table.
        When select gift table
        * select button "Buscar una Mesa de Regalos"
        * write name "Maria" and last name "Perez"
        * select the button search in data of the celebrated
        Then shows search results on gift table

    # 👍
    @gr-02 @IAT-12696 @p0 @liv @pb @gap
    Scenario: See gift list.
        When select gift table
        * select button "Buscar una Mesa de Regalos"
        * write name "Maria" and last name "Perez"
        * select the button search in data of the celebrated
        * select button view list
        Then visualiza lista de regalos

    # 👍
    @gr-03 @IAT-12689 @p2 @liv @pb @gap
    Scenario: Login from buy now.
        When select gift table
        And select button "Buscar una Mesa de Regalos"
        Then write name "Maria" and last name "Perez"
        * select the button search in data of the celebrated
        And select search type of event "Boda"
        #* select next in gift table results
        * select button view list
        * select first gift
        * select celebrated
        * select button "Comprar ahora"
        Then log in with user "general"
        And display options

    @gr-04 @IAT-12681 @p1 @liv @pb @gap
    Scenario: Keep celebrated selected.
        When select menu log in
        And log in with user "general"
        * select gift table
        * select button "Buscar una Mesa de Regalos"
        Then write name "Maria" and last name "Perez"
        And select search type of event "Boda"
        * select the button search in data of the celebrated
        #* select next in gift table results
        * select button view list
        * select first gift
        * select celebrated
        * select button "Comprar ahora"
        Then shows the selected party in option

    @gr-05 @IAT-12687 @p0 @liv @pb @gap
    Scenario: Add to my bag from gift table.
        When select menu log in
        And log in with user "general"
        * select gift table
        * select button "Buscar una Mesa de Regalos"
        * write name "Maria" and last name "Perez"
        * select search type of event "Boda"
        * select the button search in data of the celebrated
        * select button view list
        * select first gift
        * select celebrated
        * select button "Agregar a mi bolsa"
        Then verify text "Agregaste 1 Producto a tu bolsa"

    @gr-06 @IAT-12665 @p1 @liv @pb @gap
    Scenario: Redirect to a gift table from the hamburger menu.
        When select menu log in
        And log in with user "general"
        * select gift table
        * select menu hamburger on gift table
        * select button "Buscar una mesa de regalos"
        * write name "Maria" and last name "Perez"
        * select search type of event "Boda"
        Then select the button search in data of the celebrated
        And select button view list
        * select first gift

    @gr-07 @IAT-12695 @p2 @liv @pb
    Scenario: Search table with wrong data.
        When select menu log in
        And log in with user "general"
        * select gift table
        * select menu hamburger on gift table
        * select button "Buscar una mesa de regalos"
        * write name "Dracula" and last name "Franky"
        * select the button search in data of the celebrated
        Then shows error message when there are no events for the search criteria

    # ❌
    @gr-08 @IAT-12671 @p1 @liv @pb @gap @ignore
    Scenario: Create an event.
        When select menu log in
        And log in with user "giftregistry"
        * select gift table
        * create new table
        #* select the type for the big day
        * select event type "Boda"
        And enter party details
        * enter event data
        * enter where do you want to receive your gifts?
        Then view contract in step 4

    @gr-09 @IAT-12668 @p2 @liv @pb @gap
    Scenario: Create an event from existing gift table.
        When select menu log in
        And log in with user "giftregistry"
        * select gift table
        * select menu hamburger on gift table
        Then select option "Crear nuevo evento" at the gift table

    @gr-10 @IAT-12685 @p1 @liv @pb @gap
    Scenario: Update event name.
        When select menu log in
        And log in with user "giftregistry"
        * select gift table
        * select my event data
        Then modify event name
        And select save on event name
        #And select button "Guardar"
        Then update event name

    @gr-11 @IAT-12675 @p2 @liv @pb @gap
    Scenario: Elements in celebration card.
        When select menu log in
        And log in with user "giftregistry"
        * select gift table
        * select in event menu "Tarjeta de Festejado"
        Then verify celebration card

    @gr-12 @IAT-12663 @p0 @liv @pb @gap
    Scenario: View gift table contract.
        When select menu log in
        And log in with user "giftregistry"
        * select gift table
        * select in event menu "Contrato"
        Then the contract is visible

    @gr-14 @IAT-12669 @p2 @liv @pb @gap
    Scenario: Zero notification message.
        When select menu log in
        And log in with user "giftregistry"
        * select gift table
        * select menu hamburger on gift table
        * select notifications at the gift table
        Then shows message no notifications exist

    # access denied in gha
    @gr-15 @IAT-12673 @p0 @liv @pb @gap @desktop
    Scenario Outline: Add <gift> to my table.
        When select menu log in
        And log in with user "giftregistry"
        * select gift table
        * select button "Agregar regalo a mi Mesa"
        * select button "Catálogo"
        * search for "sku" with type "sl,general"
        * select button add to my gift table
        * select event and radio button "<gift>"
        Then shows message you added a product to your table

        Examples:
            | gift               |
            | Regalo Físico      |
            | Regalo Electrónico |

    # No access for Cypress
    @gr-16 @IAT-12676 @p1 @liv @pb @gap
    Scenario: Show account status.
        When select menu log in
        And log in with user "giftregistry"
        * select gift table
        * select button "Estado de Cuenta"
        Then shows account statement

    # Check if the on and off ⭐️ can be validated
    @gr-17 @IAT-12677 @p2 @liv @pb @gap
    Scenario: Favorite a gift.
        When select menu log in
        And log in with user "giftregistry"
        * select gift table
        * select gift list item
        Then shows a star on the article

    # access denied gha
    @gr-18 @IAT-12688 @p0 @liv @pb @gap @desktop
    Scenario: Delete a gift.
        When select menu log in
        And log in with user "giftregistry"
        * select gift table
        * select checkbox for a gift
        * select delete from gift list
        * select button accept in modal
        Then the gift is removed

    # 👌
    @gr-19 @p1 @IAT-12692
    Scenario Outline: Search for a gift by criteria <search>.
        When select menu log in
        And log in with user "giftregistry"
        * select gift table
        * select search by product or category
        Then search word "<search>"
        And shows matches

        @liv
        Examples:
            | search  |
            | Consola |

        @pb
        Examples:
            | search |
            | Funda  |

        @gap
        Examples:
            | search  |
            | playera |


    # 👌
    @gr-20 @IAT-12664 @p2 @liv @pb @gap
    Scenario: Can't find a gift.
        When select menu log in
        And log in with user "giftregistry"
        * select gift table
        * select search by product or category
        Then search word "Golem"
        And shows search message with 0 results

    # 👌
    @gr-21 @IAT-12684 @p2 @liv @pb @gap
    Scenario: Change gift mode.
        When select menu log in
        And log in with user "giftregistry"
        * select gift table
        * select checkbox for a gift
        * select gift mode "Electrónicos"
        * select button "Aceptar"

    # 👌
    @gr-22 @IAT-12683 @p1 @liv @pb @gap
    Scenario: View table organizer.
        When select menu log in
        And log in with user "giftregistry"
        * select gift table
        * select menu hamburger on gift table
        * select button "Herramientas para mi evento"
        * select button "Organizador de mesas"
        Then shows edit table map button

    # 👌
    @gr-23 @IAT-12666 @p1 @liv @pb @gap
    Scenario: View list of tables.
        When select menu log in
        And log in with user "giftregistry"
        * select gift table
        * select menu hamburger on gift table
        * select button "Herramientas para mi evento"
        * select button "Organizador de mesas"
        * select button "Lista de mesas"
        Then display button edit list

    # added tag as desktop because in actions sends access denied
    @gr-24 @IAT-12674 @p0 @liv @pb @gap @desktop
    Scenario: View guest list.
        When select menu log in
        And log in with user "giftregistry"
        * select gift table
        * select menu hamburger on gift table
        * select button "Herramientas para mi evento"
        * select button "Lista de invitados"
        Then view guest list

    # 👌
    @gr-25 @IAT-12679 @p2 @liv @pb @gap
    Scenario: Add guest.
        When select menu log in
        And log in with user "giftregistry"
        * select gift table
        * select menu hamburger on gift table
        * select button "Herramientas para mi evento"
        * select button "Lista de invitados"
        * select button add guest to guest list
        Then complete required fields
        And guest guard
        Then display guest message added to list

    # 👌
    @gr-26 @IAT-12667 @p2 @liv @pb @gap
    Scenario: Edit guest.
        When select menu log in
        And log in with user "giftregistry"
        * select gift table
        * select menu hamburger on gift table
        * select button "Herramientas para mi evento"
        * select button "Lista de invitados"
        * guest edit
        Then guest guard

    # 👌
    @gr-27 @IAT-12695 @p2 @liv @pb @gap
    Scenario: Delete guest.
        When select menu log in
        And log in with user "giftregistry"
        * select gift table
        * select menu hamburger on gift table
        * select button "Herramientas para mi evento"
        * select button "Lista de invitados"
        * select guest
        Then select delete in guests

    # 👌
    @gr-28 @IAT-12691 @p2 @liv @pb @gap
    Scenario: Add companion.
        When select menu log in
        And log in with user "giftregistry"
        * select gift table
        * select menu hamburger on gift table
        * select button "Herramientas para mi evento"
        * select button "Lista de invitados"
        Then guest edit
        And select add companion
        Then write name of companion

    @gr-29 @IAT-12698 @p2 @liv @pb @gap @mobile
    Scenario: Edit companion.
        When select menu log in
        And log in with user "giftregistry"
        * select gift table
        * select menu hamburger on gift table
        * select button "Herramientas para mi evento"
        * select button "Lista de invitados"
        * select companion
        * edit companion
        Then modify last name

    @gr-30 @IAT-12697 @p2 @liv @pb @gap @mobile
    Scenario: Delete companion.
        When select menu log in
        And log in with user "giftregistry"
        * select gift table
        * select menu hamburger on gift table
        * select button "Herramientas para mi evento"
        * select button "Lista de invitados"
        * select companion
        Then remove companion
       # And guest guard

    @gr-31 @IAT-12690 @p2 @liv @pb @gap @mobile
    Scenario: Create group.
        When select menu log in
        And log in with user "giftregistry"
        * select gift table
        * select menu hamburger on gift table
        * select button "Herramientas para mi evento"
        * select button "Lista de invitados"
        * select groups
        * select create a new group
        Then create new group

    @gr-32 @IAT-12672 @p2 @liv @pb @gap @mobile
    Scenario: Edit group.
        When select menu log in
        And log in with user "giftregistry"
        * select gift table
        * select menu hamburger on gift table
        * select button "Herramientas para mi evento"
        * select button "Lista de invitados"
        * select groups
        * select Edit group
        * edit the group name
        Then edit group

    @gr-33 @IAT-12686 @p2 @liv @pb @gap @mobile
    Scenario: Delete group.
        When select menu log in
        And log in with user "giftregistry"
        * select gift table
        * select menu hamburger on gift table
        * select button "Herramientas para mi evento"
        * select button "Lista de invitados"
        * select groups
        * select Edit group
        Then delete group

    @gr-34 @IAT-12670 @p2 @liv @pb @gap @mobile
    Scenario: Assign group to guest.
        When select menu log in
        And log in with user "giftregistry"
        * select gift table
        * select menu hamburger on gift table
        * select button "Herramientas para mi evento"
        * select button "Lista de invitados"
        Then guest edit
        And assign group to guest
        * select group

    @gr-35 @IAT-12682 @p2 @liv @pb @gap @mobile
    Scenario Outline: Search Guest.
        When select menu log in
        And log in with user "giftregistry"
        * select gift table
        * select menu hamburger on gift table
        * select button "Herramientas para mi evento"
        * select button "Lista de invitados"
        Then search name "<name>" on guest list

        Examples:
            | name     |
            | Invitado |

    # Unicamente se verify that exista el filtro
    @gr-36 @IAT-12680 @p2 @liv @pb @gap @mobile
    Scenario Outline: Filter guests by <filters>.
        When select menu log in
        And log in with user "giftregistry"
        * select gift table
        * select menu hamburger on gift table
        * select button "Herramientas para mi evento"
        * select button "Lista de invitados"
        * select filter
        Then sample filter "<filters>"

        Examples:
            | filters    |
            | Grupo      |
            | Asistencia |
            | Edad       |

    #https://liverpooldigital.atlassian.net/browse/E2-2262
    @p1 @IAT-12678 @liv @pb @gap
    Scenario: Verify event download.
        When select menu log in
        And log in with user "giftregistry"
        * select gift table
        * click the download button
        Then verify that the file has been downloaded