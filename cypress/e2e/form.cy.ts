describe('Forme spec', () => {
  it('Form page renders', () => {
    cy.visit('/form')
    cy.contains('h3', 'Compile the form')
  })
  cy.get('form').within(($form) => {
    // you have access to the found form via
    // the jQuery object $form if you need it

    // cy.get() will only search for elements within form,
    // not within the entire document
    cy.get('input[name="email"]').type('john.doe@email.com')
    cy.get('input[name="password"]').type('password')
    cy.root().submit()
  })
  /*   it('Just a test to remove page load on coverage saving', () => {
      expect(true).to.equal(true);
    }); */
})