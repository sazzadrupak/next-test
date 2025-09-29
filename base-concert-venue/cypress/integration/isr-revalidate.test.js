import { generateNewBand } from '../../__tests__/__mocks__/fakeData/newBand';
import { generateRandomId } from '../../lib/features/reservations/utils';

it('should load refreshed page from cache after new band is added', () => {
  // check that the band is not on the page
  cy.task('db:reset').visit('/bands');
  cy.findByRole('heading', { name: /avalanche of cheese/i }).should(
    'not.exist'
  );

  const bandId = generateRandomId();
  const band = generateNewBand(bandId);
  const secret = Cypress.env('REVALIDATION_SECRET');

  cy.request('POST', `/api/bands?secret=${secret}`, {
    newBand: band,
  }).then((response) => {
    expect(response.body.revalidated).to.equal(true);
  });

  cy.reload();
  cy.findByRole('heading', { name: /avalanche of cheese/i }).should('exist');
});
