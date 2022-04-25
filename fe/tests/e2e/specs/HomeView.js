describe('HomeView.vue', () => {
  it('Visits the root page', () => {
    cy.visit('/');
    cy.get('#app').should('have.css', 'background-color', 'rgb(255, 255, 255)');
    cy.get('.hello-answer').should('include.text', 'ANSWER PLUGIN');
    cy.get('.v-item-group').children('.v-list-item').should('have.length', 2);
    cy.get('.v-item-group')
      .children('.v-list-item')
      .eq(0)
      .should('have.text', 'English');
    cy.get('.v-item-group').children('.v-list-item').eq(1).should('have.text', '한글');
  });

  it('Change Dark Mode', () => {
    cy.visit('/');
    cy.get('button').click();
    cy.get('#app').should('have.css', 'background-color', 'rgb(18, 18, 18)');
  });

  it('Change Language', () => {
    cy.visit('/');
    cy.get('button').click();
    cy.get('.v-item-group').children('.v-list-item').eq(0).click();
    cy.get('.hello-answer').should('include.text', 'Welcom to ANSWER PLUGIN!');
  });
});
