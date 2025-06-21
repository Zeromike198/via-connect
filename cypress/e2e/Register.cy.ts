describe('Register Page', () => {
  it('send empty data', () => {
    cy.visit('http://localhost:5173/register');

    // cy.get('input[name="name"]').type('');
    // cy.get('input[name="lastName"]').type('');
    // cy.get('input[name="email"]').type('');
    // cy.get('input[name="password"]').type('');

    cy.contains('button', 'Registrarse').click();

  });

  // it('send empty data', () => {
  //   cy.visit('http://localhost:5173/');
  // });
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


// describe('Formulario de registro', () => {
//   beforeEach(() => {
//     cy.visit('http://localhost:5173/register');
//   });

//   it('no permite letras en el campo de edad', () => {
//     cy.get('input[name="edad"]').type('abc').should('have.value', '');
//   });

//   it('envía correctamente con datos válidos', () => {
//     cy.get('input[name="nombre"]').type('Minna');
//     cy.get('input[name="edad"]').type('25');
//     cy.get('button[type="submit"]').click();

//     // Aquí podrías validar la redirección o un mensaje de éxito
//     cy.url().should('include', '/gracias');
//   });
// });
