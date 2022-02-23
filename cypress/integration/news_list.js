// news_list.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

beforeEach(() => {
  cy.intercept('http://localhost:3001/**/*', { middleware: true }, (req) => {
    req.on('before:response', (res) => {
      // force all API responses to not be cached
      res.headers['cache-control'] = 'no-store';
    });
  });
});

it('Check page components have loaded and first API call works', () => {
  cy.intercept({
    method: 'get',
    url: '/news/*',
  }).as('apiCheck');

  cy.visit('http://localhost:3000');
  cy.get('[data-cy=search-submit]').should('be.visible');
  cy.get('[data-cy=search-input]').should('be.visible');
  cy.get('[data-cy=news-snippet]').should('be.visible');

  cy.wait('@apiCheck').then((interception) => {
    expect(interception.response.statusCode).to.equal(200);
    expect(interception.request.method).to.equal('GET');
    assert.isNotNull(interception.response.body, '1st API call has data');
  });

  cy.get('[data-cy=news-snippet]').should('length.be.gt', 2);
});

it('Test Search', () => {
  const search = 'london';

  cy.visit('http://localhost:3000');

  cy.intercept({
    method: 'get',
    url: /\/news\/\?q=(\w+)$/,
  }).as('apiCheck');

  cy.get('[data-cy=search-input]').type(search);
  cy.get('[data-cy=search-submit]').click();

  cy.wait('@apiCheck').then((interception) => {
    expect(interception.response.statusCode).to.equal(200);
    expect(interception.request.method).to.equal('GET');
    assert.isNotNull(interception.response.body, '2nd API call has data');
  });

  cy.get('[data-cy=news-snippet]').should('be.visible');
});

it('Test news snippets have all sections and are visible', () => {
  cy.visit('http://localhost:3000');

  cy.get('[data-cy=news-snippet]').within(() => {
    cy.get('[data-cy=news-snippet-date]').should('be.visible');
    cy.get('[data-cy=news-snippet-img]').should('be.visible');
    cy.get('[data-cy=news-snippet-link]').should('be.visible');
    cy.get('[data-cy=news-snippet-title]').should('be.visible');
  });
});
