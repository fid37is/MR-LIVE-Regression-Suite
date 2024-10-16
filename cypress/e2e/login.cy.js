

describe('Login Test Suite', () => {
  const baseUrl = Cypress.env('baseUrl')

  let credentials

  beforeEach(() => {
    cy.fixture('credentials').then((creds) => {
      credentials = creds
    })
    cy.visit(`${baseUrl}`)
  })

    it('Sign in with a valid email/username and valid password', () => {
      cy.login(credentials.email, credentials.password)
      cy.url().should('include', '/dashboard')
      cy.contains('Home').should('be.visible')
    })

    it('When signed in, clicking on the log out button should sign the user out of the app', () => {
      cy.login(credentials.email, credentials.password)
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
      cy.login(credentials.email, credentials.password)
      cy.contains('Settings').click()
      cy.contains('Password').click()
      cy.get('input[name="oldPassword"]').type(credentials.password)
      cy.get('input[name="newPassword"]').type('1234Papa!')
      cy.get('input[name="confirmPassword"]').type('1234Papa!')
      cy.contains('Update').click()
      cy.contains('Password was reset successfully!!!').should('be.visible')
    })


    it('Verify the user is locked out of the system when invalid auth credentials are entered a number of times', () => {
      for (let i = 0; i < 6; i++) {
        cy.login('fidelis+11@vpcarehome.com', 'invalid-password')
        cy.wait(1000) // Adjust the wait time as needed
      }
      cy.contains('Too Many Login Attempt, Please Try Again After Few Minutes.').should('be.visible')
    })
    

})

