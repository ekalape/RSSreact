describe('template spec', () => {
  it('passes', () => {
    cy.visit('/form')
    cy.contains('h3', 'Compile the form')
  })
})