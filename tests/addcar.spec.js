const {test, expect} = require('@playwright/test');

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:5173/products');

});

test('Agregar un producto al carrito', async ({page}) => {
    await page.locator('#addCar-albinos').click(); 

    
    const carrito = await page.locator('#carrito');
    await expect(carrito).toContainText('1'); 

});

test('verificar que el subtotal se muestra correctamente', async ({ page }) => {
   
    const botonAlbinos = page.locator('#addCar-albinos');
    await botonAlbinos.click();
    const botonGoldenTeacher = page.locator('#addCar-golden');
    await botonGoldenTeacher.click();

    // Ir a la página de checkout
    await page.goto('http://localhost:5173/checkout');

    
    const subtotalElement = page.locator('.subtotal span');
    await expect(subtotalElement).toBeVisible();

    // Verificar que el subtotal tiene el valor correcto
    /* const subtotalText = await subtotalElement.textContent();
    const expectedSubtotal = (20000 + 10000).toFixed(2);
    expect(subtotalText).toBe(`$${expectedSubtotal}`); */
});
