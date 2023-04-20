it('Just a test to remove page load on coverage saving', () => {
  expect(true).to.equal(true);
});

describe('template spec', () => {
  it('passes', () => {
    cy.visit('/')
    cy.contains('h1', 'Main page')
    cy.get('#search__input').should("be.visible");
    cy.get('.reset-btn').should("be.visible")
  })
})