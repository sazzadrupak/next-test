it('displays correct heading when navigating to shows route', () => {
  cy.visit('/');
  cy.findByRole('button', { name: /shows/i }).click();
  cy.findByRole('heading', { name: /upcoming shows/i }).should('exist');
});

it('displays correct heading when navigating to bands route', () => {
  cy.visit('/');
  cy.findByRole('button', { name: /bands/i }).click();
  cy.findByRole('heading', { name: /our illustrious performers/i }).should(
    'exist'
  );
});

// it('resets the db', () => {
//   cy.task('db:reset');
// });

it('displays correct band name for band route that existed at build time', () => {
  cy.task('db:reset').visit('/bands/1');
  cy.findByRole('heading', { name: /SHamrock Pete/i }).should('exist');
});
