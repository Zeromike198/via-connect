describe('Landing Page', () => {
  it('Obtener total de usuarios', () => {
    //interceptar peticion al servidor
    cy.intercept('GET', 'http://localhost:3000/').as('getUsers');

    cy.visit('http://localhost:5173/');

    //verificar que la data llegue con exito
    cy.wait('@getUsers').then((interception) => {
      if (!interception.response) {
        throw new Error('No hubo respuesta del servidor');
      }
      expect([200, 304]).to.include(interception.response.statusCode);
    });
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
