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
      generateToken({ secret }): void;

      login(): void;
      logout(): void;
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

/**
 * Programmatically generate a JWT token instead of
 * testing Auth0's web UI
 *
 * https://github.com/cypress-io/cypress/issues/1342#issuecomment-366747803
 */
Cypress.Commands.add('login', () => {
  Cypress.log({
    name: 'loginViaAuth0',
  });

  const options = {
    method: 'POST',
    url: Cypress.env('auth_url'),
    body: {
      grant_type: 'password',
      username: Cypress.env('auth_username'),
      password: Cypress.env('auth_password'),
      audience: Cypress.env('auth_audience'),
      scope: 'openid profile email',
      client_id: Cypress.env('auth_client_id'),
      client_secret: Cypress.env('auth_client_secret'),
    },
  };
  cy.request(options);
});
