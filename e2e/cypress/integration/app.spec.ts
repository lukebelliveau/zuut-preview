/// <reference types="cypress" />
import '../support/commands';

describe('app', () => {
  it('creates a grow', () => {
    cy.logout();
    cy.visit('/');

    cy.findByText('Get started').click();

    /**
     * this block is testing Auth0 UI code which makes the test more brittle
     * but unfortunately there is no way to programmatically log in a user
     * with `useAuth0`. The only known hack involves using localStorage
     * for the JWT but this is a higher security risk as it exposes the
     * token details to the user.
     * https://github.com/auth0/auth0-react/issues/234
     */
    cy.findByLabelText('Email address').type(Cypress.env('AUTH_USERNAME'));
    cy.findByLabelText('Password').type(Cypress.env('AUTH_PASSWORD'));
    cy.findByText('Continue').click();

    cy.visit('/playgrounds/new?reset-playground=true');

    cy.findByLabelText('name').type('Test Grow').type('{enter}');
    cy.findByLabelText('length').type('20');
    cy.findByLabelText('width').type('30');
    cy.findByText('Create new layout').click();

    cy.findByText('Name: Test Grow').should('exist');

    cy.findByText('Objects').click();

    // add item
    cy.findByRole('button', { name: /Pot 2x2/i }).click();

    // see control panel
    cy.findByText('Description').should('exist');
    cy.findByText('Transform').should('exist');

    cy.findByRole('menuitem', { name: /Pot 2x2/i })
      .focus()
      .type('{backspace}');
    cy.findByRole('menuitem', { name: /Pot 2x2/i }).should('not.exist');

    cy.undo();

    cy.findByRole('menuitem', { name: /Pot 2x2/i }).click();

    cy.findByLabelText('delete item').click();
    cy.findByRole('menuitem', { name: /Pot 2x2/i }).should('not.exist');
  });
});
