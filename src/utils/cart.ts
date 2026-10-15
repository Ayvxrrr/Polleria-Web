import type { CartItem, MenuItem, OrderDetails } from '../types/index.ts';

export const RESTAURANT_PHONE_1 = '928067861';
export const RESTAURANT_PHONE_2 = '910449497';
export const RESTAURANT_WHATSAPP = '51928067861';
export const TAPER_UNIT_PRICE = 1.50;

/**
 * Format numeric value in Peruvian Soles format: "S/ 72.00"
 */
export function formatSoles(amount: number): string {
  return `S/ ${amount.toFixed(2)}`;
}

/**
 * Calculate the subtotal of all items in the cart
 */
export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
}

/**
 * Calculate total number of items
 */
export function calculateTotalCount(items: CartItem[]): number {
  return items.reduce((acc, curr) => acc + curr.quantity, 0);
}

/**
 * Calculate taper fee: Each main dish or combo needs 1 taper unless it's a bottled drink or already sealed
 */
export function calculateTaperFee(items: CartItem[]): number {
  const tapers = items.reduce((acc, curr) => {
    // If explicitly specified
    if (curr.item.taperCount !== undefined) {
      return acc + (curr.item.taperCount * curr.quantity);
    }
    // Drinks do not need tápers
    if (curr.item.category === 'bebidas') {
      return acc;
    }
    // Combos and large portions use 1-2 tápers
    if (curr.item.category === 'combos' && curr.item.price >= 70) {
      return acc + (2 * curr.quantity);
    }
    return acc + (1 * curr.quantity);
  }, 0);

  return tapers * TAPER_UNIT_PRICE;
}

/**
 * Calculate delivery fee based on delivery mode
 */
export function calculateDeliveryFee(mode: 'delivery' | 'pickup', subtotal: number): number {
  if (mode === 'pickup') return 0;
  // Free delivery for orders over S/ 80 or promotion
  if (subtotal >= 80) return 0;
  return 0; // Promocional delivery gratis en San Juan de Lurigancho
}

/**
 * Calculate grand total
 */
export function calculateGrandTotal(items: CartItem[], mode: 'delivery' | 'pickup'): number {
  const subtotal = calculateSubtotal(items);
  const taperFee = calculateTaperFee(items);
  const deliveryFee = calculateDeliveryFee(mode, subtotal);
  return subtotal + taperFee + deliveryFee;
}

/**
 * Filter menu items by search query and category
 */
export function filterMenuItems(
  items: MenuItem[],
  query: string,
  category: string
): MenuItem[] {
  const cleanQuery = query.toLowerCase().trim();

  return items.filter(item => {
    const matchesCategory = category === 'all' || item.category === category;
    if (!matchesCategory) return false;

    if (!cleanQuery) return true;

    const inTitle = item.title.toLowerCase().includes(cleanQuery);
    const inDesc = item.description.toLowerCase().includes(cleanQuery);
    const inTags = item.tags?.some(tag => tag.toLowerCase().includes(cleanQuery));

    return inTitle || inDesc || Boolean(inTags);
  });
}

/**
 * Generate formatted WhatsApp order message and full wa.me link
 */
export function generateWhatsAppMessage(
  items: CartItem[],
  orderDetails: Partial<OrderDetails>
): string {
  const subtotal = calculateSubtotal(items);
  const taperFee = calculateTaperFee(items);
  const deliveryFee = calculateDeliveryFee(orderDetails.deliveryMode || 'delivery', subtotal);
  const total = subtotal + taperFee + deliveryFee;

  const lines: string[] = [
    '🍗🔥 *¡HOLA POLLERÍA EL TOÑITO!*',
    'Deseo realizar el siguiente pedido:',
    ''
  ];

  items.forEach((item, index) => {
    lines.push(`${index + 1}. *${item.quantity}x ${item.item.title}* — ${formatSoles(item.item.price * item.quantity)}`);
    if (item.notes) {
      lines.push(`   _Nota: ${item.notes}_`);
    }
  });

  lines.push('');
  lines.push(`📦 *Subtotal:* ${formatSoles(subtotal)}`);
  if (taperFee > 0) {
    lines.push(`🥡 *Costo de Táperes:* ${formatSoles(taperFee)}`);
  }
  lines.push(`🛵 *Modalidad:* ${orderDetails.deliveryMode === 'pickup' ? 'Recojo en Local (Av. Próceres 1420)' : 'Delivery a Domicilio'}`);
  if (orderDetails.deliveryMode === 'delivery') {
    lines.push(`🚚 *Envío:* ${deliveryFee === 0 ? 'Gratis (Promoción)' : formatSoles(deliveryFee)}`);
  }
  lines.push(`💰 *TOTAL A PAGAR: ${formatSoles(total)}*`);
  lines.push('');

  if (orderDetails.customerName) {
    lines.push(`👤 *Cliente:* ${orderDetails.customerName}`);
  }
  if (orderDetails.phone) {
    lines.push(`📞 *Teléfono:* ${orderDetails.phone}`);
  }
  if (orderDetails.deliveryMode === 'delivery') {
    if (orderDetails.address) {
      lines.push(`📍 *Dirección:* ${orderDetails.address}`);
    }
    if (orderDetails.reference) {
      lines.push(`🏢 *Referencia:* ${orderDetails.reference}`);
    }
    if (orderDetails.zone) {
      lines.push(`🗺️ *Zona:* ${orderDetails.zone}`);
    }
  }

  const paymentLabels: Record<string, string> = {
    yape: 'Yape (al 928 067 861)',
    plin: 'Plin (al 928 067 861)',
    tarjeta: 'Tarjeta con POS (Visa / Mastercard)',
    efectivo: orderDetails.cashAmount 
      ? `Efectivo (Paga con S/ ${orderDetails.cashAmount.toFixed(2)}, vuelto: ${formatSoles(Math.max(0, orderDetails.cashAmount - total))})`
      : 'Efectivo exacto contra entrega'
  };

  if (orderDetails.paymentMethod) {
    lines.push(`💳 *Método de Pago:* ${paymentLabels[orderDetails.paymentMethod] || orderDetails.paymentMethod}`);
  }

  if (orderDetails.orderNotes) {
    lines.push(`📝 *Indicaciones:* ${orderDetails.orderNotes}`);
  }

  lines.push('');
  lines.push('Por favor confirmen mi pedido para iniciar la preparación. ¡Muchas gracias!');

  return lines.join('\n');
}

/**
 * Generate full wa.me direct URL
 */
export function getWhatsAppOrderUrl(
  items: CartItem[],
  orderDetails: Partial<OrderDetails>
): string {
  const text = generateWhatsAppMessage(items, orderDetails);
  return `https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodeURIComponent(text)}`;
}
