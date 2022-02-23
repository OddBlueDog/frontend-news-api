// news_list.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

it('Check page components have loaded', () => {
  cy.visit('http://localhost:3000');
  cy.get('[data-cy=search-submit]').should('be.visible');
  cy.get('[data-cy=search-input]').should('be.visible');
  cy.get('[data-cy=news-snippet]').should('be.visible');
});

it('Test Search', () => {
  cy.intercept({
    method: 'get',
    url: '/news/*',
  }).as('apiCheck');

  cy.visit('http://localhost:3000');
  cy.wait('@apiCheck').then((interception) => {
    assert.isNotNull(interception.response.body, '1st API call has data');
  });
  cy.get('[data-cy=news-snippet]').should('length.be.gt', 2);

  cy.get('[data-cy=search-input]').type('london');
  cy.get('[data-cy=search-submit]').click();
  cy.wait('@apiCheck').then((interception) => {
    assert.isNotNull(interception.response.body, '2nd API call has data');
  });
  cy.get('[data-cy=news-snippet]').should('be.visible');
});
