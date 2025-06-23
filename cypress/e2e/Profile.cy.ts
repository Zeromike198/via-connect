describe('Profile Page', () => {
  //ejecutar este proceso en todos los its
  beforeEach(() => {
    //interceptar peticion de datos del usuario
    cy.intercept('GET', '**/user').as('getProfile');
    cy.visit('http://localhost:5173/profile', {
      onBeforeLoad(win) {
        win.localStorage.setItem('userID', '20');
      },
    });
    //esperar la respuesta
    cy.wait('@getProfile').then((interception) => {
      if (!interception.response) {
        throw new Error('No hubo respuesta del servidor');
      }
      expect([200, 304]).to.include(interception.response.statusCode);
    });
  });

  it('Los inputs deben tener información del usuario', () => {
    //verificar que todos los inputs tengan data
    cy.get('input').each(($el) => {
      cy.wrap($el).should('not.have.value', '');
    });
  });

  it('hacer click en el modal', () => {
    //abrir el modal
    cy.get('img#user-image').click();

    //verificar que el modal este visible
    cy.get('#radix-«r2»').should('be.visible')

    //cerrar modal
    cy.get('.ring-offset-background').click()
  });
});