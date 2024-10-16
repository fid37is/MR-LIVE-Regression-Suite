describe("Validate MR User Management", () => {
    const baseUrl = Cypress.env("baseUrl");

    let credentials;

    beforeEach(() => {
        cy.fixture("credentials").then((creds) => {
            credentials = creds;
            cy.log(JSON.stringify(credentials));
        }).then(() => {
            cy.visit(`${baseUrl}`);
            cy.login(credentials.email, credentials.password);
        });
    });

    it("Verify user list", () => {
        cy.contains("Users").click();
        cy.url().should("include", "user/users");
    });


    it("Verify Adding using without email address", () => {
        cy.contains("Users").click();
        cy.contains("New User").click();
        cy.contains("New User").click();
        cy.log(JSON.stringify(credentials));

        //User Data
        cy.get('input[name="title"]').type(credentials.title);
        cy.get('input[name="firstName"]').type(credentials.firstName);
        cy.get('input[name="lastName"]').type(credentials.lastName);
        cy.contains('Continue').click()

        //User Permission
        cy.get('[role="combobox"]').eq(0).click()
        cy.get('[role="option"]').contains('Care & Therapy Home').click();
        //Select Profile
        cy.get('[role="combobox"]').eq(1).click()
        cy.get('[role="option"]').contains('Incident Entry').click();
        //Select Role
        cy.get('[role="combobox"]').eq(2).click()
        cy.get('[role="option"]').contains('Registered Nurse').click();
        cy.get('[type="button"]').click()
        cy.contains('Complete').click()
        cy.contains('Continue').click()
        cy.contains('Continue').click()
        cy.get('.pt-4').should('have.text', 'User successfully added')
    });

    it('Verify that users have unique usernames', () => {
        cy.contains("Users").click();
        cy.contains("New User").click();
        cy.contains("New User").click();

        //User Data
        cy.get('input[name="title"]').type(credentials.title);
        cy.get('input[name="firstName"]').type(credentials.firstName);
        cy.get('input[name="lastName"]').type(credentials.lastName);
        cy.get('[name="ErrorMsg"]').should('have.text', 'Username already exists, Try again')

    })

    it('Verify Adding user with required email address', () => {
        cy.contains("Users").click();
        cy.contains("New User").click();
        cy.contains("New User").click();

        //User Data
        cy.get('input[name="title"]').type(credentials.title);
        cy.get('input[name="firstName"]').type(credentials.firstName2);
        cy.get('input[name="lastName"]').type(credentials.lastName2);
        cy.contains('Continue').click()

        //User Permission
        cy.get('[role="combobox"]').eq(0).click()
        cy.get('[role="option"]').contains('Mother & Child Care Center').click();
        //Select Profile
        cy.get('[role="combobox"]').eq(1).click()
        cy.get('[role="option"]').contains('QAPI/Incident Approvers').click();
        //Select Role
        cy.get('[role="combobox"]').eq(2).click()
        cy.get('[role="option"]').contains('Facility Administrator').click();
        cy.get('[type="button"]').click()
        cy.contains('Complete').click()
        cy.contains('Continue').click()
        cy.get('input[name="email"]').type(credentials.email2)
        cy.get('#validate').check()
        cy.contains('Continue').click()
        cy.get('.pt-4').should('have.text', 'User successfully added')
    }) 
    
    it('Verify user can be assigned multiple profile', () => {
        cy.contains("Users").click();
        cy.contains("New User").click();
        cy.contains("New User").click();

        //User Data
        cy.get('input[name="title"]').type(credentials.title);
        cy.get('input[name="firstName"]').type(credentials.firstName3);
        cy.get('input[name="lastName"]').type(credentials.lastName3);
        cy.contains('Continue').click()

        //User Permission
        cy.get('[role="combobox"]').eq(0).click()
        cy.get('[role="option"]').contains('Mother & Child Care Center').click();
        //Select Profile
        cy.get('[role="combobox"]').eq(1).click()
        cy.get('[role="option"]').contains('QAPI/Incident Approvers').click();
        //Select Role
        cy.get('[role="combobox"]').eq(2).click()
        cy.get('[role="option"]').contains('Facility Administrator').click();
        cy.get('[type="button"]').click()
        cy.contains('Complete').click()
        cy.contains('Add assignment').click()
        cy.get('[role="combobox"]').eq(3).click()
        cy.get('[role="option"]').contains('Care & Therapy Home').click();
        //Select Profile
        cy.get('[role="combobox"]').eq(4).click()
        cy.get('[role="option"]').contains('Supervisor').click();
        //Select Role
        cy.get('[role="combobox"]').eq(5).click()
        cy.get('[role="option"]').contains('Unit Manager').click();
        cy.get('button.sc-fremEr.jzwRTu.w-full').click()
        cy.contains('Complete').click()
        cy.contains('Continue').click()
        cy.get('input[name="email"]').type(credentials.email3)
        cy.get('#validate').check()
        cy.contains('Continue').click()
        cy.get('.pt-4').should('have.text', 'User successfully added')
    })
});