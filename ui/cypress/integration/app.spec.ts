/// <reference types="cypress" />

const userName = process.env.TEST_USERNAME;
const password = process.env.TEST_PASSWORD;

describe('app', () => {
  it('creates a grow', () => {
    cy.visit('/');

    cy.login();

    // cy.findByText('Log in').click();

    // /**
    //  * this block is testing Auth0 UI code and there is a better way to do this
    //  * https://auth0.com/blog/end-to-end-testing-with-cypress-and-auth0/
    //  * https://github.com/cypress-io/cypress/issues/1342#issuecomment-366747803
    //  */
    // cy.findByLabelText('Email address').type(Cypress.env('auth_username'));
    // cy.findByLabelText('Password').type(Cypress.env('auth_password'));
    // cy.findByText('Continue').click();

    cy.visit('/playgrounds/new');

    cy.findByLabelText('name').type('Test Grow').type('{enter}');
    cy.findByLabelText('length').type('20');
    cy.findByLabelText('width').type('30');
    cy.findByText('Create new layout').click();

    cy.findByText('Name: Test Grow').should('exist');
  });

  it('creates, selects, and deletes an item', () => {
    cy.findByText('Objects').click();

    // add item
    cy.findByRole('button', { name: /Pot 2x2/i }).click();

    // select item from Inventory
    cy.findByRole('menuitem', { name: /Pot 2x2/i }).click();

    // see control panel
    cy.findByText('Description').should('exist');
    cy.findByText('Transform').should('exist');

    cy.findByRole('menuitem', { name: /Pot 2x2/i }).type('{backspace}');
    cy.findByRole('menuitem', { name: /Pot 2x2/i }).should('not.exist');
  });
});
