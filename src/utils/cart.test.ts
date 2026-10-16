import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatSoles,
  calculateSubtotal,
  calculateTotalCount,
  calculateTaperFee,
  calculateGrandTotal,
  filterMenuItems,
  generateWhatsAppMessage
} from './cart.ts';
import type { CartItem, MenuItem } from '../types/index.ts';

const mockPollo: MenuItem = {
  id: 'pollo-entero',
  title: '1 Pollo Entero',
  description: 'Pollo entero a la brasa con papas y ensalada',
  price: 58.00,
  category: 'pollos',
  categoryLabel: 'Pollos a la Brasa',
  image: 'https://example.com/pollo.jpg',
  taperCount: 1
};

const mockPromoChaufa: MenuItem = {
  id: 'oferta-clasica',
  title: 'Oferta Clásica Irresistible',
  description: '1 Pollo entero + chaufa de pollo + papas + ensalada + Pepsi 2L',
  price: 72.00,
  category: 'combos',
  categoryLabel: 'Combos & Parrillas',
  image: 'https://example.com/promo.jpg',
  taperCount: 2
};

const mockBebida: MenuItem = {
  id: 'gaseosa-pepsi',
  title: 'Gaseosa Pepsi 2L',
  description: 'Botella familiar 2 Litros',
  price: 11.00,
  category: 'bebidas',
  categoryLabel: 'Bebidas',
  image: 'https://example.com/pepsi.jpg'
};

test('formatSoles formats numbers correctly with two decimals and S/ prefix', () => {
  assert.equal(formatSoles(72), 'S/ 72.00');
  assert.equal(formatSoles(14.5), 'S/ 14.50');
  assert.equal(formatSoles(0), 'S/ 0.00');
});

test('calculateSubtotal and calculateTotalCount work accurately', () => {
  const items: CartItem[] = [
    { item: mockPollo, quantity: 1 },
    { item: mockPromoChaufa, quantity: 2 }
  ];

  assert.equal(calculateSubtotal(items), 58.00 + (72.00 * 2));
  assert.equal(calculateTotalCount(items), 3);
});

test('calculateTaperFee calculates tápers correctly', () => {
  const itemsWithDrinks: CartItem[] = [
    { item: mockPollo, quantity: 1 },
    { item: mockPromoChaufa, quantity: 1 },
    { item: mockBebida, quantity: 2 }
  ];

  assert.equal(calculateTaperFee(itemsWithDrinks), 4.50);
});

test('calculateGrandTotal adds subtotal, taper fee and delivery fee', () => {
  const items: CartItem[] = [
    { item: mockPromoChaufa, quantity: 1 }
  ];
  const grandTotal = calculateGrandTotal(items, 'delivery');
  assert.equal(grandTotal, 75.00);
});

test('unknown container counts are not invented or charged', () => {
  const items: CartItem[] = [{ item: { ...mockPollo, taperCount: undefined }, quantity: 1 }];
  assert.equal(calculateTaperFee(items), 0);
  assert.equal(calculateGrandTotal(items, 'delivery'), 58);
  const message = generateWhatsAppMessage(items, { deliveryMode: 'delivery' });
  assert.match(message, /cantidad por confirmar/);
  assert.match(message, /S\/ 1.50 por unidad/);
});

test('filterMenuItems filters properly by text and category', () => {
  const allItems: MenuItem[] = [mockPollo, mockPromoChaufa, mockBebida];

  const pollos = filterMenuItems(allItems, '', 'pollos');
  assert.equal(pollos.length, 1);
  assert.equal(pollos[0].id, 'pollo-entero');

  const searchResults = filterMenuItems(allItems, 'chaufa', 'all');
  assert.equal(searchResults.length, 1);
  assert.equal(searchResults[0].id, 'oferta-clasica');

  const noResults = filterMenuItems(allItems, 'mariscos', 'all');
  assert.equal(noResults.length, 0);
});

test('generateWhatsAppMessage creates expected message structure', () => {
  const items: CartItem[] = [
    { item: mockPromoChaufa, quantity: 1 }
  ];
  const orderDetails = {
    customerName: 'Juan Pérez',
    phone: '999888777',
    deliveryMode: 'delivery' as const,
    address: 'Mz. C, lote 10, El Pedregal, Manchay',
    paymentMethod: 'yape' as const
  };

  const message = generateWhatsAppMessage(items, orderDetails);

  assert.match(message, /HOLA POLLERÍA EL TOÑITO/);
  assert.match(message, /1x Oferta Clásica Irresistible/);
  assert.match(message, /Juan Pérez/);
  assert.match(message, /Mz\. C, lote 10, El Pedregal, Manchay/);
  assert.match(message, /Yape/);
  assert.match(message, /S\/ 75\.00/);
});

test('pickup orders include the Manchay address and the supplied Google Maps link', () => {
  const message = generateWhatsAppMessage(
    [{ item: mockPollo, quantity: 1 }],
    { deliveryMode: 'pickup' }
  );

  assert.match(message, /Recojo en Local \(Av\. Victor Malasquez Mz\. B-14/);
  assert.match(message, /El Pedregal, Huertos de Manchay/);
  assert.ok(message.includes('https://maps.app.goo.gl/LuAoXEyywqNRE8Pz5'));
  assert.doesNotMatch(message, /SJL|Lurigancho|Próceres/);
});
