import { expect, test } from '@playwright/test';

const pages = ['/', '/carta.html', '/promociones.html', '/parrillas.html', '/ubicacion.html'];

for (const width of [320, 390, 768, 1440]) {
  test(`catalog text stays large and buttons usable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/carta.html?categoria=pollos');
    const card = page.locator('.dish-card').first();
    for (const [selector, minimum] of [['h3', 22], ['.dish-body > p', 16], ['.dish-price strong', 28], ['.add-dish', 16]] as const) {
      const size = await card.locator(selector).evaluate(element => parseFloat(getComputedStyle(element).fontSize));
      expect(size, selector).toBeGreaterThanOrEqual(minimum);
    }
    await expect(card.locator('.add-dish span')).toBeVisible();
    expect(await card.locator('.dish-body > p').evaluate(element => getComputedStyle(element).webkitLineClamp)).toBe('none');
    const button = await card.locator('.add-dish').boundingBox();
    expect(button!.height).toBeGreaterThanOrEqual(44);
    expect(await card.evaluate(element => element.scrollWidth <= element.clientWidth + 1)).toBe(true);
    const header = await page.locator('.site-header').boundingBox();
    const heading = await page.locator('main h1').boundingBox();
    expect(heading!.y).toBeGreaterThanOrEqual(header!.height);
  });
}

test('catalog reflows when text is enlarged to 200 percent', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/carta.html?categoria=pollos');
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
  await expect.poll(async () => page.locator('.dish-body > p').first().evaluate(element => parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(32);
  for (const element of await page.locator('.dish-card, .dish-bottom, .menu-toolbar, .site-header').all()) {
    expect(await element.evaluate(node => node.scrollWidth <= node.clientWidth + 1)).toBe(true);
  }
});

for (const width of [320, 390, 768, 1024, 1440, 1920]) {
  test(`all sections fit a ${width}px viewport`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of pages) {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      await expect(page.locator('main h1')).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
      for (const selector of ['.brand', '.header-actions', '.page-heading h1', '.hero h1', '.dish-bottom']) {
        for (const element of await page.locator(selector).all()) {
          const box = await element.boundingBox();
          if (box) { expect(box.x).toBeGreaterThanOrEqual(-1); expect(box.x + box.width).toBeLessThanOrEqual(width + 1); }
        }
      }
    }
  });
}

test('navigation uses real URLs without a document reload and supports back/forward', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.evaluate(() => { (window as Window & { testMarker?: string }).testMarker = 'same-document'; });
  await page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('link', { name: 'La carta', exact: true }).click();
  await expect(page).toHaveURL(/carta.html$/);
  await expect(page.locator('main h1')).toContainText('La carta');
  expect(await page.evaluate(() => (window as Window & { testMarker?: string }).testMarker)).toBe('same-document');
  await page.goBack(); await expect(page.locator('main h1')).toContainText('BUENA BRASA');
  await page.goForward(); await expect(page.locator('main h1')).toContainText('La carta');
});

test('category deep links, search, sorting and empty results work', async ({ page }) => {
  await page.goto('/carta.html?categoria=pollos');
  await expect(page.getByRole('button', { name: /^Pollos a la brasa/ })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.dish-card')).toHaveCount(4);
  await page.getByRole('combobox', { name: 'Ordenar platos' }).selectOption('price-asc');
  await expect(page.locator('.dish-card').first()).toContainText('1/4 de Pollo');
  await page.getByRole('searchbox', { name: 'Buscar en la carta' }).fill('no-existe-123');
  await expect(page.locator('.empty-state')).toBeVisible();
  await page.getByRole('button', { name: 'Ver toda la carta', exact: true }).click();
  await expect(page.locator('.dish-card')).toHaveCount(83);
});

test('verified chifa sections and printed prices are available', async ({ page }) => {
  await page.goto('/carta.html?categoria=chifa');
  await expect(page.locator('.dish-card')).toHaveCount(20);
  const filters = page.getByRole('group', { name: 'Secciones de chifa' });
  await filters.getByRole('button', { name: 'Sopas', exact: true }).click();
  await expect(page.locator('.dish-card')).toHaveCount(5);
  await expect(page.getByTestId('dish-card-sopa-wantan')).toContainText('S/ 10.00');
  await filters.getByRole('button', { name: 'Aeropuertos', exact: true }).click();
  await expect(page.getByTestId('dish-card-aeropuerto-langostino')).toContainText('S/ 20.00');
  await expect(page.locator('.menu-policy-note')).toContainText('días distintos');
});

test('cart persists between navigation and refresh, checkout validates and uses the correct WhatsApp', async ({ page }) => {
  await page.goto('/carta.html');
  await page.locator('[data-testid="dish-card-mostrito"]').getByRole('button', { name: /Agregar/ }).click();
  await page.getByRole('button', { name: /Ver pedido de/ }).click();
  const dialog = page.getByRole('dialog', { name: /Tu pedido/ });
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Recojo en local' }).click();
  await dialog.getByLabel('Tu nombre').fill('Prueba de pedido');
  await dialog.getByLabel('Teléfono', { exact: true }).fill('987654321');
  await expect(dialog.getByText('Te esperamos en El Pedregal')).toBeVisible();
  await page.evaluate(() => { window.open = (url?: string | URL) => { (window as Window & { openedUrl?: string }).openedUrl = String(url); return null; }; });
  await dialog.getByRole('button', { name: 'Confirmar por WhatsApp' }).click();
  const url = await page.evaluate(() => (window as Window & { openedUrl?: string }).openedUrl);
  expect(url).toContain('https://wa.me/51928067861');
  expect(decodeURIComponent(url!)).toContain('Manchay');
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await page.reload();
  await expect(page.locator('[data-testid="dish-card-mostrito"] .quantity-control')).toContainText('1');
});

test('assistant provides guide answers and keyboard dismissal', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Abrir asistente de El Toñito' }).click();
  const dialog = page.getByRole('dialog', { name: 'Tu cómplice del antojo' });
  await dialog.getByRole('button', { name: '¿Dónde están ubicados?' }).click();
  await expect(dialog.locator('.chat-message.assistant')).toContainText('Manchay');
  await expect(dialog.locator('.guide-notice')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
});

test('Google Maps review links point to the verified restaurant and open separately', async ({ page }) => {
  const reviewUrl = 'https://search.google.com/local/writereview?placeid=ChIJAQ4_U27BBZERRH8UC1yPVrU';
  for (const path of ['/', '/ubicacion.html']) {
    await page.goto(path);
    const review = page.locator('main .review-invite a');
    await expect(review).toHaveAttribute('href', reviewUrl);
    await expect(review).toHaveAttribute('target', '_blank');
    await expect(review).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(page.locator('footer .footer-review')).toHaveAttribute('href', reviewUrl);
  }
});

test('mobile menu reaches parrillas and keeps the cart and assistant accessible', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Abrir menú de navegación' }).click();
  await page.getByRole('navigation', { name: 'Todas las secciones' }).getByRole('link', { name: 'Parrillas', exact: true }).click();
  await expect(page).toHaveURL(/parrillas.html$/);
  await expect(page.locator('main h1')).toContainText('Al punto');
  await page.locator('.dish-card').first().getByRole('button', { name: /Agregar/ }).click();
  await expect(page.locator('.floating-cart')).toBeVisible();
  await page.getByRole('button', { name: 'Abrir asistente de El Toñito' }).click();
  await expect(page.getByRole('dialog', { name: 'Tu cómplice del antojo' })).toBeVisible();
});
