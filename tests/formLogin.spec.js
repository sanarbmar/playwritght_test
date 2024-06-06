const {test, expect} = require('@playwright/test');

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:5173/');

});

test.describe('Testing login form', () =>{

    test('Deberia loguear a alguien con usuario y contraseña', async ({page}) => {
        await page.locator('input[name="email"]').fill('Pirobo@gmail.com');
        await page.locator('input[name="password"]').fill('Ejemplo122');

        await page.getByRole('button').dblclick();
        await expect(page).toHaveURL('http://localhost:5173/home');
    });

    test('Deberia mostar mensajes de que los campos no deben estar vacios', async ({page}) => {

        await page.getByRole('button').click();

        const emailError = page.locator('#email-error');  
        await expect(emailError).toHaveText('El nombre no debe estar vacio');

        const passwordError =  page.locator('#password-error');  
        await expect(passwordError).toHaveText('la contrasena no debe estar vacia');

    });

    test('poner un email incorrecto', async ({page}) => {
        await page.locator('input[name="email"]').fill('Pirobo');
        await page.locator('input[name="password"]').fill('Ejemplo122');
        const emailError = page.locator('#email-error');  
        await expect(emailError).toHaveText('problemas con el email');

        await page.getByRole('button').click();

    });
    

});