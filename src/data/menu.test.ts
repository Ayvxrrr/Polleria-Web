import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { MENU_CATEGORIES, MENU_ITEMS, RESTAURANT_INFO } from './menu.ts';

const printedPrices: Record<string, number> = {
  'parrilla-tonito': 70, 'parrilla-familiar-gigante': 110,
  'combo-chuleta': 28, 'combo-filete': 28, 'combo-churrasco': 28, 'combo-lomo-parrillero': 36, 'combo-cuarto-pollo': 27,
  'combo-familiar-1': 66, 'combo-familiar-2': 70, 'combo-familiar-3': 78,
  'oferta-clasica-irresistible': 72, 'oferta-mega-familiar': 92,
  'cuarto-pollo': 18, 'medio-pollo': 33, 'pollo-entero-solo': 58, 'pollo-oferta-pepsi': 62,
  mostrito: 14, mostro: 20,
  'anticucho-corazon': 22, 'brocheta-pollo': 22, 'chorizo-parrilla': 15, 'mollejitas-doradas': 15,
  'lomo-fino-parrilla': 29, 'churrasco-brasa': 20, 'filete-pollo': 19, 'chuleta-cerdo': 18, 'filete-pierna-pollo': 19,
  'lomo-saltado-chaufa': 23, 'pollo-saltado-chaufa': 16,
  'mini-tonito': 17, 'piqueo-tonito': 28, 'costilla-cerdo-bbq': 32, 'pechuga-mozzarella': 24,
  'porcion-papas': 14, 'media-porcion-papas': 10, 'tequenos-wantan': 6,
  'ensalada-clasica': 10, 'ensalada-parrillera': 16,
  'sopa-wantan': 10, 'sopa-wantan-especial': 14, 'sopa-fuchifu': 11, 'sopa-pollo-kion': 11, 'sopa-carne-res': 11,
  'chaufa-pollo': 12, 'chaufa-chancho': 14, 'chaufa-carne-res': 14, 'chaufa-langostino': 18, 'chaufa-especial': 16, 'chaufa-salvaje': 15,
  'aeropuerto-pollo': 14, 'aeropuerto-chancho': 16, 'aeropuerto-carne': 16, 'aeropuerto-langostino': 20, 'aeropuerto-especial': 18,
  'tortilla-pollo': 17, 'tortilla-carne': 18, 'tortilla-langostino': 20, 'tortilla-especial': 20,
  'infusion-personal': 3, 'infusion-jarrita': 5, filtrantes: 2, cafe: 3, 'bebida-temporada-jarra': 8,
  'limonada-chicha-maracuya-vaso': 4, 'jarra-chicha-maracuya': 12,
  'limonada-especial-vaso': 5, 'limonada-especial-jarra': 13,
  'frozen-vaso': 8, 'frozen-jarra': 17, 'frozen-limon-pina-vaso': 8, 'frozen-limon-pina-jarra': 17,
  'frozen-maracuya-mango-vaso': 8, 'frozen-maracuya-mango-jarra': 19,
  'gaseosa-personal': 5, 'gaseosa-pepsi-2l': 11, 'gaseosa-1-5l': 13, 'agua-mineral': 3,
  'espumante-najar': 35, 'rose-tacama': 35, borgona: 30, 'jarra-sangria': 28, 'sangria-casa': 40, 'cerveza-cusquena': 8,
};

test('all 83 options match the supplied printed prices, without duplicates or extra dishes', () => {
  assert.equal(MENU_ITEMS.length, 83);
  assert.equal(new Set(MENU_ITEMS.map(item => item.id)).size, 83);
  assert.deepEqual(Object.fromEntries(MENU_ITEMS.map(item => [item.id, item.price])), printedPrices);
  for (const item of MENU_ITEMS) {
    assert.ok(item.title.trim() && item.description.trim());
    assert.ok(MENU_CATEGORIES.some(category => category.id === item.category));
    assert.ok(!('originalPrice' in item) && !('serves' in item));
    assert.equal(item.taperCount, undefined);
  }
});

test('all supplied chifa sections are complete', () => {
  const chifa = MENU_ITEMS.filter(item => item.category === 'chifa');
  assert.equal(chifa.length, 20);
  assert.deepEqual(Object.fromEntries(['Sopas', 'Chaufa', 'Aeropuertos', 'Tortillas'].map(section => [section, chifa.filter(item => item.section === section).length])), { Sopas: 5, Chaufa: 6, Aeropuertos: 5, Tortillas: 4 });
});

test('every menu item has a unique local photo', () => {
  for (const item of MENU_ITEMS) {
    const image = item.image;
    assert.ok(image, `Missing photo for ${item.id}`);
    assert.ok(image.startsWith('/images/'));
    assert.ok(!image.includes('..'));
    assert.ok(existsSync(new URL(`../../public${image}`, import.meta.url)), `Missing local image: ${image}`);
  }
  assert.equal(new Set(MENU_ITEMS.map(item => item.image)).size, MENU_ITEMS.length);
});

test('accompaniments match the printed descriptions instead of invented ingredients', () => {
  const item = (id: string) => MENU_ITEMS.find(dish => dish.id === id)!;
  assert.match(item('oferta-clasica-irresistible').description, /chaufa de pollo/);
  assert.match(item('oferta-mega-familiar').description, /chaufa especial/);
  assert.match(item('combo-familiar-3').description, /1\/2 pollo solo/);
  assert.match(item('combo-familiar-3').description, /1.5 litros/);
  assert.match(item('anticucho-corazon').description, /papas sancochadas/);
  assert.doesNotMatch(item('anticucho-corazon').description, /choclo|cremas/i);
  assert.doesNotMatch(item('tequenos-wantan').description, /guacamole|queso/i);
  assert.match(item('sangria-casa').description, /botella de vino Borgoña/);
});

test('contact and ambiguous courtesy conditions remain explicit', () => {
  assert.equal(RESTAURANT_INFO.phoneUrl, 'tel:+51928067861');
  assert.equal(RESTAURANT_INFO.whatsappNumber, '51928067861');
  const review = new URL(RESTAURANT_INFO.reviewUrl);
  assert.equal(review.origin, 'https://search.google.com');
  assert.equal(review.searchParams.get('placeid'), 'ChIJAQ4_U27BBZERRH8UC1yPVrU');
  assert.match(RESTAURANT_INFO.address, /lote 7-B/);
  assert.match(RESTAURANT_INFO.courtesyPolicy, /lunes a sábado y lunes a viernes/);
  assert.match(RESTAURANT_INFO.pricePolicy, /confirma/i);
});
