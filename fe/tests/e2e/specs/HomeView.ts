describe('HomeView.vue', () => {
  it('Visits the home page', () => {
    cy.visit('/home');
    cy.get('#app').should('have.css', 'background-color', 'rgb(255, 255, 255)');
  });
});
