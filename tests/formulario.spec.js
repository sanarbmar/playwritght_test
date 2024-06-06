const {test, expect} = require('@playwright/test');

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:5173/signup');

});

test.describe('Testing form', () =>{

    test('Deberia ingrear informacion en los campos y mostrar mensaje correcto', async ({page}) => {
        await page.locator('input[name="name"]').fill('Pirobo');
        await page.locator('input[name="email"]').fill('Pirobo@gmail.com');
        await page.locator('input[name="password"]').fill('Ejemplo122');

        await page.getByRole('button').dblclick();
        page.on('dialog', async dialog => {
            // Verifica que el tipo de diálogo sea 'alert'
            expect(dialog.type()).toBe('alert');
            // Verifica el mensaje del alert
            expect(dialog.message()).toBe('Usuario creado exitosamente');
            // Acepta el alert
            await dialog.accept();
        });
    });

    test('Deberia mostar mensajes de que los campos no deben estar vacios', async ({page}) => {

        await page.getByRole('button').click();

        const nameError = page.locator('#name-error');  
        await expect(nameError).toHaveText('El nombre no debe estar vacio');

        const emailError = page.locator('#email-error');  
        await expect(emailError).toHaveText('el email no debe estar vacio');

        const passwordError =  page.locator('#password-error');  
        await expect(passwordError).toHaveText('la contrasena no debe estar vacia');


    });
    

});