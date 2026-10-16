import type { CartItem, MenuItem, OrderDetails } from '../types/index.ts';
import { RESTAURANT_INFO } from '../data/menu.ts';

export const RESTAURANT_WHATSAPP = RESTAURANT_INFO.whatsappNumber;
export const TAPER_UNIT_PRICE = 1.50;

export function formatSoles(amount: number): string {
  return `S/ ${amount.toFixed(2)}`;
}

export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
}

export function calculateTotalCount(items: CartItem[]): number {
  return items.reduce((acc, curr) => acc + curr.quantity, 0);
}

export function calculateTaperFee(items: CartItem[]): number {
  const tapers = items.reduce((acc, { item, quantity }) => acc + (item.taperCount ?? 0) * quantity, 0);
  return tapers * TAPER_UNIT_PRICE;
}

export function hasUnconfirmedTapers(items: CartItem[]): boolean {
  return items.some(({ item }) => item.taperCount === undefined && item.category !== 'bebidas' && item.category !== 'licores');
}

export function calculateDeliveryFee(_mode: 'delivery' | 'pickup', _subtotal: number): number {
  // El envío se cotiza por WhatsApp y no se suma al estimado de la web.
  return 0;
}

export function calculateGrandTotal(items: CartItem[], mode: 'delivery' | 'pickup'): number {
  const subtotal = calculateSubtotal(items);
  const taperFee = calculateTaperFee(items);
  const deliveryFee = calculateDeliveryFee(mode, subtotal);
  return subtotal + taperFee + deliveryFee;
}

export function filterMenuItems(
  items: MenuItem[],
  query: string,
  category: string
): MenuItem[] {
  const normalize = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const cleanQuery = normalize(query).trim();

  return items.filter(item => {
    const matchesCategory = category === 'all' || item.category === category;
    if (!matchesCategory) return false;

    if (!cleanQuery) return true;

    const inTitle = normalize(item.title).includes(cleanQuery);
    const inDesc = normalize(item.description).includes(cleanQuery);
    const inTags = item.tags?.some(tag => normalize(tag).includes(cleanQuery)) || (item.section && normalize(item.section).includes(cleanQuery));

    return inTitle || inDesc || Boolean(inTags);
  });
}

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
  if (hasUnconfirmedTapers(items)) {
    lines.push('🥡 *Táperes adicionales:* S/ 1.50 por unidad; cantidad por confirmar, no incluida en el total.');
  }
  lines.push(`🛵 *Modalidad:* ${orderDetails.deliveryMode === 'pickup' ? `Recojo en Local (${RESTAURANT_INFO.address})` : 'Delivery a Domicilio'}`);
  if (orderDetails.deliveryMode === 'pickup') {
    lines.push(`📍 *Cómo llegar:* ${RESTAURANT_INFO.mapsUrl}`);
  }
  if (orderDetails.deliveryMode === 'delivery') {
    lines.push('🚚 *Envío:* Costo y cobertura por confirmar con el local (no incluido en el total).');
  }
  lines.push(`💰 *TOTAL ESTIMADO: ${formatSoles(total)}*`);
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
    yape: 'Yape (confirmar datos con el local)',
    plin: 'Plin (confirmar datos con el local)',
    tarjeta: 'Tarjeta con POS (Visa / Mastercard)',
    efectivo: orderDetails.cashAmount 
      ? `Efectivo (Paga con S/ ${orderDetails.cashAmount.toFixed(2)}; confirmar total y vuelto con el local)`
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

export function getWhatsAppOrderUrl(
  items: CartItem[],
  orderDetails: Partial<OrderDetails>
): string {
  const text = generateWhatsAppMessage(items, orderDetails);
  return `https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodeURIComponent(text)}`;
}
