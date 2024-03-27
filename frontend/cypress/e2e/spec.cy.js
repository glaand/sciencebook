describe('template spec', () => {
    it('Open website', () => {
        cy.visit('http://localhost:3000/')
    })

    /* ==== Test Created with Cypress Studio ==== */
    it('Login and welcome message', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.visit('http://localhost:3000/');
        cy.get(':nth-child(1) > .grow').clear('f');
        cy.get(':nth-child(1) > .grow').type('fhgr@fhgr.ch');
        cy.get('.my-3 > .grow').clear();
        cy.get('.my-3 > .grow').type('FHGR123?');
        cy.get('.btn > span').click();
        cy.get('.flex-col').click();
        cy.get('.text-4xl').should('have.text', 'Welcome to Sciencebook👋');
        /* ==== End Cypress Studio ==== */
    });
})
