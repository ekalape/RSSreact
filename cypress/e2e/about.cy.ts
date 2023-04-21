describe('template spec', () => {
  it('passes', () => {
    cy.visit('/about');
    cy.get(".about__wrapper").should("be.visible")

  })
  /*   it('Just a test to remove page load on coverage saving', () => {
      expect(true).to.equal(true);
    }); */

})