describe('Landing Page', () => {
  it('Obtener total de usuarios', () => {
    //interceptar peticion al servidor
    cy.intercept('GET', 'http://localhost:3000/').as('getUsers');

    //visitamos la landing page
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