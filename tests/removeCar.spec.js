const {test, expect} = require('@playwright/test');

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:5173/products');

});

test('Remover un producto del carrito', async ({page}) => {
   
    await page.locator('#addCar-albinos').click(); 


    // Verifica que el producto se haya agregado al carrito
    await page.locator('#carrito').click(); 
    await page.waitForTimeout(2000);
    await page.locator('#btn-remove').click();
    await page.waitForTimeout(3000);

    const carrito = await page.locator('#carrito');
    await expect(carrito).toContainText('0');

});