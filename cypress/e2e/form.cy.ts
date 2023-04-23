describe('Form page spec', () => {
  beforeEach(() => { cy.visit('/form') })

  it('Form page renders', () => {
    cy.contains('h3', 'Compile the form')
  })
  it("With all fields empty error messages and no modal message are displayed", () => {
    cy.get('.submit-btn').click();
    cy.get(".modalInfo__frame").should("not.exist");
    cy.get("p").filter(':contains("required")').should("have.length", 8);
    cy.contains("Input the birth date").should("be.visible");
    cy.contains("load an image").should("be.visible");
  })
  it("Modal message is displayed and the custom card renders correctly after all fields compiled", () => {
    cy.get('form').within(() => {
      cy.get('input[name="firstName"]').type('John').should("have.value", 'John')
      cy.get('input[name="lastName"]').type('Doer').should("have.value", 'Doer')
      cy.get(':nth-child(2) > .gender-radio__label').click()
      cy.get('input[name="country"]').type('Japan').should("have.value", 'Japan')
      cy.get('input[name="birthDate"]').type('2000-01-01')
      cy.get(':nth-child(7) > select').select(1).should("have.value", "lightsalmon")
      cy.get(':nth-child(8) > select').select(1).should("have.value", "blue")
      cy.get(':nth-child(9) > select').select(1).should("have.value", "Dog")
      cy.get('input[type="checkbox"]').check();
      cy.get('input[type="file"]').selectFile("./src/assets/812mS4kuq4L.png");
      cy.root().submit()
    })
    cy.get(".modalInfo__frame").should("be.visible");
    cy.get(".card__wrapper").should("be.visible").and("contain.text", "John");

    cy.get(".card__wrapper").click();
    cy.get(".modalCard__frame").and("be.visible");

  })

  /*   it('Just a test to remove page load on coverage saving', () => {
      expect(true).to.equal(true);
    }); */
})