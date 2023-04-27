

describe('Main page spec', () => {
  beforeEach(() => {
    cy.visit('/');
  })
  it('Main page renders correctly', () => {
    cy.contains('h1', 'Main page')
    cy.get('#search__input').should("be.visible");
    cy.get('.reset-btn').should("be.visible");
    cy.get(".search-btn").should("be.visible");
  })
  it('Search input empty on first load', () => {
    cy.get("#search__input").should("be.empty");
  })
  it('Reset btn cleans the input field', () => {
    cy.get("#search__input").type("bagdtdu").and("have.value", "bagdtdu");
    cy.get(".search-btn").click();
    cy.get(".card__wrapper").and("have.length", 0);
    cy.get(".reset-btn").click();
    cy.get("#search__input").should("have.value", "")
  })

  it('Cards container renders cards', () => {
    cy.get(".cards__container").should("be.visible");
    cy.get(".card__wrapper").should("have.length.above", 1)
  })

  it('Does not find anything if wrong search input', () => {
    cy.get("#search__input").type("afafaa").and("have.value", "afafaa");
    cy.get(".search-btn").click();
    cy.get(".cards__container").should("be.visible");
    cy.get(".card__wrapper").and("have.length", 0);

  })
  it('Open Modal window after the click on the card', () => {
    cy.get(".card__wrapper").then((cards) => {
      const card = cards[0];
      card.click();
      cy.get(".modalCard__frame").and("be.visible");
      cy.get(".modal-closeBtn").click();
      cy.get(".modalCard__frame").and("not.exist");
    })
  })

})