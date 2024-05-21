/// <reference types="cypress"/>

describe('home spec', () => {
  it('hope web deve estar online', () => {
    cy.visit('http://localhost:3000/')
    cy.get('h1').should('have.text', 'Semeando esperança, colhendo sorrisos')
  })
})