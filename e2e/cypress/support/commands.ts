// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import '@testing-library/cypress/add-commands';

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      logout(): void;
      undo(): void;
    }
  }
}

Cypress.Commands.add('logout', () => {
  Cypress.log({
    name: 'logoutViaAuth0',
  });

  const options = {
    method: 'GET',
    url: 'https://dev-baqlbrdt.us.auth0.com/v2/logout',
  };
  cy.request(options);
});

Cypress.Commands.add('undo', () => {
  cy.findByTestId('playground-container').type('{meta+z}');
});
