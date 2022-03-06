/// <reference types="cypress" />
import '../support/commands';

const login = () => {
  cy.logout();
  cy.visit('/');

  cy.findByText('Log in').click();

  cy.findByLabelText('Email address').type(Cypress.env('auth_username'));
  cy.findByLabelText('Password').type(Cypress.env('auth_password'));
  cy.findByText('Continue').click();
};

describe('app', () => {
  it('creates a grow', () => {
    login();
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
