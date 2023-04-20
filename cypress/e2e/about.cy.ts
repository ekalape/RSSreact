describe('template spec', () => {
  it('passes', () => {
    cy.visit('/about');
    cy.get(".about__wrapper").should("be.visible")

  })
})