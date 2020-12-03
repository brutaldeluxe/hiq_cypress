describe(Cypress.env('brand').toUpperCase() + ' - landing page', function () {

	beforeEach(function () {
		cy.visit('/'+Cypress.env('sub_page_contact_us'), { failOnStatusCode: false })
		// accept cookie by default
		cy.setCookie('hiqCookie', '1')
	})

	afterEach(function () {
		cy.clearCookie('hiqCookie')
    })

    it('Verify title', function () {
        //check document title
        cy.title().should('eq', Cypress.env('contact-us_title'))
    })

    it('Verify header', function () {
        //Verify header text
        cy.get('h1.header').should('contain.text', 'KONTAKTA OSS')
    })
    
    it('Verify contact section', function (){
        //Check contact items
        cy.get('.content-phrase-block').should('have.length', 4)

        cy.get('.content-phrase-block:eq(0) > div > div > div > div').should('contain.text', 'HEAD OFFICE')

        cy.get('.content-phrase-block:eq(1) > div > div > div > div').should('contain.text', 'BUSINESS DEVELOPMENT')

        cy.get('.content-phrase-block:eq(2) > div > div > div > div').should('contain.text', 'KOMMUNIKATION')

        //skip last header title since there is no thext there
        //cy.get('.content-phrase-block:eq(3) > div > div > div > div').should('contain.text')
    })

    it('Verify offices section', () => {
        const office = ['stockholm', 'goteborg', 'helsingfors', 'vasteras', 'karlskrona', 'linkoping', 'malmo', 'moskva']
        //check all offices present
        cy.get('div.offices > div > div').should('have.length', 11)

        for(let k = 0; k < office.length; k++){
            cy.get('div.offices > div > div').eq(k).scrollIntoView({ force: true }).should('be.visible')
            cy.get('div.offices > div > div').eq(k)
                .find('a')
                .should("be.visible")
                .should('have.attr', 'href', '/jobb/' + office[k]+'/')
        }
    })

    it('Verify footer present', () => {
        cy.get('footer#main-footer').scrollIntoView({force: true}).should('be.visible')
    })
})