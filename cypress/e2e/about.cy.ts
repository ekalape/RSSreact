describe('About Page spec', () => {
  it('About Page renders', () => {
    cy.visit('/about');
    cy.get(".about__wrapper").should("be.visible");
  })
})
describe('Not Found Page spec', () => {
  it('Not Found Page renders', () => {
    cy.visit('/hjdfyth');
    cy.get(".fail-message").should("be.visible").and("contain.text", "does not exist");
  })
})