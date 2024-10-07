

describe('Login Test Suite', () => {
  const baseUrl = Cypress.env('baseUrl')

  beforeEach(() => {
    cy.visit(`${baseUrl}`)
  })

    it('Sign in with a valid email/username and valid password', () => {
      cy.login('bqa.rkwonkoso', '1234Phyl!')
      cy.url().should('include', '/dashboard')
      cy.contains('Home').should('be.visible')
    })

    it('When signed in, clicking on the log out button should sign the user out of the app', () => {
      cy.login('bqa.rkwonkoso', '1234Phyl!')
      cy.contains('Logout').click()
      cy.get('h1').should('have.text', 'Log In')
    })

    it('Verify forgot password function works', () => {
      cy.get('a[href="/reset"]').click()
      cy.get('input[name="Email"]').type('fidelis+321@baobabpartners.com')
      cy.contains('Continue').click()
      cy.contains('You should soon receive an email allowing you to reset your password').should('be.visible')
    })

    it('Verify Update password works within the web app', () => {
      cy.login('fidelis+321@baobabpartners.com', '1234Phyl!')
      cy.visit(`${baseUrl}/user/settings`)
      cy.get('a[href="/user/settings/password"]').click()
      cy.get('input[name="current-password"]').type('valid-password')
      cy.get('input[name="new-password"]').type('new-password')
      cy.get('button[type="submit"]').click()
      cy.contains('Password updated successfully').should('be.visible')
    })

})
