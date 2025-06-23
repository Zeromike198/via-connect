describe('Register Page', () => {
  it('datos vacíos', () => {
    cy.visit('http://localhost:5173/register');

    // Verifica que el botón esté deshabilitado si no se ingresan datos
    cy.contains('button', 'Registrarse').should('be.disabled');
  });

  it('Datos incorrectos', () => {
    cy.visit('http://localhost:5173/register');

    // Ingresa datos inválidos en los campos del formulario
    cy.get('input[name="name"]').type('1332333');
    cy.get('input[name="lastName"]').type('133332');
    cy.get('input[name="email"]').type('correo incorrecto');
    cy.get('input[name="password"]').type('Americaaa13@');

    // Intenta enviar el formulario con los datos inválidos
    cy.contains('button', 'Registrarse').click();
  });

  it('Datos numericos', () => {
    cy.visit('http://localhost:5173/register');

    // Ingresa nombres y apellidos con valores numéricos
    cy.get('input[name="name"]').type('1332333');
    cy.get('input[name="lastName"]').type('133332');
    cy.get('input[name="email"]').type('example@gmail.com');
    cy.get('input[name="password"]').type('Americaaa13@');

    cy.contains('button', 'Registrarse').click();

    // Verifica que aparezcan los mensajes de error de validación
    cy.contains('p', 'El nombre solo puede contener letras y espacios.').should(
      'be.visible'
    );
    cy.contains(
      'p',
      'El apellido solo puede contener letras y espacios.'
    ).should('be.visible');
  });

  it('Datos correctos', () => {
    // Intercepta la petición POST al endpoint de registro
    cy.intercept('POST', 'http://localhost:3000/register').as('postRegister');

    cy.visit('http://localhost:5173/register');

    // Rellena el formulario con datos válidos
    cy.get('input[name="name"]').type('carlos');
    cy.get('input[name="lastName"]').type('perez');
    cy.get('input[name="email"]').type('carlos2@gmail.com');
    cy.get('input[name="password"]').type('carlos12@');

    // Envía el formulario
    cy.contains('button', 'Registrarse').click();

    // Verifica que el servidor responda con éxito
    cy.wait('@postRegister').its('response.statusCode').should('eq', 200);
  });

  it('Correo registrado', () => {
    // Intercepta la petición para simular correo duplicado
    cy.intercept('POST', 'http://localhost:3000/register').as('postRegister');

    cy.visit('http://localhost:5173/register');

    // Intenta registrarse con un correo ya utilizado
    cy.get('input[name="name"]').type('carlos');
    cy.get('input[name="lastName"]').type('perez');
    cy.get('input[name="email"]').type('carlos2@gmail.com');
    cy.get('input[name="password"]').type('carlos12@');

    cy.contains('button', 'Registrarse').click();

    // Verifica que el servidor devuelva un error por correo registrado
    cy.wait('@postRegister').its('response.statusCode').should('eq', 400);

    // Verifica que se muestre el mensaje correspondiente en pantalla
    cy.contains('div', 'El correo electrónico ya está registrado');
  });
});
