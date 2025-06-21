describe('Landing Page', () => {
  it('load total users', () => {
    cy.visit('http://localhost:5173/');
  });
});

Cypress.on('uncaught:exception', (err) => {
  if (
    /hydration/i.test(err.message) ||
    /Minified React error #418/.test(err.message) ||
    /Minified React error #423/.test(err.message)
  ) {
    return false; // evita que Cypress falle por este error
  }
});
