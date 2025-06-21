describe('Register Page', () => {
  it('datos vacíos', () => {
    cy.visit('http://localhost:5173/register');

    cy.contains('button', 'Registrarse').should('be.disabled');
  });

  it('Datos incorrectos', () => {
    cy.visit('http://localhost:5173/register');

    cy.get('input[name="name"]').type('1332333');
    cy.get('input[name="lastName"]').type('133332');
    cy.get('input[name="email"]').type('correo incorrecto');
    cy.get('input[name="password"]').type('Americaaa13@');

    cy.contains('button', 'Registrarse').click();
  });

  it('Datos numericos', () => {
    cy.visit('http://localhost:5173/register');

    cy.get('input[name="name"]').type('1332333');
    cy.get('input[name="lastName"]').type('133332');
    cy.get('input[name="email"]').type('example@gmail.com');
    cy.get('input[name="password"]').type('Americaaa13@');

    cy.contains('button', 'Registrarse').click();

    //mensajes de error
    cy.contains('p', 'El nombre solo puede contener letras y espacios.').should(
      'be.visible'
    );
    cy.contains(
      'p',
      'El apellido solo puede contener letras y espacios.'
    ).should('be.visible');
  });

  it('Datos correctos', () => {
    cy.intercept('POST', 'http://localhost:3000/register').as('postRegister');

    cy.visit('http://localhost:5173/register');

    cy.get('input[name="name"]').type('carlos');
    cy.get('input[name="lastName"]').type('perez');
    cy.get('input[name="email"]').type('carlos2@gmail.com');
    cy.get('input[name="password"]').type('carlos12@');

    cy.contains('button', 'Registrarse').click();

    //datos enviados al servidor
    cy.wait('@postRegister').its('response.statusCode').should('eq', 200);
  });

  it('Correo registrado', () => {
    cy.intercept('POST', 'http://localhost:3000/register').as('postRegister');

    cy.visit('http://localhost:5173/register');

    cy.get('input[name="name"]').type('carlos');
    cy.get('input[name="lastName"]').type('perez');
    cy.get('input[name="email"]').type('carlos2@gmail.com');
    cy.get('input[name="password"]').type('carlos12@');

    cy.contains('button', 'Registrarse').click();

    //datos enviados al servidor
    cy.wait('@postRegister').its('response.statusCode').should('eq', 400);

    //mensaje del servidor
    cy.contains('div', 'El correo electrónico ya está registrado');
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
